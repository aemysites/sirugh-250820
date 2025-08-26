/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid (these are our column contents)
  const gridColumns = Array.from(grid.children);

  // Header row: single cell with block name, to match the example exactly
  const headerRow = ['Columns (columns3)'];

  // Content row: one row, N columns (each child of grid)
  const contentRow = gridColumns;

  // Compose the table: header is a single cell; the content row is an array with N cells
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
