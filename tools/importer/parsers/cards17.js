/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row
  const headerRow = ['Cards (cards17)'];

  // Get all immediate card blocks (divs)
  const cardDivs = element.querySelectorAll(':scope > div');
  const rows = [];

  cardDivs.forEach((cardDiv) => {
    // Find the first image in the card
    const img = cardDiv.querySelector('img');
    // For cards that have only an image in HTML, use the alt text as card text
    let textCell;
    if (img && img.alt && img.alt.trim()) {
      // Prefer to wrap the alt text in a <p> as the card text
      const p = document.createElement('p');
      p.textContent = img.alt.trim();
      textCell = p;
    } else {
      // No alt text: empty string
      textCell = '';
    }
    // Each row is [image, text cell]
    rows.push([img, textCell]);
  });

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
