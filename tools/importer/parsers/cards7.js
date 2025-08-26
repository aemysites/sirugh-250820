/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure header row is a single cell as per example
  const headerRow = ['Cards (cards7)'];

  // Each card is a direct child div of the container
  const cardDivs = element.querySelectorAll(':scope > div');

  // For image-only cards, each row is [image, ''] (2 columns, second cell empty)
  const rows = Array.from(cardDivs).map(cardDiv => {
    const img = cardDiv.querySelector('img');
    // Always provide two cells per row: first cell image (or blank), second cell blank
    return [img || '', ''];
  });

  // Create block table with header and card rows
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
