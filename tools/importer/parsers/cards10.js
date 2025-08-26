/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row as in the block example
  const rows = [['Cards (cards10)']];

  // Select all direct child card anchors
  const cards = element.querySelectorAll(':scope > a.card-link');

  cards.forEach(card => {
    // First cell: image (mandatory)
    const imageDiv = card.querySelector('.utility-aspect-3x2');
    let imageCell = null;
    if (imageDiv) {
      // Use the whole aspect wrapper as the cell (keeps image context/style, more resilient)
      imageCell = imageDiv;
    }

    // Second cell: text content (tag, title, description)
    const textDiv = card.querySelector('.utility-padding-all-1rem');
    const cellContent = [];
    if (textDiv) {
      // Tag (optional), styled as div at top
      const tagDiv = textDiv.querySelector('.tag-group');
      if (tagDiv) {
        cellContent.push(tagDiv);
      }
      // Title (optional)
      const heading = textDiv.querySelector('h3, .h4-heading');
      if (heading) {
        cellContent.push(heading);
      }
      // Description (optional)
      const desc = textDiv.querySelector('p');
      if (desc) {
        cellContent.push(desc);
      }
    }
    rows.push([
      imageCell,
      cellContent
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
