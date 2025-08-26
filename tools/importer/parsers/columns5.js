/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must be exactly as specified and have one column
  const headerRow = ['Columns (columns5)'];

  // Find main grid containing the columns
  const mainGrid = element.querySelector('.grid-layout.grid-gap-xxl.utility-min-height-100dvh');
  if (!mainGrid) return;
  // Get all immediate children (columns) of main grid
  const columns = Array.from(mainGrid.children);

  // Left content: find the grid that contains heading, paragraph, and buttons
  let leftCellContent = [];
  const leftCol = columns.find(col => col.classList.contains('w-layout-grid'));
  if (leftCol) {
    // Grab all direct children of leftCol (should include all block content)
    leftCellContent = Array.from(leftCol.children);
  }

  // Right content: find the image (single img element)
  let rightCellContent = [];
  const rightCol = columns.find(col => col.tagName === 'IMG');
  if (rightCol) rightCellContent = [rightCol];

  // Build table: first row is header with one column, second row with two columns
  const cells = [
    headerRow,
    [leftCellContent, rightCellContent]
  ];

  // Replace original element with block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
