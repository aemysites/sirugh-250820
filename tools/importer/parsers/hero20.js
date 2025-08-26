/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per requirements and example
  const headerRow = ['Hero (hero20)'];

  // ---- BACKGROUND IMAGE AREA ----
  // Hero background is a multi-image montage (all grid images)
  // Find the main grid containing all images
  let imagesCell = [];
  const grid = element.querySelector('.grid-layout.desktop-3-column.utility-min-height-100dvh');
  if (grid) {
    const imgs = Array.from(grid.querySelectorAll('img'));
    // Only add if at least one image exists
    if (imgs.length > 0) {
      imagesCell = imgs;
    }
  }

  // ---- CONTENT: HEADLINE, SUBHEADING, BUTTONS ----
  const contentContainer = element.querySelector(
    '.container.small-container.utility-position-relative.utility-text-on-overlay.utility-text-align-center'
  );
  const contentCell = [];
  if (contentContainer) {
    // Heading (h1)
    const heading = contentContainer.querySelector('h1');
    if (heading) contentCell.push(heading);
    // Subheading (p)
    const subheading = contentContainer.querySelector('p');
    if (subheading) contentCell.push(subheading);
    // CTA Buttons (could be multiple <a> tags in button group)
    const buttonGroup = contentContainer.querySelector('.button-group');
    if (buttonGroup) {
      const links = Array.from(buttonGroup.querySelectorAll('a'));
      if (links.length > 0) {
        contentCell.push(...links);
      }
    }
  }

  // Table rows: header, image(s), content
  const rows = [
    headerRow,
    [imagesCell],
    [contentCell]
  ];

  // Create and swap table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
