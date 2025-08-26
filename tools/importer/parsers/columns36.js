/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main container and grid
  const container = element.querySelector('.container');
  if (!container) return;
  const gridLayout = container.querySelector('.w-layout-grid.grid-layout');
  if (!gridLayout) return;
  const gridChildren = Array.from(gridLayout.children);
  if (gridChildren.length < 2) return;

  // Left column: find all relevant content (heading, subheading, buttons)
  const leftCol = gridChildren[0];
  const leftContent = [];
  const heading = leftCol.querySelector('h1');
  if (heading) leftContent.push(heading);
  const subheading = leftCol.querySelector('p.subheading');
  if (subheading) leftContent.push(subheading);
  const buttonGroup = leftCol.querySelector('.button-group');
  if (buttonGroup) leftContent.push(buttonGroup);

  // Right column: grid of images. Gather images as an array
  const rightCol = gridChildren[1];
  const imagesGrid = rightCol.querySelector('.w-layout-grid');
  let images = [];
  if (imagesGrid) {
    images = Array.from(imagesGrid.querySelectorAll('img'));
  }

  // Compose the block table
  const headerRow = ['Columns (columns36)'];
  // Second row: left column is all left content, right column is all images
  const contentRow = [leftContent, images];
  const cells = [headerRow, contentRow];

  // Create and replace with the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
