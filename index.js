function parseText(xmlDoc) {
  let workbookElements = { datasources: [] };

  let datasources = xmlDoc.getElementsByTagName("datasources")[0].children;
  //  Datasources
  for (let datasource of datasources) {
    datasourceObj = { tag: "", connections: [] };
    // Data Source
    let datasourceCaption = datasource.getAttribute("caption");
    datasourceObj.tag = datasource;
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
    let datasourceCaption = datasource.tag.getAttribute("caption");
    let datasourceDiv = document.createElement("div");
    outputDiv.appendChild(datasourceDiv);

    const datasourceCaptionLabel = document.createElement("label");
    datasourceCaptionLabel.setAttribute("for", datasourceCaption);
    datasourceCaptionLabel.innerHTML = "DB CAPTION: ";
    datasourceDiv.appendChild(datasourceCaptionLabel);

    const datasourceCaptionInput = document.createElement("input");
    datasourceCaptionInput.setAttribute("name", datasourceCaption);
    datasourceCaptionInput.setAttribute("value", datasourceCaption);
    datasourceDiv.appendChild(datasourceCaptionInput);

    const breakRow = document.createElement("br");
    datasourceDiv.appendChild(breakRow);

    for (let connection of datasource.connections) {
      let connectionDbname = connection.getAttribute("dbname");

      const connectionDbnameLabel = document.createElement("label");
      connectionDbnameLabel.setAttribute("for", connectionDbname);
      connectionDbnameLabel.innerHTML = "DB Name: ";
      datasourceDiv.appendChild(connectionDbnameLabel);

      const connectionDbnameInput = document.createElement("input");
      connectionDbnameInput.setAttribute("name", connectionDbname);
      connectionDbnameInput.setAttribute("value", connectionDbname);
      datasourceDiv.appendChild(connectionDbnameInput);

      const breakRow = document.createElement("br");
      datasourceDiv.appendChild(breakRow);
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
  createForm(workbookElements);
  // changeWorkbookElement(workbookElements);
}

main();
