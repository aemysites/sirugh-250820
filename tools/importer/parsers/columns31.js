/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid containing columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of grid (these are the column contents)
  const columns = Array.from(grid.children);

  // Header row: one cell, must span all columns visually. Achieve this by passing an array with a single cell, but let createTable auto-colspan.
  const headerRow = ['Columns (columns31)'];
  // Content row: each column content directly as a cell
  const contentRow = columns;

  // Compose cells array: Each row is an array; header row has one cell, content row has n cells
  const cells = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
