/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid that contains the columns
  const grid = element.querySelector('.grid-layout');
  // Fallback: use all children if grid not present
  const columns = grid ? Array.from(grid.children) : Array.from(element.children);
  // Defensive: filter out empty columns (shouldn't happen, but covers broken HTML)
  const filteredColumns = columns.filter(col => col && (col.textContent.trim().length > 0 || col.querySelector('*')));

  // Create the block table with a single-cell header row, followed by a content row with N columns
  const headerRow = ['Columns (columns31)'];
  const dataRow = filteredColumns;
  const cells = [headerRow, dataRow];
  
  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Set colspan on the header cell to span the number of columns in the data row
  const th = table.querySelector('th');
  if (th && dataRow.length > 1) {
    th.setAttribute('colspan', dataRow.length);
  }
  // Replace original element
  element.replaceWith(table);
}
