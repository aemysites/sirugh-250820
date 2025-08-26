/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Columns (columns14)'];

  // Find the grid container (the section with the columns)
  const grid = element.querySelector('.w-layout-grid');

  if (!grid) {
    // fallback: if no grid, do not process further
    return;
  }

  // Gather all direct children of the grid as columns
  const columnEls = Array.from(grid.querySelectorAll(':scope > *'));

  // Each column is referenced directly in a cell
  const contentRow = columnEls;

  // Only build the table if there are columns
  if (columnEls.length) {
    const cells = [headerRow, contentRow];
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
  }
}
