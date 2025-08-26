/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header for the block: Exactly 'Accordion'
  const cells = [['Accordion']];

  // Select all immediate children that are accordion items
  const items = element.querySelectorAll(':scope > .accordion.w-dropdown');

  items.forEach((item) => {
    // Title: find the .w-dropdown-toggle .paragraph-lg inside this item
    let titleEl = item.querySelector('.w-dropdown-toggle .paragraph-lg');
    // Content: find the first .accordion-content .w-richtext inside this item
    let contentEl = item.querySelector('.accordion-content .w-richtext');

    // Fallback if elements are missing, use empty string
    if (!titleEl) titleEl = document.createElement('span');
    if (!contentEl) contentEl = document.createElement('span');

    // Reference elements directly, do not clone or create extra elements
    cells.push([titleEl, contentEl]);
  });

  // Create the block table and replace the element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
