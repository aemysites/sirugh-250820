/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate child elements matching selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.querySelectorAll(':scope > ' + selector));
  }

  // Extract tab labels
  const tabMenu = getDirectChildren(element, 'div')[0];
  const tabLinks = getDirectChildren(tabMenu, 'a');
  const tabLabels = tabLinks.map(link => {
    const labelDiv = link.querySelector('div');
    return labelDiv ? labelDiv.textContent.trim() : link.textContent.trim();
  });

  // Extract tab content (each pane)
  const tabContentContainer = getDirectChildren(element, 'div')[1];
  const tabPaneDivs = getDirectChildren(tabContentContainer, 'div');
  const tabContents = tabPaneDivs.map(tabDiv => {
    // Each tabDiv contains a grid with actual content
    const grid = getDirectChildren(tabDiv, 'div')[0];
    return grid || tabDiv;
  });

  // Compose cells according to the block spec: header (single column), then rows for each tab (each 2 columns)
  const headerRow = ['Tabs']; // must be a single column
  const rows = tabLabels.map((label, i) => [label, tabContents[i]]); // each row has 2 columns
  const cells = [headerRow, ...rows];

  // Create table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
