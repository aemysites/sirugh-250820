/* global WebImporter */
export default function parse(element, { document }) {
  function getDirectChildren(parent, selector) {
    return Array.from(parent.querySelectorAll(':scope > ' + selector));
  }

  // Get the main column content
  const container = element.querySelector('.container');
  if (!container) return;
  const mainGrid = container.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  if (!mainGrid) return;
  const gridCols = getDirectChildren(mainGrid, 'div');
  if (gridCols.length < 2) return;

  // Left column: eyebrow and heading
  const leftCol = document.createElement('div');
  const leftContent = gridCols[0];
  const eyebrow = leftContent.querySelector('.eyebrow');
  if (eyebrow) leftCol.appendChild(eyebrow);
  const h1 = leftContent.querySelector('h1');
  if (h1) leftCol.appendChild(h1);

  // Right column: paragraph, byline, button
  const rightCol = document.createElement('div');
  const rightContent = gridCols[1];
  const richText = rightContent.querySelector('.rich-text');
  if (richText) rightCol.appendChild(richText);
  const innerGrid = rightContent.querySelector('.w-layout-grid');
  if (innerGrid) {
    Array.from(innerGrid.children).forEach((node) => {
      rightCol.appendChild(node);
    });
  }

  // Bottom images
  const bottomGrid = container.parentElement.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  let imgCells = [];
  if (bottomGrid) {
    imgCells = getDirectChildren(bottomGrid, 'div').map((imgWrap) => {
      const img = imgWrap.querySelector('img');
      return img ? img : '';
    });
  } else {
    imgCells = Array.from(element.querySelectorAll('.utility-aspect-1x1 img'));
  }
  while (imgCells.length < 2) imgCells.push('');

  // --- CRITICAL FIX for header row ---
  // Header row must have ONLY ONE cell
  const headerRow = ['Columns (columns11)'];
  const firstContentRow = [leftCol, rightCol];
  const secondContentRow = imgCells;

  const cells = [headerRow, firstContentRow, secondContentRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
