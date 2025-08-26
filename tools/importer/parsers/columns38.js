/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate children of the grid root; these are the columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Compose header row: EXACTLY one cell, matching the example
  const headerRow = ['Columns (columns38)'];

  // Compose content row: one cell per image (or per column if not image)
  const contentRow = columns.map(col => {
    const img = col.querySelector('img');
    return img ? img : col;
  });

  // Table structure matches example: first row is header, one cell; next row is content with N cells
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}
