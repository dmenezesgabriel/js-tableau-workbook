export default class XFile {
  constructor() {
    // An empty constructor is a pattern on abstract classes
    throw new Error("This class cannot be instantiated");
  }
  static getTree(file) {
    const reader = new FileReader();
    const parser = new DOMParser();

    reader.readAsText(file, "UTF-8");
    reader.onload = (event) => {
      return parser.parseFromString(event.target.result, "text/xml");
    };
  }
}
