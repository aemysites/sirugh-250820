/* global WebImporter */
export default function parse(element, { document }) {
  // Header is always the block name: Table (no header)
  const cells = [['Table (no header)']];
  // Each direct child .divider is a row block
  const dividers = Array.from(element.querySelectorAll(':scope > .divider'));
  dividers.forEach(divider => {
    // Each divider contains a .w-layout-grid as the actual row
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return;
    // The grid should have two children: the question (heading), and the answer (richtext)
    const children = Array.from(grid.children);
    if (children.length < 2) return;
    // Place both existing elements into the cell as an array, to preserve formatting and semantics
    cells.push([[children[0], children[1]]]);
  });
  // Replace the original element with the newly created table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
