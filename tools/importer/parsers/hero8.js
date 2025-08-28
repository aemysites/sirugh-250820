/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the hero block
  const heroBlock = element.querySelector('.hero.block');
  if (!heroBlock) return;

  // 2. Find the innermost content wrapper (should contain the image and text)
  const blockContent = heroBlock.querySelector('div > div') || heroBlock.querySelector('div');
  if (!blockContent) return;

  // 3. Extract image (picture element)
  let imgCell = null;
  const picture = blockContent.querySelector('picture');
  if (picture) {
    imgCell = picture;
  }

  // 4. Extract content: All children except the img picture-containing <p> and empty <p>
  const contentCell = document.createElement('div');
  const children = Array.from(blockContent.children);
  children.forEach(child => {
    // Skip <p> that contains only the image
    if (child.tagName === 'P' && child.contains(picture)) return;
    // Skip empty <p>
    if (child.tagName === 'P' && child.textContent.trim() === '') return;
    contentCell.appendChild(child);
  });

  // 5. Assemble rows to match the table format: header, image, text
  const headerRow = ['Hero (hero8)'];
  const imgRow = [imgCell].filter(Boolean); // Only if image exists
  const contentRow = [contentCell];
  // Always 3 rows, if image is missing then 2nd row is empty
  while (imgRow.length < 1) imgRow.push('');

  const cells = [headerRow, imgRow, contentRow];

  // 6. Create table block and replace original element
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}
