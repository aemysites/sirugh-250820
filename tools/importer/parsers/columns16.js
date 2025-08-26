/* global WebImporter */
export default function parse(element, { document }) {
  // The block header
  const headerRow = ['Columns (columns16)'];

  // Find the grid containing columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // For each direct child (column) in the grid, extract the main content
  // In this HTML, each grid child contains an image inside a nested .utility-aspect-2x3
  // For generic columns, we want the full column content, not just the image
  const columns = Array.from(grid.children).map(col => {
    // Select all direct children of the column's aspect ratio container if present, else fallback to col
    const aspect = col.querySelector('.utility-aspect-2x3');
    if (aspect && aspect.children.length > 0) {
      // If the aspect container has multiple children, return them as an array
      return aspect.children.length === 1 ? aspect.firstElementChild : Array.from(aspect.children);
    }
    // Fallback: if no aspect container, take all direct children
    return col.children.length === 1 ? col.firstElementChild : Array.from(col.children);
  });

  // Output block table: header (1 cell), then content row (1 cell per column)
  const tableCells = [headerRow, columns];

  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}
