/* global WebImporter */
export default function parse(element, { document }) {
  // Get the tab menu and content wrappers
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabContent = element.querySelector('.w-tab-content');
  if (!tabMenu || !tabContent) return;

  // Get all tab menu links (labels)
  const tabLinks = Array.from(tabMenu.querySelectorAll('a'));
  // Get all tab panes (contents)
  const tabPanes = Array.from(tabContent.querySelectorAll('.w-tab-pane'));

  // Build table rows: header row (single column), then each tab row (two columns)
  const cells = [];
  // Header row: single cell
  cells.push(['Tabs']);

  // Each tab row: [Label, Content]
  tabLinks.forEach((tabLink, i) => {
    // Label extraction
    let label = '';
    const labelDiv = tabLink.querySelector('div');
    if (labelDiv) {
      label = labelDiv.textContent.trim();
    } else {
      label = tabLink.textContent.trim();
    }
    // Content extraction
    let content = '';
    const tabPane = tabPanes[i];
    if (tabPane) {
      // If tabPane has exactly one child, use that child for a clean reference
      if (tabPane.children.length === 1) {
        content = tabPane.firstElementChild;
      } else {
        content = tabPane;
      }
    }
    cells.push([label, content]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
