/* global WebImporter */
export default function parse(element, { document }) {
  // Find the container and grid layout
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.w-layout-grid');
  if (!grid) return;
  // Get the direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;
  // Build the table: header row is a single cell, next row has as many columns as needed
  const cells = [
    ['Columns (columns35)'],
    columns
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
