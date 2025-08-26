/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct children (each is a column cell)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Guard: If no columns found, do nothing
  if (!columns.length) return;

  // Header row as required by spec
  const headerRow = ['Columns (columns19)'];
  // Second row: each cell contains the referenced column element
  const contentRow = columns;

  // Create the table via the provided helper
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);
  // Replace the original element
  element.replaceWith(table);
}
