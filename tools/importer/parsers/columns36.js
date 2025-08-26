/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as specified
  const headerRow = ['Columns (columns36)'];

  // Find the main grid block containing columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get the two main column blocks
  const gridColumns = grid.querySelectorAll(':scope > div');

  // Defensive check to avoid errors if columns are missing
  if (gridColumns.length < 2) return;

  // First column: Text, heading, paragraph, buttons
  const leftColumn = gridColumns[0];
  // Second column: Images grid (contains three images)
  const rightColumn = gridColumns[1];

  // The block table structure: Header row, then single row with two cells
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    [leftColumn, rightColumn]
  ], document);

  element.replaceWith(table);
}
