/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .columns.block
  const block = element.querySelector('.columns.block');
  if (!block) return;

  // Header row: exactly one cell
  const headerRow = ['Columns (columns2)'];

  // Get all direct child rows of block
  const rows = Array.from(block.children);

  // For each row, get its columns (immediate children)
  const tableRows = rows.map(row => {
    return Array.from(row.children);
  });

  // Compose all rows for the table: header + each row
  // Header row must be single-cell array
  const cells = [headerRow, ...tableRows];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
