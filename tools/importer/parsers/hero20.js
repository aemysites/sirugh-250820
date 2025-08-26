/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row matches exactly
  const cells = [['Hero (hero20)']];

  // 2nd row: all images in the collage background (from the .grid-layout.desktop-3-column.utility-min-height-100dvh)
  let imagesRowContent = '';
  const imageGrid = element.querySelector('.grid-layout.desktop-3-column.utility-min-height-100dvh');
  if (imageGrid) {
    const imgs = Array.from(imageGrid.querySelectorAll('img.cover-image'));
    if (imgs.length > 0) {
      imagesRowContent = imgs;
    }
  }
  cells.push([imagesRowContent || '']);

  // 3rd row: heading, subheading, and call-to-action (all as existing elements)
  let contentRow = '';
  // Find the text & buttons container
  const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  if (contentContainer) {
    const heading = contentContainer.querySelector('h1');
    const subheading = contentContainer.querySelector('p');
    const buttonGroup = contentContainer.querySelector('.button-group');
    const contentArr = [];
    if (heading) contentArr.push(heading);
    if (subheading) contentArr.push(subheading);
    if (buttonGroup) contentArr.push(buttonGroup);
    if (contentArr.length > 0) contentRow = contentArr;
  }
  cells.push([contentRow || '']);

  // Create table and replace element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
