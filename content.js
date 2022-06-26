//do not get table.table because other pages also have table.table
//only items pages have .itemDisplayTable table classes
const table = document.querySelector("table.panel-body");
if (table) {
  const rows = table.querySelectorAll("tbody tr:not(:first-child)");
  rows.forEach((row, i) => {
    row.insertAdjacentHTML("beforeend", getDropdown(i));
  })
  //event handler for the dropdown click
  table.addEventListener("click", (e) => {
    const target = e.target;
    if (target.hasAttribute("data-id")) {
      //this means it is the dropdown item that was clicked.
      updateUI(target);
      //update the status in chrome storage
      updateStatus(target);
    }
  })
  fetchAndUpdate(rows);
}
/**
 * Fetches the status from chrome storage and updates the UI accordingly.
 * @param {NodeListOf<Element>} rows Table rows
 */
async function fetchAndUpdate(rows) {
  const pid = getPaperCollectionId();
  const items = await chrome.storage.local.get(pid)
  const obj = items[pid];
  if (obj) {
    //this paper id exists
    for (const id in obj) {
      console.log(id, obj[id]);
      const label = obj[id].status;
      const button = document.getElementById(`dropdownMenu${id}`);
      button.innerHTML = label + "<span class='caret'></span>";
      button.classList.remove("btn-default");
      button.classList.add(getClass(label));
    }
  }
}
async function updateStatus(target) {
  //get the new status label
  const label = target.innerText;
  const id = target.getAttribute("data-id");
  const paperCollectionId = getPaperCollectionId();
  //set the status in chrome storage
  let existingObj = await chrome.storage.local.get(paperCollectionId);
  existingObj = existingObj[paperCollectionId];
  if (label == "Clear") {
    //delete the label key
    delete existingObj[id];
    await chrome.storage.local.set({ [paperCollectionId]: existingObj });

  } else {
    chrome.storage.local.set({
      [paperCollectionId]: {
        ...existingObj,
        [id]: {
          status: label,
          lastUpdated: Date.now(),
        }
      }
    }, () => {
      console.log("Status updated");
    });
  }
}
function updateUI(target) {
  //set the corresponding dropdown innerText to the text of the clicked item.
  const id = target.getAttribute("data-id");
  let label = target.innerText;
  if (label === "Clear") {
    label = "Status";
  }
  const button = document.getElementById(`dropdownMenu${id}`);
  const oldLabel = button.innerText;
  button.innerHTML = label + "<span class='caret'></span>";
  //set the class according to the label.
  //remove the old class from oldLabel
  button.classList.remove(getClass(oldLabel));
  button.classList.add(getClass(label));
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
function getDropdown(i) {
  return `<td><div class="dropdown">
  <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu${i}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    Status
    <span class="caret"></span>
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenu${i}">
    <li class="clear"><a href="#!" data-id="${i}">Clear</a></li>
    <li class="to-solve"><a href="#!" data-id="${i}">To solve</a></li>
    <li class="solving"><a href="#!" data-id="${i}">Solving</a></li>
    <li class="done"><a href="#!" data-id="${i}">Done</a></li>
  </ul>
</div></td>`;
}