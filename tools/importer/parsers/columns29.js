/* global WebImporter */
export default function parse(element, { document }) {
  // Extract each column by selecting immediate child divs
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Header row: must be a single cell, regardless of number of columns
  const headerRow = ['Columns (columns29)'];

  // Content row: one cell for each column/div
  const contentRow = columns;

  // Cells array has two rows: header and content
  const cells = [
    headerRow,
    contentRow
  ];

  // Create the table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
