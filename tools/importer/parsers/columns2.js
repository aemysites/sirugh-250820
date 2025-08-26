/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid layout that represents the main 2-column content
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // LEFT COLUMN: The first large card (main story)
  let leftCol = null;
  // RIGHT COLUMN: The two flex-horizontal columns that follow
  let rightCol = null;

  // The grid usually contains the first child as a <a> (left), then two flex containers (right)
  const children = Array.from(grid.children);
  if (children.length < 3) return;

  leftCol = children[0];
  // Group the next two flex-horizontal divs into a container for the right column
  rightCol = document.createElement('div');
  rightCol.appendChild(children[1]);
  rightCol.appendChild(children[2]);

  // Compose table structure: header row, then a row with two columns
  const headerRow = ['Columns (columns2)'];
  const contentRow = [leftCol, rightCol];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
