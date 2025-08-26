/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified
  const headerRow = ['Columns (columns38)'];

  // Get direct children of the grid container (representing columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, include all of its child nodes (not just images)
  // This captures text, lists, images, buttons, etc.
  const cellsRow = columns.map(col => {
    // Filter out empty text nodes
    const nodes = Array.from(col.childNodes).filter(node => {
      return (
        node.nodeType !== Node.TEXT_NODE || (node.textContent && node.textContent.trim() !== '')
      );
    });
    // If only one node, just return it. If multiple, return as array.
    if (nodes.length === 1) {
      return nodes[0];
    }
    return nodes;
  });

  const table = WebImporter.DOMUtils.createTable([headerRow, cellsRow], document);
  element.replaceWith(table);
}
