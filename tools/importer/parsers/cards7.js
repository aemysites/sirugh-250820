/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as specified
  const headerRow = ['Cards (cards7)'];

  // Get all direct child divs, which represent cards
  const cardDivs = element.querySelectorAll(':scope > div');

  const rows = Array.from(cardDivs).map((div) => {
    // Try to find an image (mandatory per block description)
    const img = div.querySelector('img');
    // No text content is present in these cards in the provided HTML, so the second cell is blank
    return [img, ''];
  });

  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
