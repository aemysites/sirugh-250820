/* global WebImporter */
export default function parse(element, { document }) {
  // The header row should be a single cell with the block name exactly as specified
  const headerRow = ['Columns (columns4)'];

  // Get all immediate child divs (each is a column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For maximal resiliency: each column cell should include all content inside each direct column div
  // This allows for mixed content (images, text, lists, buttons, etc.)
  const columnCells = columns.map((col) => {
    // Collect all children of the column div
    const colChildren = Array.from(col.childNodes).filter(
      n => n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim()) // element nodes or non-empty text nodes
    );
    // If the column div contains only whitespace, use an empty string
    return colChildren.length > 0 ? colChildren : '';
  });

  // Build the table: header row, then one row with all column cells
  const tableCells = [headerRow, columnCells];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element
  element.replaceWith(block);
}
