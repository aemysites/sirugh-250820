/* global WebImporter */
export default function parse(element, { document }) {
  // Header row matches the example exactly
  const headerRow = ['Columns (columns19)'];

  // Get all immediate children; each is a column
  const columns = Array.from(element.children);

  // Determine target columns per row (as per example: 4 columns per row)
  const columnsPerRow = 4;
  const rows = [];

  // For each column, gather the content (svg + paragraph)
  const cells = columns.map((col) => {
    const iconDiv = col.querySelector('.icon');
    const svg = iconDiv ? iconDiv.querySelector('svg') : null;
    const p = col.querySelector('p');
    const content = [];
    if (svg) {
      const svgContainer = document.createElement('span');
      svgContainer.appendChild(svg);
      content.push(svgContainer);
    }
    if (p) {
      content.push(p);
    }
    return content.length === 1 ? content[0] : content;
  });

  // Chunk the cells into rows of 4 columns each
  for (let i = 0; i < cells.length; i += columnsPerRow) {
    rows.push(cells.slice(i, i + columnsPerRow));
  }

  // Build the final table data array
  const tableData = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(block);
}
