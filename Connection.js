export default class Connection {
  constructor(connectionXML) {
    this._connectionXML = connectionXML;
    this._dbName = connectionXML.getAttribute("dbname");
  }
}
