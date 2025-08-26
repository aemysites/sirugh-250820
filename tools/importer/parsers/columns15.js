/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid with columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Find the image (right column)
  const imageEl = gridChildren.find(child => child.tagName === 'IMG');
  // Find the text content (left column)
  const textColEl = gridChildren.find(child => child.tagName === 'DIV');

  // If not found, fallback
  if (!textColEl && gridChildren.length) {
    // If no DIV, use first child
    textColEl = gridChildren[0];
  }
  if (!imageEl && gridChildren.length > 1) {
    // If no IMG, use second child
    imageEl = gridChildren[1];
  }

  // Compose left column as all content from textColEl
  // Reference the element directly for resilience and complete content
  const leftCol = textColEl;
  const rightCol = imageEl;

  // Table header matches example
  const headerRow = ['Columns (columns15)'];
  const contentRow = [leftCol, rightCol];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
