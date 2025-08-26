/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid layout which contains the columns content
  const container = element.querySelector('div.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (the columns)
  const columns = Array.from(grid.children);

  // Defensive: ensure we have at least two columns (text and image)
  if (columns.length < 2) return;

  // For this layout, left column is a div with multiple elements, right column is an image
  // We reference the existing DOM nodes directly

  // Table header as per requirements and example
  const headerRow = ['Columns (columns27)'];

  // The two columns become two cells of the row
  const contentRow = [columns[0], columns[1]];

  // Compose the table and replace the element
  const block = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);
  element.replaceWith(block);
}
