function parseText(xmlDoc) {
  let workbookElements = { datasources: [] };

  let datasources = xmlDoc.getElementsByTagName("datasources")[0].children;
  //  Datasources
  for (let datasource of datasources) {
    datasourceObj = { name: "", connections: [] };
    // Data Source
    let datasourceCaption = datasource.getAttribute("caption");
    datasourceObj.name = datasourceCaption;
    // Connections
    let connections = datasource.getElementsByTagName("connection");
    for (let index = 0; index < connections.length; index++) {
      // Connection
      let connection = connections[index];
      datasourceObj.connections.push(connection);
    }
    workbookElements.datasources.push(datasourceObj);
  }
  return workbookElements;
}

function changeWorkbookElement(workbookElements) {
  for (let datasource of workbookElements.datasources) {
    for (let connection of datasource.connections) {
      console.log(connection.getAttribute("class"));
      connection.setAttribute("class", "batata");
      console.log(connection.getAttribute("class"));
    }
  }
}

function createForm(workbookElements) {
  let outputDiv = document.querySelector("#output");

  for (let datasource of workbookElements.datasources) {
    for (let connection of datasource.connections) {
    }
  }
}

async function getFile(url) {
  let content;
  await fetch(url)
    .then((response) => {
      return response.text();
    })
    .then((text) => {
      content = text;
    });
  return content;
}

async function main() {
  const parser = new DOMParser();

  content = await getFile("/samples/sample.twb");
  let xmlDoc = parser.parseFromString(content, "text/xml");
  workbookElements = parseText(xmlDoc);
  // changeWorkbookElement(workbookElements);
}

main();
