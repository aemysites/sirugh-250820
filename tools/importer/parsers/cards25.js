/* global WebImporter */
export default function parse(element, { document }) {
  // Build the table header as in the example
  const headerRow = ['Cards (cards25)'];

  // Get all direct children (cards) in the grid
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Helper: Extract card info: only cards with both img and text block
  function extractCard(div) {
    // Find first <img> descendant
    const img = div.querySelector('img');
    // Find the text container: look for .utility-padding-all-2rem
    const textContainer = div.querySelector('.utility-padding-all-2rem');
    if (!img || !textContainer) return null;
    // Extract title (h3) and description (p) if present
    const title = textContainer.querySelector('h3');
    const desc = textContainer.querySelector('p');
    // Compose text cell: maintain all present and in order
    const textCell = [];
    if (title) textCell.push(title);
    if (desc) textCell.push(desc);
    return [img, textCell];
  }

  // Compose rows: only include divs with both img and text content
  const rows = cardDivs
    .map(extractCard)
    .filter(Boolean);

  // If no valid cards, do nothing
  if (rows.length === 0) return;

  // Build table data
  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
