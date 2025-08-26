/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child columns
  const cols = Array.from(element.querySelectorAll(':scope > *'));
  if (cols.length === 0) return;
  // The header row must have exactly one cell, matching the block name
  const headerRow = ['Columns (columns29)'];
  // The second row has as many cells as there are columns
  const contentRow = cols;
  // Build the table rows array
  const tableRows = [
    headerRow,
    contentRow
  ];
  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  // Table header should span all columns (colspan)
  const th = table.querySelector('th');
  if (th && cols.length > 1) {
    th.setAttribute('colspan', String(cols.length));
  }
  // Replace the original element with the structured table
  element.replaceWith(table);
}
