M.Tabs.init(document.querySelectorAll(".tabs"), {});
chrome.storage.local.get(null, items => {
  const toSolve = [];
  const solving = [];
  const done = [];
  for (const id in items) {
    //the collection title
    const title = items[id].name;
    toSolve.push(getCardHTML(id, title, items[id].papers, STATUS.TO_SOLVE));
    solving.push(getCardHTML(id, title, items[id].papers, STATUS.SOLVING));
    done.push(getCardHTML(id, title, items[id].papers, STATUS.DONE));
  }
  document.getElementById("to-solve").innerHTML = toSolve.join("");
  document.getElementById("solving").innerHTML = solving.join("");
  document.getElementById("done").innerHTML = done.join("");
})
function getCardHTML(collectionId, title, papers, status) {
  let links = "";
  //iterate over values of papers object
  for (const id in papers) {
    const paper = papers[id];
    //check if status of paper matches above status
    if (paper.status !== status) { continue; }
    // }
    // papers.forEach((paper, i) => {
    //get date string from date.now of paper.lastUpdated
    const date = new Date(paper.lastUpdated);
    const dateString = date.toLocaleDateString();
    links += `<p>
    <a href="http://125.22.54.221:8080/jspui/bitstream/123456789/${collectionId}/${(parseInt(id) + 1)}/${paper.title}" target="_blank">${paper.title}</a>
    (${dateString})
    </p>`;
  }
  // )
  if (links.length == 0) return "";
  return `
  <div class="card horizontal ${getClassFromStatus(status)}">
    <div class="card-stacked">
      <div class="card-content">
        <div class="card-title">
          <a href="${BASE_URL + collectionId}" target="_blank">${title}</a>
        </div>
        ${links}
      </div>
    </div>
  </div>
    `;
}
function getClassFromStatus(status) {
  switch (status) {
    case STATUS.SOLVING:
      return "amber lighten-2";
    case STATUS.SOLVED:
    case STATUS.DONE:
      return "green lighten-4";
    case STATUS.TO_SOLVE:
      return "purple lighten-4";
    default:
      return "blue-grey lighten-3";
  }
}
const BASE_URL = `http://125.22.54.221:8080/jspui/handle/123456789/`;

const STATUS = {
  TO_SOLVE: "To solve",
  SOLVED: "Solved",
  DONE: "Done",
  CLEAR: "Clear",
  SOLVING: "Solving"
}