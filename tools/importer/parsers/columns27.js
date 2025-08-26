/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the grid layout (contains the columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // 2. Find direct children of grid (columns)
  const columns = Array.from(grid.children);
  // Check for empty columns
  if (columns.length < 2) return;

  // 3. Table header row exactly as the example
  const headerRow = ['Columns (columns27)'];
  // 4. Second row: reference the actual elements in each column
  // (never clone, just reference the actual element)
  const contentRow = columns.map(col => col);
  // 5. Build table
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);
  // 6. Replace the original section with the block table
  element.replaceWith(table);
}
