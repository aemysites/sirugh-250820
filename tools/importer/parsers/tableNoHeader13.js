/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: single cell exactly as example
  const headerRow = ['Table (no header)'];

  // Get all immediate child dividers representing a row
  const dividerRows = Array.from(element.querySelectorAll(':scope > .divider'));

  // For each divider, extract the grid layout's heading and text
  const dataRows = dividerRows.map(divider => {
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return ['','']; // Defensive: two empty cells if grid missing

    // Collect heading and content
    const heading = Array.from(grid.children).find(child => child.classList.contains('h4-heading'));
    const content = Array.from(grid.children).find(child => child.classList.contains('rich-text'));
    // Always two columns for each row
    return [heading || '', content || ''];
  });

  // Assemble table: header (single cell), then each data row (two cells)
  const tableData = [headerRow, ...dataRows];
  // Use createTable; table will have two columns for data rows, one for header
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  // Fix: merge header row columns so the header appears as a single cell across the two columns
  if (table.rows.length > 0 && table.rows[0].cells.length > 1) {
    table.rows[0].cells[0].colSpan = 2;
    // Remove any extra cells beyond the first in the header row
    while (table.rows[0].cells.length > 1) {
      table.rows[0].deleteCell(1);
    }
  }
  // Replace the original element with the table
  element.replaceWith(table);
}
