/* global WebImporter */
export default function parse(element, { document }) {
  // Table header - matches example
  const headerRow = ['Cards (cards33)'];
  const rows = [headerRow];

  // Each card is an <a> immediate child
  const cards = element.querySelectorAll(':scope > a');
  cards.forEach(card => {
    // First cell: The image element in the card
    const img = card.querySelector('img');
    // Second cell: The text content block (the div after img)
    // The structure is: <a> > <div.w-layout-grid> > [img, <div>...text...]
    // So get the child grid, then the div after img
    const grid = card.querySelector(':scope > div');
    let textContent = null;
    if (grid) {
      // Find the first element child after img
      // grid.children[0] = img, grid.children[1] = content div
      if (grid.children.length > 1) {
        textContent = grid.children[1];
      } else {
        // fallback: if only one child, and it's not img
        textContent = grid.children[0];
      }
    } else {
      // fallback: use card itself
      textContent = card;
    }
    rows.push([img, textContent]);
  });

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
