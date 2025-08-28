/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block table
  const headerRow = ['Cards (cards7)'];

  // Find the first ul with card lis
  const ul = element.querySelector('ul');
  if (!ul) return;

  // Get all li elements (cards)
  const cards = Array.from(ul.children).filter(li => li.tagName === 'LI');
  const rows = [headerRow];

  cards.forEach((li) => {
    // Card image cell: always present
    const imageCell = li.querySelector('.cards-card-image');
    // Card body cell: always present
    const bodyCell = li.querySelector('.cards-card-body');
    // Defensive: if either cell missing, skip this row
    if (!imageCell || !bodyCell) return;
    rows.push([imageCell, bodyCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
