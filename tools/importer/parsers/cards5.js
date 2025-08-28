/* global WebImporter */
export default function parse(element, { document }) {
  // Compose header row
  const headerRow = ['Cards (cards5)'];

  // Find the grid of product cards
  const grid = element.querySelector('.product-discovery-product-list__grid');
  if (!grid) return;

  // Get all card elements inside the grid
  const cardEls = Array.from(grid.querySelectorAll(':scope > .dropin-product-item-card'));

  const dataRows = cardEls.map(card => {
    // Image element
    const imgEl = card.querySelector('img');

    // Text cell assemble: title (strong), price, in visual order
    const textElements = [];
    // Title (use existing anchor text, styled as strong)
    const titleLink = card.querySelector('.dropin-product-item-card__title a');
    if (titleLink) {
      const strong = document.createElement('strong');
      strong.textContent = titleLink.textContent.trim();
      textElements.push(strong);
    }
    // Price (text)
    const priceEl = card.querySelector('.dropin-product-item-card__price .dropin-price');
    if (priceEl) {
      textElements.push(document.createElement('br'));
      textElements.push(document.createTextNode(priceEl.textContent.trim()));
    }
    // (Optional: If there is more relevant info, add here)
    // Return row: only if img and text content present
    return [imgEl, textElements];
  });

  // Compose table cells (header+rows)
  const cells = [headerRow, ...dataRows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
