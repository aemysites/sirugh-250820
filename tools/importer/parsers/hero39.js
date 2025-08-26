/* global WebImporter */
export default function parse(element, { document }) {
  // Table header: must match the example exactly
  const headerRow = ['Hero (hero39)'];

  // Get immediate child grid divs
  const gridDivs = element.querySelectorAll(':scope > div > div');

  // 2nd row: Background image (use the first img only, as in example)
  let imageRow = [''];
  if (gridDivs.length > 0) {
    const firstDiv = gridDivs[0];
    const img = firstDiv.querySelector('img');
    if (img) {
      imageRow = [img];
    }
  }

  // 3rd row: Headline, description, CTA
  let contentRow = [''];
  if (gridDivs.length > 1) {
    const textDiv = gridDivs[1];
    // Find the content grid if present
    const innerGrid = textDiv.querySelector('.w-layout-grid') || textDiv;

    // Gather headings (all levels), paragraphs, and CTA (a.button or within .button-group)
    const headings = Array.from(innerGrid.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    const paragraphs = Array.from(innerGrid.querySelectorAll('p'));
    // Find CTA button/link: the example only wants text + link, so keep just the first CTA
    let cta = null;
    const buttonGroup = innerGrid.querySelector('.button-group');
    if (buttonGroup) {
      cta = buttonGroup.querySelector('a');
    } else {
      // fallback: check for any direct .button, if present
      cta = innerGrid.querySelector('a.button');
    }
    // Compose cell content, preserving order and using references
    const contentArr = [];
    headings.forEach(h => contentArr.push(h));
    paragraphs.forEach(p => contentArr.push(p));
    if (cta) contentArr.push(cta);
    contentRow = [contentArr];
  }

  // Build final block table
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
