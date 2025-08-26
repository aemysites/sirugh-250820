/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container which holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) {
    // fallback if grid container is missing, just replace with empty block
    const block = WebImporter.DOMUtils.createTable([
      ['Columns (columns9)'],
      ['']
    ], document);
    element.replaceWith(block);
    return;
  }

  // Get all direct children of the grid (each column)
  const columns = Array.from(grid.children);

  // If there are no columns (empty grid), handle edge case
  if (!columns.length) {
    const block = WebImporter.DOMUtils.createTable([
      ['Columns (columns9)'],
      ['']
    ], document);
    element.replaceWith(block);
    return;
  }

  // Compose the block table data
  // Header row: exactly one column
  // Second row: one cell per column
  const cells = [
    ['Columns (columns9)'],
    columns
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the block table
  element.replaceWith(block);
}
