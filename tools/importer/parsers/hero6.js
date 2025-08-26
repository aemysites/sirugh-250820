/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row (must match the example EXACTLY)
  const headerRow = ['Hero (hero6)'];

  // 2. Background Image Row: extract the <img> with class 'cover-image' (background image)
  const bgImg = element.querySelector('img.cover-image') || null;

  // 3. Content Row: extract title, subheading, CTAs
  let contentCell = null;
  const card = element.querySelector('div.card');
  if (card) {
    const nodes = [];
    // Collect all non-empty Element nodes (e.g., H1, P, button group)
    card.childNodes.forEach(node => {
      if (node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim())) {
        // Only append if node has visible content
        nodes.push(node);
      }
    });
    if (nodes.length === 1) {
      contentCell = nodes[0];
    } else if (nodes.length > 1) {
      const frag = document.createDocumentFragment();
      nodes.forEach(n => frag.appendChild(n));
      contentCell = frag;
    }
  }

  // Fallback: if card is missing, leave cell empty (edge case)
  if (!contentCell) contentCell = '';

  // Build table rows
  const rows = [
    headerRow,
    [bgImg],
    [contentCell],
  ];

  // Create table using helper and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
