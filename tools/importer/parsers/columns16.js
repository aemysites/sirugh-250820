/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid of columns in the section
  const columnsGrid = element.querySelector('.grid-layout');
  if (!columnsGrid) return;

  // Get all direct children (columns)
  const columnDivs = Array.from(columnsGrid.children);

  // For each column, get its main content element (img)
  // Each cell in the second row should be a single column's content
  const columnCells = columnDivs.map(col => {
    const aspectDiv = col.querySelector('.utility-aspect-2x3');
    if (aspectDiv) {
      const img = aspectDiv.querySelector('img');
      if (img) return img;
      return aspectDiv;
    }
    return col;
  });

  // First row: header, must be exactly one cell
  const headerRow = ['Columns (columns16)'];
  // Second row: N columns, each is a cell

  // Table rows structure
  const cells = [headerRow, columnCells];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
