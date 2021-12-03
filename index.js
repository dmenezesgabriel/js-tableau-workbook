function parseText(fileName, xmlDoc) {
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
  var fieldset = document.createElement("fieldset");
  outputDiv.appendChild(fieldset);
  for (let datasource of workbookElements.datasources) {
    let datasourceCaption = datasource.tag.getAttribute("caption");
    if (!datasourceCaption) {
      continue;
    }
    var datasourceDiv = document.createElement("div");
    datasourceDiv.className = "input-group";
    fieldset.appendChild(datasourceDiv);

    const datasourceCaptionLabel = document.createElement("label");
    datasourceCaptionLabel.setAttribute("for", datasourceCaption);
    datasourceCaptionLabel.innerHTML = "Database Caption: ";
    datasourceDiv.appendChild(datasourceCaptionLabel);

    const datasourceCaptionInput = document.createElement("input");
    datasourceCaptionInput.setAttribute("name", datasourceCaption);
    datasourceCaptionInput.setAttribute("value", datasourceCaption);
    datasourceCaptionInput.setAttribute("type", "text");

    datasourceCaptionInput.dataset.caption = datasourceCaption;
    datasourceDiv.appendChild(datasourceCaptionInput);

    const breakRow = document.createElement("br");
    datasourceDiv.appendChild(breakRow);

    for (let connection of datasource.connections) {
      let connectionDbname = connection.getAttribute("dbname");
      if (!connectionDbname) {
        continue;
      }
      const connectionDbnameLabel = document.createElement("label");
      connectionDbnameLabel.setAttribute("for", connectionDbname);
      connectionDbnameLabel.innerHTML = "Database Name: ";
      datasourceDiv.appendChild(connectionDbnameLabel);

      const connectionDbnameInput = document.createElement("input");
      connectionDbnameInput.setAttribute("name", connectionDbname);
      connectionDbnameInput.setAttribute("value", connectionDbname);
      connectionDbnameInput.setAttribute("type", "text");

      connectionDbnameInput.dataset.dbname = connectionDbname;
      datasourceDiv.appendChild(connectionDbnameInput);

      const breakRow = document.createElement("br");
      datasourceDiv.appendChild(breakRow);
    }
    const line = document.createElement("hr");
    datasourceDiv.appendChild(line);
  }
  const actionButton = document.createElement("button");
  actionButton.className = "btn btn-action";
  actionButton.innerHTML = "Download";
  actionButton.onclick = changeWorkbookElement;
  fieldset.appendChild(actionButton);
}

function changeWorkbookElement() {
  for (let datasource of workbookElements.datasources) {
    datasourceCaption = datasource.tag.getAttribute("caption");
    if (!datasourceCaption) {
      continue;
    }
    datasourceCaptionInput = document.querySelector(`input[data-caption="${datasourceCaption}"]`).value;
    datasource.tag.setAttribute("caption", datasourceCaptionInput);
    for (let connection of datasource.connections) {
      connectionDbname = connection.getAttribute("dbname");
      if (!connectionDbname) {
        continue;
      }
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

// main();
