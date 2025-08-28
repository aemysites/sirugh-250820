/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero image: first <picture> or <img> in the element
  let heroImage = null;
  heroImage = element.querySelector('picture, img');

  // Find the main content wrapper (where headings and text live)
  let contentCellElements = [];
  // The hero text/content may be in the deepest div, or directly inside the hero block
  let mainContent = null;
  // Try to locate the hero.block
  const heroBlock = element.querySelector('.hero.block');
  if (heroBlock) {
    // This usually has a single immediate child (a div), which holds the content
    const innerDivs = heroBlock.querySelectorAll(':scope > div');
    if (innerDivs.length > 0) {
      mainContent = innerDivs[innerDivs.length - 1];
    }
  }
  if (!mainContent) {
    // fallback: use the whole element
    mainContent = element;
  }

  // Gather children except the image
  const children = Array.from(mainContent.children);
  for (const child of children) {
    // Skip if this is a <p> with only a <picture> or <img> (the image cell)
    if (
      (child.tagName === 'P') &&
      child.childElementCount === 1 &&
      (child.firstElementChild.tagName === 'PICTURE' || child.firstElementChild.tagName === 'IMG')
    ) {
      continue;
    }
    // Skip empty <p></p>
    if (child.tagName === 'P' && child.textContent.trim() === '' && child.childElementCount === 0) {
      continue;
    }
    contentCellElements.push(child);
  }

  // Remove trailing empty <p> if any
  while (contentCellElements.length > 0) {
    const last = contentCellElements[contentCellElements.length - 1];
    if (last.tagName === 'P' && last.textContent.trim() === '' && last.childElementCount === 0) {
      contentCellElements.pop();
    } else {
      break;
    }
  }

  // Compose table rows
  const headerRow = ['Hero (hero1)'];
  const imageRow = [heroImage ? heroImage : ''];
  const contentRow = [contentCellElements.length > 0 ? contentCellElements : ''];
  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
