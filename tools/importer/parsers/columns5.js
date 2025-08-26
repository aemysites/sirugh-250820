/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns grid (contains two main columns)
  const mainGrid = element.querySelector('.grid-layout.tablet-1-column');
  if (!mainGrid) return;

  // Get direct children of the grid (should be 2: left content, right image)
  const cols = Array.from(mainGrid.children);

  // Left column: has text content and buttons
  let textCol = null;
  let imgCol = null;

  for (const child of cols) {
    if (
      child.querySelector &&
      child.querySelector('h2') &&
      child.querySelector('.w-richtext')
    ) {
      textCol = child;
    } else if (child.tagName === 'IMG') {
      imgCol = child;
    }
  }

  // Defensive fallback if not found
  if (!textCol) textCol = cols.find((c) => c.querySelector && c.querySelector('h2')) || cols[0];
  if (!imgCol) imgCol = cols.find((c) => c.tagName === 'IMG') || cols[1];

  // Compose table block
  const headerRow = ['Columns (columns5)'];
  const contentRow = [textCol, imgCol];
  const block = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(block);
}
