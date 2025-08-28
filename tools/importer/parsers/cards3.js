/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards3) block header row, exactly as required
  const headerRow = ['Cards (cards3)'];

  // Find the product grid containing the cards
  const grid = element.querySelector('.product-discovery-product-list__grid');
  if (!grid) return;

  // Collect all card elements
  const cards = Array.from(grid.children).filter(child => child.classList && child.classList.contains('dropin-product-item-card'));

  const rows = cards.map((card) => {
    // ---- IMAGE CELL ----
    // Use the actual <img> element referenced from the DOM
    const image = card.querySelector('img');

    // ---- TEXT CELL ----
    // Grab the content container for each card
    const contentDiv = card.querySelector('.dropin-product-item-card__content');
    // We'll collect structured content for semantic meaning: strong for title, divs for price and CTAs
    const rightCellElements = [];

    // Product name/title
    const titleLink = contentDiv && contentDiv.querySelector('.dropin-product-item-card__title a');
    if (titleLink) {
      const strong = document.createElement('strong');
      strong.textContent = titleLink.textContent.trim();
      rightCellElements.push(strong);
    }

    // Product price
    const priceDiv = contentDiv && contentDiv.querySelector('.dropin-product-item-card__price');
    if (priceDiv) {
      // Get inner text from priceDiv (includes $ and cents)
      const priceText = priceDiv.textContent.trim();
      if (priceText) {
        const price = document.createElement('div');
        price.textContent = priceText;
        rightCellElements.push(price);
      }
    }

    // Add-to-Cart and Wishlist buttons as CTAs
    const actionDiv = contentDiv && contentDiv.querySelector('.dropin-product-item-card__action');
    if (actionDiv) {
      const btns = actionDiv.querySelectorAll('button');
      btns.forEach(btn => {
        const btnText = btn.textContent.trim();
        if (btnText) {
          const btnEl = document.createElement('div');
          btnEl.textContent = btnText;
          rightCellElements.push(btnEl);
        }
      });
    }

    // Ensure fallback if no content extracted
    if (!rightCellElements.length && contentDiv) {
      rightCellElements.push(document.createTextNode(contentDiv.textContent.trim()));
    }

    // Final row for table: always [image, rightCell]
    return [image, rightCellElements];
  });

  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
