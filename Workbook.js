import XFile from "./XFile.js";

export default class Workbook {
  /**
  Class for writing tableau workbook files
   */
  constructor(file) {
    this._filename = file.name;
    this._workbookTree = XFile.getTree(file);
    this._datasources = this.datasources = [];
    this.addDatasource = this.addDatasource.bind(this);
  }
  addDatasource(datasource) {
    this.datasources.push(datasource);
  }

  _getContentFromFile(file) {}
}
