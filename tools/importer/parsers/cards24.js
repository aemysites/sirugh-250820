/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as specified
  const headerRow = ['Cards (cards24)'];
  const rows = [headerRow];

  // Each immediate child <a> is a card
  const cards = Array.from(element.querySelectorAll(':scope > a'));
  cards.forEach((card) => {
    // First column: image (mandatory)
    let image = null;
    const aspectDiv = card.querySelector('.utility-aspect-2x3');
    if (aspectDiv) {
      image = aspectDiv.querySelector('img');
    }

    // Second column: text content
    const textParts = [];
    // Tag and Date row
    const metaDiv = card.querySelector('.flex-horizontal');
    if (metaDiv) {
      // build a div containing each meta bit styled as original
      const metaContainer = document.createElement('div');
      Array.from(metaDiv.children).forEach((child) => {
        const span = document.createElement('span');
        span.textContent = child.textContent.trim();
        metaContainer.appendChild(span);
        metaContainer.appendChild(document.createTextNode(' '));
      });
      textParts.push(metaContainer);
    }
    // Heading (mandatory)
    const heading = card.querySelector('h3, .h4-heading');
    if (heading) {
      // Reference the existing heading element instead of cloning
      textParts.push(heading);
    }
    rows.push([
      image || '',
      textParts
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
