/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the <ul> list containing cards
  const ul = element.querySelector('ul');
  if (!ul) return;
  const cards = Array.from(ul.children);

  // Table rows: first row is the specified header
  const rows = [['Cards (cards3)']];

  cards.forEach((li) => {
    // --- Left cell: Image or icon ---
    let imgCell = null;
    const imageDiv = li.querySelector('.cards-card-image');
    if (imageDiv) {
      // Prefer <picture> if present, else <img>
      const picture = imageDiv.querySelector('picture');
      if (picture) {
        imgCell = picture;
      } else {
        const img = imageDiv.querySelector('img');
        if (img) imgCell = img;
      }
    }
    // --- Right cell: Text ---
    const bodyDiv = li.querySelector('.cards-card-body');
    let textCell = [];
    if (bodyDiv) {
      // Use all children of bodyDiv (e.g., <p>, text nodes)
      textCell = Array.from(bodyDiv.childNodes).filter(n => {
        // Keep elements and non-empty text nodes
        return n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim() !== '');
      });
      // Flatten to single element if only one
      if (textCell.length === 1) textCell = textCell[0];
    } else {
      textCell = '';
    }
    rows.push([imgCell, textCell]);
  });

  // Create and replace table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
