/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout that contains the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct child columns (divs)
  const columns = Array.from(grid.children);

  // The header row must be a single cell array
  const headerRow = ['Columns (columns3)'];

  // The next row contains one cell per column
  const contentRow = columns;

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
