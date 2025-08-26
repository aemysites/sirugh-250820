/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  const children = Array.from(grid.children);
  if (children.length < 4) return;

  // Prepare columns as per layout (3 columns: name, tags, main content)
  const col1 = children[0];
  const col2 = children[1];
  // col3: heading + rich text together
  const col3 = document.createElement('div');
  col3.appendChild(children[2]);
  col3.appendChild(children[3]);

  // Table header: single column with block name
  const headerRow = ['Columns (columns30)'];
  // Content row: 3 columns (cells)
  const contentRow = [col1, col2, col3];

  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
