/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout in the header (the columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the direct children of the grid (these are the columns)
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // First column: image (could be img or picture)
  const imageEl = gridChildren[0];
  // Second column: content block (heading, subheading, button-group)
  const contentEl = gridChildren[1];

  // Prepare array for the content column
  const contentArr = [];

  // Find heading (prefer h1, but fallback to any heading)
  const heading = contentEl.querySelector('h1, h2, h3, h4, h5, h6');
  if (heading) contentArr.push(heading);

  // Find subheading/paragraph
  const paragraph = contentEl.querySelector('p');
  if (paragraph) contentArr.push(paragraph);

  // Find button group (could be one or more buttons)
  const buttonGroup = contentEl.querySelector('.button-group');
  if (buttonGroup) contentArr.push(buttonGroup);

  // Compose cells: Header row and content row with the two columns
  const cells = [
    ['Columns (columns1)'],
    [imageEl, contentArr]
  ];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
