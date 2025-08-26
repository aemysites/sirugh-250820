/* global WebImporter */
export default function parse(element, { document }) {
  // Find all tab panes inside the block (each tab represents a card group)
  const tabPanes = element.querySelectorAll('.w-tab-pane');
  tabPanes.forEach(tabPane => {
    // Find the grid of cards in each tab
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Get all direct card links (each card is an <a>)
    const cards = Array.from(grid.children).filter(child => child.tagName === 'A');
    const rows = [['Cards (cards23)']]; // Table header
    cards.forEach(card => {
      // Image cell: find the first <img> in the card (if present)
      const img = card.querySelector('img');
      // Text cell: find the heading and description (if present)
      let heading = card.querySelector('h3, .h4-heading');
      let desc = card.querySelector('.paragraph-sm');
      const textParts = [];
      if (heading) textParts.push(heading);
      if (desc) textParts.push(desc);
      rows.push([
        img || '',
        textParts
      ]);
    });
    // Create and insert the block table in place of the grid
    const table = WebImporter.DOMUtils.createTable(rows, document);
    grid.replaceWith(table);
  });
}
