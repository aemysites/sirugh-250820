/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: create header row matching the block name
  const headerRow = ['Hero (hero6)'];

  // Step 2: Extract background image (first grid's first child img)
  let bgImg = null;
  const gridLayout = element.querySelector('.w-layout-grid.grid-layout');
  if (gridLayout && gridLayout.children.length > 0) {
    const bgCol = gridLayout.children[0];
    bgImg = bgCol.querySelector('img');
  }

  // Step 3: Extract card content (heading, subheading, call-to-action)
  let cardContent = null;
  if (gridLayout && gridLayout.children.length > 1) {
    const contentCol = gridLayout.children[1];
    // Try to find the card element directly
    const card = contentCol.querySelector('.card');
    if (card) {
      cardContent = card;
    }
  }

  // Step 4: Build cells array, handling missing data
  const cells = [
    headerRow,
    [bgImg ? bgImg : ''],
    [cardContent ? cardContent : '']
  ];

  // Step 5: Create the table block and replace the original
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
