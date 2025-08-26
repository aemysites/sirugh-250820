/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main content container inside the section
  const container = element.querySelector('.container');
  if (!container) return;

  // Get the outer grid containing all block content
  const topGrid = container.querySelector('.w-layout-grid.grid-layout');
  if (!topGrid) return;

  // Get all direct children of the top grid
  const children = Array.from(topGrid.children);
  // children[0] = heading, children[1] = quote, children[2] = inner grid

  // Defensive: check for each part before using
  const heading = children[0] || null;
  const quote = children[1] || null;
  const innerGrid = children[2] || null;

  // For the inner grid, get relevant inner children
  // Expected: divider, author info row, icon row
  let authorRow = null;
  let iconRow = null;
  if (innerGrid) {
    const innerGridDivs = Array.from(innerGrid.children);
    authorRow = innerGridDivs[1] || null;
    iconRow = innerGridDivs[2] || null;
  }

  // Build left (column 1): heading and author info
  const leftColContent = [];
  if (heading) leftColContent.push(heading);
  if (authorRow) leftColContent.push(authorRow);

  // Build right (column 2): quote and icon
  const rightColContent = [];
  if (quote) rightColContent.push(quote);
  if (iconRow) rightColContent.push(iconRow);

  // Table header must be exactly as specified
  const headerRow = ['Columns (columns26)'];

  // Row with two columns of content
  const columnsRow = [leftColContent, rightColContent];

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace original element with the new block table
  element.replaceWith(table);
}
