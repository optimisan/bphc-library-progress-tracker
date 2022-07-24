M.Tabs.init(document.querySelectorAll(".tabs"), {});

function getClassFromStatus(status) {
  switch (status) {
    case STATUS.SOLVING:
      return "orange lighten-5";
    case STATUS.SOLVED:
    case STATUS.DONE:
      return "teal lighten-5";
    case STATUS.TO_SOLVE:
      return "purple lighten-5";
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