function parseText(fileName, xmlDoc) {
  console.log(xmlDoc);
  let workbookElements = { name: fileName, datasources: [] };

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
    datasourceCaptionInput.dataset.caption = datasourceCaption;
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
      connectionDbnameInput.dataset.dbname = connectionDbname;
      datasourceDiv.appendChild(connectionDbnameInput);

      const breakRow = document.createElement("br");
      datasourceDiv.appendChild(breakRow);
    }
  }
  const actionButton = document.createElement("button");
  actionButton.innerHTML = "Apply";
  actionButton.onclick = changeWorkbookElement;
  document.body.appendChild(actionButton);
}

function changeWorkbookElement() {
  for (let datasource of workbookElements.datasources) {
    datasourceCaption = datasource.tag.getAttribute("caption");
    datasourceCaptionInput = document.querySelector(`input[data-caption="${datasourceCaption}"]`).value;
    datasource.tag.setAttribute("caption", datasourceCaptionInput);
    for (let connection of datasource.connections) {
      connectionDbname = connection.getAttribute("dbname");
      datasourceCaptionInput = document.querySelector(`input[data-dbname="${connectionDbname}"]`).value;
      connection.setAttribute("dbname", connectionDbname);
    }
  }
  const serializer = new XMLSerializer();
  const xmlStr = serializer.serializeToString(xmlDoc);
  download(`${workbookElements.name}`, xmlStr);
}

function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute("href", "data:text/twb;charset=utf-8," + encodeURIComponent(text));
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

// async function fetchFile(url) {
//   let content;
//   await fetch(url)
//     .then((response) => {
//       return response.text();
//     })
//     .then((text) => {
//       content = text;
//     });
//   return content;
// }

// async function main() {
//   const parser = new DOMParser();

//   content = await fetchFile("/samples/sample.twb");
//   xmlDoc = parser.parseFromString(content, "text/xml");
//   workbookElements = parseText(xmlDoc);
//   createForm(workbookElements);
// }

function getFile() {
  const parser = new DOMParser();
  var file = document.getElementById("file").files[0];

  console.log(file.name);
  var reader = new FileReader();
  reader.readAsText(file, "UTF-8");
  reader.onload = (event) => {
    content = event.target.result;
    xmlDoc = parser.parseFromString(content, "text/xml");
    workbookElements = parseText(file.name, xmlDoc);
    createForm(workbookElements);
  };
}

// main();
