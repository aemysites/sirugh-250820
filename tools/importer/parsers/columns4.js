/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // The requested header is a single cell, even if there are multiple columns
  const headerRow = ['Columns (columns4)'];

  // Each column's content should be a single cell in the row for createTable
  // For this HTML, each column only contains an image. If the column contains more, use its full content.
  const contentRow = columns.map(col => col);

  // The structure should be: header row (one cell), then second row (one cell per column)
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
