/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in example
  const headerRow = ['Cards (cards17)'];
  // Each card: direct child 
  const cardDivs = Array.from(element.querySelectorAll(':scope > .utility-aspect-1x1'));
  // Each card contains exactly one <img>
  const rows = cardDivs.map(div => {
    const img = div.querySelector('img'); // Should always be present per spec
    // The second column must exist, but since there's no text content in the HTML, use empty string
    return [img, ''];
  });
  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
