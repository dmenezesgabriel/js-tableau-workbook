import Datasource from "./Datasource.js";

export default class Workbook {
  /**
  Class for writing tableau workbook files
   */
  constructor(filename, xml) {
    this._fileName = filename;
    this._workbookXML = xml;
    this._dashboards = this._prepareDashboards(this._workbookXML);
    this._datasources = this._prepareDatasources(this._workbookXML);
  }

  _prepareDashboards(workbookXML) {
    let dashboards = [];

    let dashboardElements = workbookXML.getElementsByTagName("dashboards")[0].children;
    if (!dashboardElements) return [];

    for (let dashboard of dashboardElements) {
      let dashboardName = dashboard.getAttribute("name");
      dashboards.push(dashboardName);
    }
    return dashboards;
  }

  _prepareDatasources(workbookXML) {
    let datasources = [];

    let datasourceElements = workbookXML.getElementsByTagName("datasources")[0].children;
    if (!datasourceElements) return [];

    for (let datasource of datasourceElements) {
      let datasourceXML = new Datasource(datasource);
      datasources.push(datasourceXML);
    }
    return datasources;
  }

  get datasources() {
    return this._datasources;
  }

  get dashboards() {
    return this._dashboards;
  }

  save() {
    const serializer = new XMLSerializer();
    const xmlStr = serializer.serializeToString(this._workbookXML);
    let downloadAnchor = document.createElement("a");

    downloadAnchor.setAttribute("href", "data:text/twb;charset=utf-8," + encodeURIComponent(xmlStr));
    downloadAnchor.setAttribute("download", this._fileName);

    downloadAnchor.style.display = "none";
    document.body.appendChild(downloadAnchor);

    downloadAnchor.click();

    document.body.removeChild(downloadAnchor);
  }
}
