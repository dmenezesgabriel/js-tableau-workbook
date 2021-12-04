export default class Datasource {
  constructor(datasourceXML, fileName = null) {
    this._fileName = fileName;
    this._datasourceXML = datasourceXML;
    this._name = this._datasourceXML.getAttribute("name");
    this._version = this._datasourceXML.getAttribute("version");
    this._caption = this._datasourceXML.getAttribute("caption");
  }
}
