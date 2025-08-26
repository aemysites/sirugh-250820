/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header - match example exactly
  const headerRow = ['Accordion'];

  // 2. Gather all accordion blocks (direct children)
  const accordionEls = element.querySelectorAll(':scope > .accordion');

  const rows = [];
  accordionEls.forEach(accEl => {
    // Title cell: it's always the .paragraph-lg inside the .w-dropdown-toggle
    let toggle = accEl.querySelector('.w-dropdown-toggle');
    let title = toggle && toggle.querySelector('.paragraph-lg');
    if (!title) {
      // Edge case: fallback to first div inside toggle, or just toggle itself
      const fallback = toggle && toggle.querySelector('div');
      title = fallback || toggle || document.createElement('div');
    }

    // Content cell: always the .accordion-content, which contains answer
    let contentNav = accEl.querySelector('.accordion-content');
    let content = null;
    if (contentNav) {
      // Usually the markdown body is inside .rich-text or .w-richtext
      content = contentNav.querySelector('.rich-text, .w-richtext');
      // If not, fallback to first div, else use nav itself
      if (!content) {
        content = contentNav.querySelector('div') || contentNav;
      }
    }
    if (!content) {
      // Edge case: create empty div
      content = document.createElement('div');
    }

    // Reference elements directly (no cloning or recreating)
    rows.push([title, content]);
  });

  // 3. Table: 2 columns, header + 1 row per accordion block
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // 4. Replace the original element
  element.replaceWith(table);
}
