/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children (columns), which may include divs or links
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Correct header row: must be a single column (one cell), even if there are multiple data columns
  const headerRow = ['Columns (columns35)'];

  // Each column's root element as a cell in the next row
  const contentRow = columns;

  // Structure: header row (1 column), content row (N columns)
  const cells = [
    headerRow,
    contentRow
  ];

  // Create and insert the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
