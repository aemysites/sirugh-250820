/* global WebImporter */
export default function parse(element, { document }) {
  // Always start with the block header row
  const headerRow = ['Cards (cards25)'];
  const rows = [];
  // Get all direct card containers
  const cards = Array.from(element.querySelectorAll(':scope > div'));
  cards.forEach(card => {
    // Find the first image in this card
    const img = card.querySelector('img');
    // Try to locate the content div containing h3 and p
    let textContent = null;
    // Search for the deepest div with h3 or p
    const candidateDivs = Array.from(card.querySelectorAll('div'));
    let foundContentDiv = null;
    for (let i = candidateDivs.length - 1; i >= 0; i--) {
      if (candidateDivs[i].querySelector('h3, p')) {
        foundContentDiv = candidateDivs[i];
        break;
      }
    }
    if (foundContentDiv) {
      textContent = foundContentDiv;
    } else {
      // If there's a heading or paragraph directly
      const h3 = card.querySelector('h3');
      const p = card.querySelector('p');
      if (h3 || p) {
        const wrap = document.createElement('div');
        if (h3) wrap.appendChild(h3);
        if (p) wrap.appendChild(p);
        textContent = wrap;
      } else {
        // No text content found
        textContent = '';
      }
    }
    // For cards that only have an image, allow empty text
    rows.push([img, textContent]);
  });
  // Merge into final cell array
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}