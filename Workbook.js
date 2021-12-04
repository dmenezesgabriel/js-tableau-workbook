import Datasource from "./Datasource.js";

export default class Workbook {
  /**
  Class for writing tableau workbook files
   */
  constructor(filename, xml) {
    this._fileName = filename;
    this._workbookXML = xml;
    this._datasources = this.prepareDatasources(this._workbookXML);
  }

  prepareDatasources(workbookXML) {
    let datasources = [];

    let datasourceElements = workbookXML.getElementsByTagName("datasources")[0].children;
    if (!datasourceElements) return [];

    for (let datasource of datasourceElements) {
      let datasourceXML = new Datasource(datasource);
      datasources.push(datasourceXML);
    }
    return datasources;
  }
}
