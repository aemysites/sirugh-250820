/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to find first descendant img in a container
  function findFirstImg(container) {
    return container.querySelector('img');
  }

  // LEFT COLUMN 1: Product image
  let leftImage = null;
  const leftCol = element.querySelector('.product-details__left-column');
  if (leftCol) {
    leftImage = findFirstImg(leftCol);
  }

  // RIGHT COLUMN 1: Title, SKU, Price, Short Description, Quantity, Buttons
  let rightColContent = [];
  const rightCol = element.querySelector('.product-details__right-column');
  if (rightCol) {
    const header = rightCol.querySelector('.product-details__header');
    if (header) rightColContent.push(header);
    const price = rightCol.querySelector('.product-details__price');
    if (price) rightColContent.push(price);
    const shortDesc = rightCol.querySelector('.product-details__short-description');
    if (shortDesc && shortDesc.textContent.trim()) rightColContent.push(shortDesc);
    const configuration = rightCol.querySelector('.product-details__configuration');
    if (configuration) rightColContent.push(configuration);
  }

  // LEFT COLUMN 2: Attributes/details
  let details = null;
  if (rightCol) {
    details = rightCol.querySelector('.product-details__attributes');
  }

  // RIGHT COLUMN 2: Description (always empty here, but preserve structure)
  let description = null;
  if (rightCol) {
    const descEl = rightCol.querySelector('.product-details__description');
    // Only add if not empty, else use empty div to keep structure
    if (descEl && descEl.textContent.trim()) {
      description = descEl;
    } else {
      description = document.createElement('div');
    }
  }

  // Build the table according to the example: header row, then two rows of two columns
  const cells = [
    ['Columns (columns8)'],
    [leftImage, rightColContent],
    [details, description]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
