/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid that defines the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // The columns we want are:
  //  - First column: big featured card (first child of grid)
  //  - Second column: stack two flex-vertical blocks (the next two children)

  // Defensive: Only proceed if there are enough columns
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 3) return;

  // Left column: the main feature block
  const leftCol = gridChildren[0]; // the big anchor card

  // Right column: a vertical stack of the next two flex-vertical wrappers
  const rightCol = document.createElement('div');
  rightCol.appendChild(gridChildren[1]);
  rightCol.appendChild(gridChildren[2]);

  // Table header: exactly as specified
  const headerRow = ['Columns (columns2)'];
  // Content row: two cells, one for each column
  const contentRow = [leftCol, rightCol];

  // Construct and replace
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);
  element.replaceWith(table);
}