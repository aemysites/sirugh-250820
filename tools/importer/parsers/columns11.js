/* global WebImporter */
export default function parse(element, { document }) {
  // Table header per spec
  const headerRow = ['Columns (columns11)'];

  // Get the two main grids: the top section (content) and the image grid
  const mainGrids = element.querySelectorAll('.w-layout-grid.grid-layout');
  const contentGrid = mainGrids[0]; // Expecting 2 children: heading block, right text/avatar
  const imagesGrid = element.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');

  // Left column: All content except images (headline, text, author, button)
  const leftCol = document.createElement('div');
  if (contentGrid) {
    // Include both direct children blocks in order
    Array.from(contentGrid.children).forEach(block => {
      leftCol.appendChild(block);
    });
  }

  // Right column: All images (stacked vertically)
  const rightCol = document.createElement('div');
  if (imagesGrid) {
    Array.from(imagesGrid.children).forEach(imgBlock => {
      rightCol.appendChild(imgBlock);
    });
  }

  // Table content
  const cells = [
    headerRow,
    [leftCol, rightCol]
  ];
  
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
