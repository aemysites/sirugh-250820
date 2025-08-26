/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const columns = Array.from(grid.children);

  // Column 1: Taylor Brooks and tags
  const col1 = document.createElement('div');
  if (columns[0]) col1.appendChild(columns[0]);
  if (columns[1]) col1.appendChild(columns[1]);

  // Column 2: Heading
  const col2 = document.createElement('div');
  if (columns[2]) col2.appendChild(columns[2]);

  // Column 3: Rich text
  const col3 = document.createElement('div');
  if (columns[3]) col3.appendChild(columns[3]);

  // Header row: must be a single cell array
  const cells = [
    ['Columns (columns30)'],
    [col1, col2, col3]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
