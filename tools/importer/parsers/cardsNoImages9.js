/* global WebImporter */
export default function parse(element, { document }) {
  // Find the list of cards (ul inside the cards block)
  const ul = element.querySelector('ul');
  if (!ul) return;
  const lis = Array.from(ul.children);

  // Table header must exactly match the example
  const headerRow = ['Cards (cardsNoImages9)'];
  const rows = [headerRow];

  lis.forEach((li) => {
    // Each li contains a div.cards-card-body with the card content
    const body = li.querySelector('.cards-card-body');
    if (body && (body.textContent || body.innerHTML)) {
      // Place the original DOM element (not a clone) as the cell content
      rows.push([body]);
    }
  });

  // Only create and replace if there is at least the header + one row
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}
