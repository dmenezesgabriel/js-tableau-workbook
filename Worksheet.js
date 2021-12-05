export default class Worksheet {
  constructor(worksheetXML) {
    this._worksheetXML = worksheetXML;
    this._name = this._worksheetXML.getAttribute("name");
  }
}
