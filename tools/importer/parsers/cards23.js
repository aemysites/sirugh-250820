/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per instructions
  const headerRow = ['Cards (cards23)'];
  const blockRows = [];

  // Find all tab panes within the block (each tab contains a grid of cards)
  const tabPanes = element.querySelectorAll('.w-tab-pane');
  tabPanes.forEach((pane) => {
    // Each grid contains a set of card anchors
    const grid = pane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Only direct children that are <a> (each card)
    const cards = grid.querySelectorAll(':scope > a');
    cards.forEach((card) => {
      // IMAGE cell - look for a direct img in the card (could be nested in a div)
      let imgCell = '';
      const img = card.querySelector('img');
      if (img) imgCell = img;
      
      // TEXT cell: try to get heading and description for the card
      // Heading: h3.h4-heading
      // Description: div.paragraph-sm
      // Sometimes, these may be nested inside wrappers
      let heading = card.querySelector('h3');
      let description = null;
      // Try next sibling, but fallback to any .paragraph-sm in card
      if (heading) {
        description = heading.nextElementSibling && heading.nextElementSibling.classList.contains('paragraph-sm')
          ? heading.nextElementSibling
          : card.querySelector('.paragraph-sm');
      } else {
        // Try to recover if heading is missing
        description = card.querySelector('.paragraph-sm');
      }
      // Compose text cell
      const textArr = [];
      if (heading) textArr.push(heading);
      if (description && description !== heading) textArr.push(description);
      const textCell = textArr.length > 0 ? textArr : '';

      // Only push row if there's at least title or image
      if (imgCell || textCell) {
        blockRows.push([imgCell, textCell]);
      }
    });
  });

  // Compose the final table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...blockRows
  ], document);

  element.replaceWith(table);
}
