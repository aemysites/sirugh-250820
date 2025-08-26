/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero39)'];

  // 2. Find the background image (first grid item's <img>)
  let imageCell = '';
  // Look for the main grid
  const gridLayout = element.querySelector('.w-layout-grid.grid-layout');
  if (gridLayout) {
    // The first direct child grid div usually contains the image
    const gridDivs = gridLayout.querySelectorAll(':scope > div');
    for (const gridDiv of gridDivs) {
      const img = gridDiv.querySelector('img');
      if (img) {
        imageCell = img;
        break;
      }
    }
  }
  // Fallback to any img in the block
  if (!imageCell) {
    const img = element.querySelector('img');
    if (img) imageCell = img;
  }

  // 3. Find the text content for the third row (headline, paragraph, CTA)
  let contentCell = '';
  let heading = null;
  let paragraph = null;
  let button = null;
  if (gridLayout) {
    const gridDivs = gridLayout.querySelectorAll(':scope > div');
    // The second grid div should have the content
    if (gridDivs.length > 1) {
      const contentDiv = gridDivs[1];
      heading = contentDiv.querySelector('h1, .h1-heading');
      paragraph = contentDiv.querySelector('p');
      button = contentDiv.querySelector('a.button, a.w-button');
      const cellElements = [];
      if (heading) cellElements.push(heading);
      if (paragraph) cellElements.push(paragraph);
      if (button) cellElements.push(button);
      if (cellElements.length > 0) {
        contentCell = cellElements;
      } else {
        // Fallback: use entire contentDiv
        contentCell = contentDiv;
      }
    }
  }
  // Fallback to any heading, paragraph, button in the block
  if (!contentCell) {
    heading = element.querySelector('h1, .h1-heading');
    paragraph = element.querySelector('p');
    button = element.querySelector('a.button, a.w-button');
    const cellElements = [];
    if (heading) cellElements.push(heading);
    if (paragraph) cellElements.push(paragraph);
    if (button) cellElements.push(button);
    if (cellElements.length > 0) {
      contentCell = cellElements;
    }
  }

  // 4. Table rows
  // The structure is: header, image, text content
  const cells = [
    headerRow,
    [imageCell],
    [contentCell]
  ];

  // 5. Create and replace the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
