/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns block within the wrapper
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Each row (visual horizontal block) is a direct child <div> of .columns.block
  const rowGroups = Array.from(columnsBlock.children);

  // Determine the number of columns (should be 2 for this block)
  let numCols = 0;
  for (const row of rowGroups) {
    numCols = Math.max(numCols, row.children.length);
  }
  if (numCols < 2) numCols = 2; // fallback to 2 columns

  // Construct the table rows
  const rows = [];
  // Header row as in example
  rows.push(['Columns (columns5)']);

  // For each row group, add cells for each column
  rowGroups.forEach((row) => {
    const cells = [];
    for (let i = 0; i < numCols; i++) {
      const col = row.children[i];
      if (col) {
        // Reference the column element directly
        cells.push(col);
      } else {
        cells.push(''); // keep column count consistent
      }
    }
    rows.push(cells);
  });

  // Create and replace with block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
