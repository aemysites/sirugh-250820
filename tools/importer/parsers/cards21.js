/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards21) block table
  const headerRow = ['Cards (cards21)'];

  // Defensive: find all card bodies inside the block (handles single/multiple cards)
  const cardBodies = element.querySelectorAll('.card-body');
  const rows = [];
  cardBodies.forEach(cardBody => {
    // Get image (mandatory, per guidelines)
    const img = cardBody.querySelector('img');
    // Get title (optional)
    const title = cardBody.querySelector('.h4-heading');
    // Get description (optional, below heading)
    // In this HTML, description is not present
    // Collect all text content for card text cell
    const cardText = [];
    if (title) cardText.push(title);
    // If there were more text, it would be added here
    rows.push([img, cardText]);
  });

  // Compose table: header + all card rows
  const cells = [headerRow, ...rows];
  
  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
