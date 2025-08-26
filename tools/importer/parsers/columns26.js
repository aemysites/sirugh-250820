/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main container
  const container = element.querySelector('.container');
  if (!container) return;

  // Get the main grid (holds heading, paragraph, and inner grid)
  const columnsGrid = container.querySelector('.grid-layout.grid-gap-sm.y-bottom');
  if (!columnsGrid) return;
  
  // Extract heading, paragraph, inner grid (with divider, avatar etc)
  const heading = columnsGrid.querySelector('p.h2-heading');
  const paragraph = columnsGrid.querySelector('p.paragraph-lg');
  const innerGrid = columnsGrid.querySelector('.w-layout-grid.grid-gap-sm.w-node-_3ef8ef40-2915-728f-b826-c7b8d23344dd-34b92918');
  if (!innerGrid) return;

  // Get divider, avatar row, logoDiv from inner grid
  const divider = innerGrid.querySelector('.divider');
  const flex = innerGrid.querySelector('.flex-horizontal');
  const logoDiv = innerGrid.querySelector('.utility-display-inline-block');

  // Build left column: group all left-side content in a single div
  const leftCol = document.createElement('div');
  if (heading) leftCol.appendChild(heading);
  if (paragraph) leftCol.appendChild(paragraph);
  if (divider) leftCol.appendChild(divider);
  if (flex) leftCol.appendChild(flex);

  // Build right column: only logo svg
  const rightCol = document.createElement('div');
  if (logoDiv) rightCol.appendChild(logoDiv);

  const cells = [
    ['Columns (columns26)'],
    [leftCol, rightCol]
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
