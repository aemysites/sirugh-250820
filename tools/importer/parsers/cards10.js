/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Get all direct card links (cards)
  const cards = Array.from(element.querySelectorAll(':scope > a.card-link'));

  cards.forEach(card => {
    // 1st cell: the image (first .utility-aspect-3x2 div > img)
    let img = null;
    const imgContainer = card.querySelector('.utility-aspect-3x2');
    if (imgContainer) {
      img = imgContainer.querySelector('img');
    }

    // 2nd cell: text content (tag, title, description)
    const textContainer = card.querySelector('.utility-padding-all-1rem');
    const contentNodes = [];

    // Tag (optional)
    const tagDiv = textContainer && textContainer.querySelector('.tag');
    if (tagDiv) {
      contentNodes.push(tagDiv);
    }
    // Heading (h3)
    const heading = textContainer && textContainer.querySelector('h3');
    if (heading) {
      contentNodes.push(heading);
    }
    // Description (p)
    const para = textContainer && textContainer.querySelector('p');
    if (para) {
      contentNodes.push(para);
    }

    rows.push([
      img,
      contentNodes
    ]);
  });

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
