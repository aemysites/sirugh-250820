/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the grid containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // 2. Get all immediate children of the grid as columns
  const columns = Array.from(grid.children);

  // 3. Build the block table
  const headerRow = ['Columns (columns32)'];
  const contentRow = columns.map(col => col);

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // 4. Replace the original element with the new table
  element.replaceWith(table);
}
