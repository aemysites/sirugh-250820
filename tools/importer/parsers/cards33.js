/* global WebImporter */
export default function parse(element, { document }) {
  // Header row matches the block name in the example
  const headerRow = ['Cards (cards33)'];
  // Find all card links (each card is an <a>)
  const cards = Array.from(element.querySelectorAll(':scope > a'));
  // For each card, extract image and text content
  const rows = cards.map(card => {
    // Image: first <img> inside the card
    const img = card.querySelector('img');
    // Text content is inside the inner grid (first direct div inside <a>)
    const inner = card.querySelector(':scope > div');
    const textContent = [];
    if (inner) {
      // Tag + read time row (meta info)
      const meta = inner.querySelector('.flex-horizontal');
      if (meta) textContent.push(meta);
      // Heading
      const heading = inner.querySelector('h3, .h4-heading');
      if (heading) textContent.push(heading);
      // Description (first <p>)
      const desc = inner.querySelector('p');
      if (desc) textContent.push(desc);
      // CTA (the last <div> which isn't flex-horizontal/meta)
      const allDivs = Array.from(inner.querySelectorAll(':scope > div'));
      if (allDivs.length) {
        const ctaDiv = allDivs[allDivs.length - 1];
        if (
          ctaDiv !== meta &&
          (!desc || ctaDiv !== desc) &&
          ctaDiv.textContent &&
          ctaDiv.textContent.trim().toLowerCase() === 'read'
        ) {
          textContent.push(ctaDiv);
        }
      }
    }
    return [img, textContent];
  });
  // Assemble final table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  // Replace the original element
  element.replaceWith(table);
}
