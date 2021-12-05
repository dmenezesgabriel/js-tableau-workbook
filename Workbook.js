import Datasource from "./Datasource.js";
import Worksheet from "./Worksheet.js";

export default class Workbook {
  /**
  Class for writing tableau workbook files
   */
  constructor(filename, xml) {
    this._fileName = filename;
    this._workbookXML = xml;
    this._dashboards = this._prepareDashboards(this._workbookXML);
    this._datasources = this._prepareDatasources(this._workbookXML);
    this._datasourceIndex = this._prepareDatasourceIndex(this._datasources);
    this._worksheets = this._prepareWorksheets(this._workbookXML, this._datasourceIndex);
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

  _prepareDatasourceIndex(datasources) {
    // TODO
    // Replace for a WeakRef "dict"
    let datasourceIndexes = {};
    for (let datasourceIndex in datasources) {
      let datasource = datasources[datasourceIndex];

      datasourceIndexes[datasource.name] = datasource;
    }
    return datasourceIndexes;
  }

  _prepareWorksheets(workbookXML, datasourcesIndex) {
    let worksheets = [];

    let worksheetElements = workbookXML.getElementsByTagName("worksheets")[0].children;
    if (!worksheetElements) return [];

    for (let worksheet of worksheetElements) {
      let worksheetXML = new Worksheet(worksheet);
      worksheets.push(worksheetXML);

      let dependencies = worksheet.getElementsByTagName("datasource-dependencies");
      for (let index = 0; index < dependencies.length; index++) {
        let dependency = dependencies[index];
        let datasourceName = dependency.getAttribute("datasource");
        let datasource = datasourcesIndex[datasourceName];
        let columns = worksheet.getElementsByTagName("column");
        for (let index = 0; index < columns.length; index++) {
          let column = columns[index];
          let columnName = column.getAttribute("name");
          console.log(`Column name: ${columnName}`);
        }
      }
    }
    return worksheets;
  }

  get datasources() {
    return this._datasources;
  }

  get dashboards() {
    return this._dashboards;
  }

  get worksheets() {
    return this._worksheets;
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
