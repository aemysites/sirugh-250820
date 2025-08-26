/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout for columns
  let grid = element.querySelector('.grid-layout');
  if (!grid) grid = element;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children).map((col) => col);

  // Header row: Exactly one cell as specified
  const headerRow = ['Columns (columns15)'];

  // Compose the table: header row (1 cell), then content row (N cells)
  // Each row is an array, so the second row should have as many columns as needed
  const contentRow = columns;
  const cells = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
