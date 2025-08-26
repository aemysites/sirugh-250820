/* global WebImporter */
export default function parse(element, { document }) {
  // Header row with exact name from spec
  const headerRow = ['Hero (hero28)'];

  // Extract grid children for layout
  const grid = element.querySelector('.w-layout-grid');
  const gridChildren = grid ? Array.from(grid.children) : [];

  // --- Row 2: Background image (optional) ---
  let backgroundImg = null;
  if (gridChildren.length > 0) {
    // look for img element in hero image container
    backgroundImg = gridChildren[0].querySelector('img');
  }
  // If image is missing, produce an empty cell
  const imgRow = [backgroundImg || ''];

  // --- Row 3: Headline, subheading, CTA ---
  let contentEl = null;
  if (gridChildren.length > 1) {
    // typical layout for hero text
    contentEl = gridChildren[1].querySelector('.utility-margin-bottom-6rem') || gridChildren[1];
  }
  let contentCells = [];
  if (contentEl) {
    // headings
    const heading = contentEl.querySelector('h1');
    if (heading) contentCells.push(heading);
    // subheadings - look for h2, h3, paragraphs (for generality)
    ['h2', 'h3', 'p'].forEach(tag => {
      const el = contentEl.querySelector(tag);
      if (el) contentCells.push(el);
    });
    // CTA/button group
    const buttonGroup = contentEl.querySelector('.button-group');
    if (buttonGroup && buttonGroup.children.length > 0) {
      contentCells.push(buttonGroup);
    }
  }
  // If no specific content, reference the entire block for resilience
  if (contentCells.length === 0 && contentEl) {
    contentCells = [contentEl];
  }
  // Third row is always a single cell, can be an array (multiple elements)
  const textRow = [contentCells.length === 1 ? contentCells[0] : contentCells];

  // Compose the final cells array
  const cells = [headerRow, imgRow, textRow];

  // Create table block according to spec
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with table block
  element.replaceWith(block);
}
