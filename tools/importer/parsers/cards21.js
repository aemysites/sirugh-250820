/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per spec
  const headerRow = ['Cards (cards21)'];

  // Find all direct or nested .card elements within this block
  const cards = element.querySelectorAll('.card');

  const rows = Array.from(cards).map((card) => {
    // Image/icon: required, should be first cell
    const img = card.querySelector('img');

    // The card body may contain heading, description, etc.
    const cardBody = card.querySelector('.card-body') || card;

    // Find heading inside card body
    let title = cardBody.querySelector('.h4-heading, h4, [class*=heading]');

    // Gather all text elements: heading and any siblings except img
    const textElements = [];
    if (title) textElements.push(title);

    // Description: any element in cardBody that is NOT title and NOT img
    Array.from(cardBody.children).forEach((el) => {
      if (el !== title && el !== img && el.tagName.toLowerCase() !== 'img') {
        textElements.push(el);
      }
    });

    // Compose row: [image, text content (title + description if present)]
    return [img, textElements];
  });

  // Compose table: header row then card rows
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
