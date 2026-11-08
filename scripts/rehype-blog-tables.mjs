/**
 * Statically contain blog Markdown tables in named, keyboard-scrollable regions.
 * Preserve native table nodes and leave non-blog collections untouched.
 */
export default function rehypeBlogTables() {
  return (tree, file) => {
    const path = String(file.path ?? '').replaceAll('\\', '/');
    if (!/\/src\/content\/blog\/[^/]+\.md$/i.test(path)) return;
    const title = file.data?.astro?.frontmatter?.title || 'Article';
    let tableNumber = 0;

    function wrapTables(parent) {
      if (!Array.isArray(parent.children)) return;
      for (let index = 0; index < parent.children.length; index++) {
        const child = parent.children[index];
        // A second processor pass must not duplicate existing regions.
        if (child.properties?.className?.includes('blog-table-scroll')) continue;
        if (child.type === 'element' && child.tagName === 'table') {
          parent.children[index] = {
            type: 'element',
            tagName: 'div',
            properties: {
              className: ['blog-table-scroll'],
              tabIndex: 0,
              role: 'region',
              ariaLabel: `${title} — table ${++tableNumber}. Scroll horizontally to view all columns.`,
            },
            children: [child],
          };
        } else {
          wrapTables(child);
        }
      }
    }

    wrapTables(tree);
  };
}
