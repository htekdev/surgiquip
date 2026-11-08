import { test } from 'node:test';
import assert from 'node:assert/strict';
import rehypeBlogTables from '../scripts/rehype-blog-tables.mjs';

const blogFile = {
  path: '/site/src/content/blog/skytron-surgical-table-comparison-guide-texas.md',
  data: { astro: { frontmatter: { title: 'Skytron surgical table comparison' } } },
};
const table = () => ({
  type: 'element',
  tagName: 'table',
  properties: {},
  children: [{ type: 'text', value: 'Original comparison cells' }],
});

test('preserves the native table and gives each region a descriptive accessible name', () => {
  const first = table();
  const second = table();
  const tree = { type: 'root', children: [first, second] };
  rehypeBlogTables()(tree, blogFile);
  assert.equal(tree.children[0].tagName, 'div');
  assert.deepEqual(tree.children[0].properties.className, ['blog-table-scroll']);
  assert.equal(tree.children[0].properties.tabIndex, 0);
  assert.equal(tree.children[0].properties.role, 'region');
  assert.match(tree.children[0].properties.ariaLabel, /Skytron surgical table comparison — table 1/);
  assert.match(tree.children[1].properties.ariaLabel, /table 2/);
  assert.equal(tree.children[0].children[0], first);
  assert.equal(tree.children[1].children[0], second);
  assert.equal(first.children[0].value, 'Original comparison cells');
});

test('visits nested tables without altering surrounding text or elements', () => {
  const original = table();
  const text = { type: 'text', value: 'Unchanged article wording' };
  const tree = { children: [{ type: 'element', tagName: 'section', children: [text, original] }] };
  rehypeBlogTables()(tree, blogFile);
  assert.equal(tree.children[0].children[0], text);
  assert.equal(tree.children[0].children[1].children[0], original);
});

test('leaves Projects, missing paths and other files byte-for-byte unchanged', () => {
  for (const file of [{ path: '/site/src/content/projects/project.md' }, {}, { path: '/site/src/content/blog/article.txt' }]) {
    const tree = { children: [table()] };
    const before = JSON.stringify(tree);
    rehypeBlogTables()(tree, file);
    assert.equal(JSON.stringify(tree), before);
  }
});

test('supports Windows blog file paths', () => {
  const tree = { children: [table()] };
  rehypeBlogTables()(tree, { ...blogFile, path: 'C:\\site\\src\\content\\blog\\article.md' });
  assert.equal(tree.children[0].properties.role, 'region');
});

test('uses an explicit fallback label when frontmatter is unavailable', () => {
  const tree = { children: [table()] };
  rehypeBlogTables()(tree, { path: blogFile.path });
  assert.match(tree.children[0].properties.ariaLabel, /^Article — table 1/);
});

test('does not duplicate an existing wrapper on repeated processing', () => {
  const tree = { children: [table()] };
  const transform = rehypeBlogTables();
  transform(tree, blogFile);
  const once = JSON.stringify(tree);
  transform(tree, blogFile);
  assert.equal(JSON.stringify(tree), once);
});

test('accepts content without tables or children', () => {
  for (const tree of [{ type: 'root' }, { type: 'root', children: [] }, { children: [{ type: 'text', value: 'No table' }] }]) {
    const before = JSON.stringify(tree);
    rehypeBlogTables()(tree, blogFile);
    assert.equal(JSON.stringify(tree), before);
  }
});
