/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the main grid that holds all cards
  let cardsGrid;
  if (element.classList.contains('section')) {
    const container = element.querySelector('.container');
    if (container) {
      // The first grid-layout inside the container is the main cards grid
      cardsGrid = container.querySelector('.grid-layout');
    }
  }
  if (!cardsGrid) cardsGrid = element;

  // 2. Flatten to all card elements (may be nested in grid-layout, so flatten once)
  let cardEls = [];
  Array.from(cardsGrid.children).forEach(child => {
    if (child.classList.contains('grid-layout')) {
      cardEls.push(...Array.from(child.children));
    } else {
      cardEls.push(child);
    }
  });
  // Only consider elements with utility-link-content-block class
  cardEls = cardEls.filter(el => el.classList.contains('utility-link-content-block'));

  const rows = [['Cards (cards37)']];

  cardEls.forEach(card => {
    // --- IMAGE
    // Look for either utility-aspect-2x3 or utility-aspect-1x1 inside card
    let imgWrapper = card.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    let img = imgWrapper ? imgWrapper.querySelector('img') : card.querySelector('img');
    // --- TEXT CONTENT
    // Try to get .utility-padding-all-2rem as text container (for main card), otherwise card itself
    let textContainer = card.querySelector('.utility-padding-all-2rem') || card;

    // Title: first h3 or .h2-heading or .h4-heading in textContainer
    let title = textContainer.querySelector('h3, .h2-heading, .h4-heading');
    // Description: first p in textContainer
    let desc = textContainer.querySelector('p');
    // CTA: button or div.button (for Explore button)
    let cta = textContainer.querySelector('a.button, button, .button');

    // Only include elements that exist
    let textContent = [];
    if (title) textContent.push(title);
    if (desc) textContent.push(desc);
    // Only add CTA if it is not just a container (e.g. .button used as a div for styling)
    if (cta && cta.textContent.trim()) textContent.push(cta);

    // Always provide two columns: image | text content
    rows.push([
      img || '',
      textContent.length > 1 ? textContent : textContent[0] || ''
    ]);
  });

  // Now construct the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
