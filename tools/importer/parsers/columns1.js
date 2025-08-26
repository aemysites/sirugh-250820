/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as in the example
  const headerRow = ['Columns (columns1)'];

  // Find grid layout (the actual columns container)
  const grid = element.querySelector('.grid-layout');
  let columns = [];
  if (grid) {
    columns = Array.from(grid.children);
  } else {
    // fallback to direct container children
    const container = element.querySelector('.container');
    if (container) {
      columns = Array.from(container.children);
    } else {
      columns = Array.from(element.children);
    }
  }

  // There should be two columns: image and content. Find them robustly.
  let imageCol = null;
  let contentCol = null;

  for (const col of columns) {
    if (col.tagName === 'IMG' || col.querySelector('img')) {
      imageCol = col.tagName === 'IMG' ? col : col.querySelector('img');
    } else if (
      col.querySelector('h1') || col.querySelector('h2') || col.querySelector('h3')
    ) {
      contentCol = col;
    }
  }

  // Content column: collect all meaningful content in order
  let contentElements = [];
  if (contentCol) {
    // Find heading
    const heading = contentCol.querySelector('h1,h2,h3');
    if (heading) contentElements.push(heading);
    // Find subheading/description
    const subheading = contentCol.querySelector('p');
    if (subheading) contentElements.push(subheading);
    // Find button group
    const buttonGroup = contentCol.querySelector('.button-group');
    if (buttonGroup) contentElements.push(buttonGroup);
  }

  // Compose table row
  const columnsRow = [imageCol, contentElements];
  const cells = [headerRow, columnsRow];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
