/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the grid layout element which contains columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // 2. Get immediate children of the grid as columns
  const columns = Array.from(grid.children);
  // Edge case: if no columns, do nothing
  if (!columns.length) return;

  // 3. The block/table header as specified
  const headerRow = ['Columns (columns32)'];
  // 4. Content row: one cell per column, referencing existing DOM nodes
  const contentRow = columns;

  // 5. Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // 6. Replace the original element with the new block table
  element.replaceWith(table);
}
