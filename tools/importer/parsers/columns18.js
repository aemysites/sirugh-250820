/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout within the section
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // Identify left (text/contacts) and right (image) columns
  let leftCol = null, rightCol = null;
  // The structure is: left column block (div), contacts (ul), and image (img)
  // Let's find them by type
  const divs = [];
  let contactsList = null;
  let img = null;

  gridChildren.forEach(child => {
    if (child.matches('div')) {
      divs.push(child);
    } else if (child.matches('ul')) {
      contactsList = child;
    } else if (child.matches('img')) {
      img = child;
    }
  });

  // For left column: combine heading/desc block and contacts list
  const leftColEls = [];
  // Usually the first div (with h2/h3/p) is the intro block
  if (divs.length > 0) {
    leftColEls.push(divs[0]);
  }
  if (contactsList) leftColEls.push(contactsList);

  // For right column: just the image
  const rightColEls = [];
  if (img) rightColEls.push(img);

  // Compose the header row and content row
  const headerRow = ['Columns (columns18)'];
  const contentRow = [leftColEls, rightColEls];
  const cells = [headerRow, contentRow];

  // Build the table and replace the element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
