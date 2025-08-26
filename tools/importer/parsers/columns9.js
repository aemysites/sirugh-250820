/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must be a single cell with block name
  const headerRow = ['Columns (columns9)'];

  // Find grid containing the columns
  const grid = element.querySelector('.grid-layout');
  let columns = [];

  if (grid) {
    // Each direct child of grid is a column
    columns = Array.from(grid.children);
  } else {
    // fallback: direct children of element
    columns = Array.from(element.children);
  }

  // Compose the table: 1 cell header row, then a single row with columns
  const cells = [headerRow, columns];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
