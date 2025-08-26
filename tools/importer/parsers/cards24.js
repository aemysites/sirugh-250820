/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header
  const headerRow = ['Cards (cards24)'];

  // Find all card links
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  const rows = cards.map(card => {
    // 1st cell: The card image (reference the actual <img> element)
    let img = null;
    const imgWrapper = card.querySelector('.utility-aspect-2x3');
    if (imgWrapper) {
      img = imgWrapper.querySelector('img');
    }
    // 2nd cell: All the text content for the card
    // Use existing elements for tags/date/heading
    const cellContent = [];
    const metaBar = card.querySelector('.flex-horizontal');
    if (metaBar) {
      cellContent.push(metaBar);
    }
    const heading = card.querySelector('h3');
    if (heading) {
      cellContent.push(heading);
    }
    return [img ? img : '', cellContent];
  });

  // Build the block table
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
