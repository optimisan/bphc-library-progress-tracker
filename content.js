


/**
 * Get the paper (PDF) title name from corresponding row.
 * @param {number} id Dropdown id
 */
function getPaperName(id) {
  const button = document.getElementById(`dropdownMenu${id}`);
  //get parent row (tr) from button
  const row = button.parentElement.parentElement.parentElement;
  //the title is in the first child of this row
  const title = row.children[0].innerText;
  return title;
}
/**
 * Get the collection name from the page header info.
 * @returns {string}
 */
function getCollectionName() {
  const table = document.querySelector("table.itemDisplayTable");
  return table.querySelector("tbody tr:first-child td:last-child").innerText;
}

function getPaperCollectionId() {
  const pathname = (new URL(window.location.href)).pathname;
  return pathname.split("/")[4];
}
function getClass(label) {
  console.log("Getting class for", label)
  switch (label) {
    case "Clear":
    case "Status":
      return "btn-default";
    case "To solve":
      return "btn-danger";
    case "Solving":
      return "btn-warning";
    case "Done":
      return "btn-success";
    default:
      return "btn-default";
  }
}