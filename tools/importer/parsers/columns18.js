/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout that contains the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // The grid contains three children: left content, contacts list, and image
  // We'll extract them in order
  const cols = Array.from(grid.children);
  if (cols.length < 3) return;

  // First column: the left content (heading, subheading, paragraph)
  const leftContent = cols[0];
  // Second column: the contact methods (ul > li)
  const contactContent = cols[1];
  // Third column: the image
  const image = cols[2];

  // The example calls for a table with a header and one row of two columns (text/contact, image)
  // Each cell can be an array of elements
  const headerRow = ['Columns (columns18)'];

  // Left column: all the left content and the full contacts list below it
  // We'll put all children of leftContent and contactContent together in the left cell
  const leftCellContent = [
    ...Array.from(leftContent.children),
    contactContent // the UL list as a whole
  ];

  // Right column: the image
  const rightCellContent = [image];

  const cells = [
    headerRow,
    [leftCellContent, rightCellContent]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
