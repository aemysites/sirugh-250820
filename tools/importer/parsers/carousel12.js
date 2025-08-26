/* global WebImporter */
export default function parse(element, { document }) {
  // Carousel header row
  const headerRow = ['Carousel'];
  const rows = [headerRow];

  // Find the grid that contains the slides
  const mainGrid = element.querySelector('.grid-layout');
  if (!mainGrid) return;

  // Look for all card-body grid layouts (each could be a slide)
  // In this structure, there may be only one, but be robust for multiple
  const cardBodies = mainGrid.querySelectorAll('.card-body .grid-layout');
  for (const slideGrid of cardBodies) {
    // Each slideGrid (desktop-3-column) contains an image and a text block
    // Find all direct children (should be image and text)
    const slideChildren = Array.from(slideGrid.children);
    // Slides are grouped as pairs: image then content
    for (let i = 0; i < slideChildren.length; i += 2) {
      const img = slideChildren[i].tagName === 'IMG' ? slideChildren[i] : null;
      const content = slideChildren[i+1] ? slideChildren[i+1] : '';
      if (!img) continue;
      rows.push([img, content]);
    }
  }

  // If no cardBody found, check for fallback: image+content pairs in main grid
  if (cardBodies.length === 0) {
    // Sometimes each slide is just a div with img+content group
    const slideCandidates = Array.from(mainGrid.children);
    for (let i = 0; i < slideCandidates.length; i += 2) {
      const img = slideCandidates[i].querySelector('img');
      const content = slideCandidates[i+1] || '';
      if (img) {
        rows.push([img, content]);
      }
    }
  }

  // Only create block if there is at least one slide
  if (rows.length > 1) {
    const block = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(block);
  }
}
