/* global WebImporter */
export default function parse(element, { document }) {
  // The header row MUST be a single cell (1 column), even if the content row has more columns.
  const headerRow = ['Columns (columns14)'];

  // Get the grid container (holds columns)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get the columns (direct children of grid)
  const columns = Array.from(grid.children);

  // Defensive: need at least 2 columns for this block
  if (columns.length < 2) return;

  // First column: left (heading)
  const leftColumn = columns[0];

  // Second column: right (paragraph + button)
  // Collect all visible content in the right column
  const rightColumn = columns[1];
  // Use all children in case there are multiple, fallback to the column itself
  let rightContent = Array.from(rightColumn.children);
  if (rightContent.length === 0) rightContent = [rightColumn];

  // Build rows: header is a single cell row, next row is 2 columns
  const cells = [
    headerRow,
    [leftColumn, rightContent],
  ];

  // Create table block
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
