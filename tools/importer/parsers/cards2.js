/* global WebImporter */
export default function parse(element, { document }) {
  const productListGrid = element.querySelector('.search__product-list .product-discovery-product-list__grid');
  if (!productListGrid) return;
  const cells = [['Cards (cards2)']];

  Array.from(productListGrid.children).forEach(cardEl => {
    if (!cardEl.classList.contains('dropin-product-item-card')) return;
    let imageCell = '';
    const img = cardEl.querySelector('img');
    if (img) imageCell = img;

    const textCell = [];
    const content = cardEl.querySelector('.dropin-product-item-card__content');
    if (content) {
      // Title (strong)
      const titleBlock = content.querySelector('.dropin-product-item-card__title');
      if (titleBlock) {
        const link = titleBlock.querySelector('a');
        const strong = document.createElement('strong');
        strong.textContent = link && link.textContent.trim() ? link.textContent.trim() : titleBlock.textContent.trim();
        textCell.push(strong);
      }
      // Description(s) between title and price/action
      let foundTitle = false;
      let foundPriceOrAction = false;
      Array.from(content.childNodes).forEach(node => {
        // Identify the boundaries
        if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('dropin-product-item-card__title')) {
          foundTitle = true;
          return;
        }
        if (node.nodeType === Node.ELEMENT_NODE && (node.classList.contains('dropin-product-item-card__price') || node.classList.contains('dropin-product-item-card__action'))) {
          foundPriceOrAction = true;
          return;
        }
        // Add any text nodes or elements with text between title and price/action
        if (foundTitle && !foundPriceOrAction) {
          if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
            const p = document.createElement('p');
            p.textContent = node.textContent.trim();
            textCell.push(p);
          }
          if (node.nodeType === Node.ELEMENT_NODE && node.textContent.trim()) {
            // If not empty, add as <p>
            const p = document.createElement('p');
            p.textContent = node.textContent.trim();
            textCell.push(p);
          }
        }
      });
      // Price
      const priceBlock = content.querySelector('.dropin-price');
      if (priceBlock && priceBlock.textContent.trim()) {
        const div = document.createElement('div');
        div.textContent = priceBlock.textContent.trim();
        textCell.push(div);
      }
      // Add to Cart CTA
      const addToCartBtn = content.querySelector('.product-discovery-product-actions__add-to-cart button');
      if (addToCartBtn) {
        textCell.push(addToCartBtn);
      }
    }
    cells.push([imageCell, textCell]);
  });
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
