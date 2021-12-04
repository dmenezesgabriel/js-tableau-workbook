import Connection from "./Connection.js";

export default class Datasource {
  constructor(datasourceXML, fileName = null) {
    this._fileName = fileName;
    this._datasourceXML = datasourceXML;
    this._name = this._datasourceXML.getAttribute("name");
    this._version = this._datasourceXML.getAttribute("version");
    this._caption = this._datasourceXML.getAttribute("caption");
    this._connections = this.prepareConnections(this._datasourceXML);
  }

  prepareConnections(datasourceXML) {
    let connections = [];
    let connectionsElements = datasourceXML.getElementsByTagName("connection");
    for (let index = 0; index < connectionsElements.length; index++) {
      // Connection
      let connection = new Connection(connectionsElements[index]);
      connections.push(connection);
    }
    return connections;
  }

  get connections() {
    return this._connections;
  }
}
