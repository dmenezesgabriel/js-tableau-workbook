export default class Datasource {
  constructor(caption) {
    this.caption = caption;
    this.connections = [];
    this.addConnection = this.addConnection.bind(this);
  }
  addConnection(connection) {
    this.connections.push(connection);
  }
}
