/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row, must be exactly 'Carousel'
  const cells = [['Carousel']];

  // Find the subgrid containing carousel content
  // Usually it's the first '.grid-layout.desktop-3-column' inside card-body
  const cardBody = element.querySelector('.card-body');
  let grid;
  if (cardBody) {
    grid = cardBody.querySelector('.grid-layout.desktop-3-column, .grid-layout');
  }
  // Fallback if not found
  if (!grid) {
    grid = element.querySelector('.grid-layout.desktop-3-column, .grid-layout');
  }
  if (!grid) return;

  // Get all immediate children of the grid - these are either images or text blocks
  const slides = [];
  const gridChildren = Array.from(grid.children);
  let images = [], textBlocks = [];
  gridChildren.forEach(child => {
    if (child.tagName === 'IMG') {
      images.push(child);
    } else {
      // Only include DIVs with meaningful text content
      if (child.querySelector('h1,h2,h3,h4,h5,h6,p,a,button')) {
        textBlocks.push(child);
      }
    }
  });

  // In the provided HTML, the first image (background bakery) is outside this grid, but inside the section
  // Find all images inside the section that are NOT inside the carousel grid, and insert them at the beginning
  const sectionImages = Array.from(element.querySelectorAll('img'));
  sectionImages.forEach(img => {
    if (!grid.contains(img) && img.src) {
      images.unshift(img);
      // For these, there's no corresponding text block
      textBlocks.unshift('');
    }
  });

  // Pair images and text blocks (slide: [image, textBlock])
  const maxSlides = Math.max(images.length, textBlocks.length);
  for (let i = 0; i < maxSlides; i++) {
    const img = images[i] || '';
    const text = textBlocks[i] || '';
    cells.push([img, text]);
  }

  // Create block table and replace original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
