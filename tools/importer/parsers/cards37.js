/* global WebImporter */
export default function parse(element, { document }) {
  // --- 1. Table Header ---
  const headerRow = ['Cards (cards37)'];

  // --- 2. Find main grid container with cards ---
  const container = element.querySelector('.container > .w-layout-grid');
  if (!container) return;

  // The first child is the big left card (an <a>), the second child is the nested grid (for other cards)
  const [leftCard, rightGrid] = Array.from(container.children);

  function extractCardInfo(cardEl) {
    // Card image: the first img inside the card
    const img = cardEl.querySelector('img');
    // Card heading: Prefer h2, fall back to h3, h4, etc.
    const heading = cardEl.querySelector('h2, h3, h4, h5, h6');
    // Card description: first <p> inside
    const desc = cardEl.querySelector('p');
    // Card CTA: look for .button or button, but only if it is inside the card
    const cta = cardEl.querySelector('.button, button');
    // Compose text cell
    const textCell = [];
    if (heading) textCell.push(heading);
    if (desc) textCell.push(desc);
    if (cta) textCell.push(cta);
    return [img, textCell];
  }

  const tableRows = [];
  // Left card exists and is an <a>
  if (leftCard && leftCard.tagName === 'A') {
    tableRows.push(extractCardInfo(leftCard));
  }
  // Right grid exists and contains only <a> cards
  if (rightGrid && rightGrid.classList.contains('w-layout-grid')) {
    rightGrid.querySelectorAll('a.utility-link-content-block').forEach(card => {
      tableRows.push(extractCardInfo(card));
    });
  }

  // --- 3. Compose table data ---
  const tableData = [headerRow, ...tableRows];
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}
