/* global WebImporter */
export default function parse(element, { document }) {
  // Table header matches example
  const headerRow = ['Hero (hero28)'];

  // Find all direct children of grid layout (robust against variations)
  const gridLayout = element.querySelector('.w-layout-grid');
  let imageEl = null;
  let contentEl = null;

  if (gridLayout) {
    const gridChildren = gridLayout.children;
    // Find image: look for an <img> tag in any child
    for (let i = 0; i < gridChildren.length; i++) {
      const img = gridChildren[i].querySelector('img');
      if (img && !imageEl) {
        imageEl = img;
      }
    }
    // Find content: look for a heading (h1, h2, etc.) in any child
    for (let i = 0; i < gridChildren.length; i++) {
      if (gridChildren[i].querySelector('h1, h2, h3, h4, h5, h6, p, a, button')) {
        // Avoid duplicating the image cell in case it also contains headings
        if (gridChildren[i] !== imageEl?.parentElement?.parentElement) {
          contentEl = gridChildren[i];
          break;
        }
      }
    }
    // Fallbacks for edge cases
    if (!imageEl && gridChildren.length > 0) {
      // Sometimes image might be deeply nested, so look for first img anywhere
      imageEl = gridLayout.querySelector('img');
    }
    if (!contentEl && gridChildren.length > 1) {
      // If not found, use second grid item for content
      contentEl = gridChildren[1];
    }
  }

  // Edge case: No image/content found, put empty string
  const imageCell = imageEl || '';
  const contentCell = contentEl || '';

  // Table: 1 column, 3 rows as required
  const cells = [
    headerRow,
    [imageCell],
    [contentCell]
  ];

  // Create table block and replace element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
