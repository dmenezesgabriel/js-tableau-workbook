var reader = new FileReader();
let parser = new DOMParser();

function parseText(xml) {
  let xmlDoc = parser.parseFromString(xml, "text/xml");
  let datasources = xmlDoc.getElementsByTagName("datasources")[0].children;
  console.log(datasources);
  //  Datasources
  for (let datasource of datasources) {
    // Data Source
    let datasourceCaption = datasource.getAttribute("caption");
    console.log(datasource);
    // Connections
    let connections = datasource.getElementsByTagName("connection");
    for (let index = 0; index < connections.length; index++) {
      // Connection
      let connection = connections[index];
      console.log(connection);
      let connectionClass = connection.getAttribute("class");
      console.log(connectionClass);
      connectionClass = connection.getAttribute("class");
      connection.setAttribute("class", "batata");
      connectionClass = connection.getAttribute("class");
      console.log(connectionClass);
    }
  }
}

fetch("/samples/sample.twb")
  .then((r) => {
    return r.text();
  })
  .then((text) => {
    parseText(text);
  });
