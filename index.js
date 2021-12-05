import Workbook from "./Workbook.js";

function getWorkbook() {
  let file = document.getElementById("file").files[0];
  const reader = new FileReader();
  const parser = new DOMParser();
  let xmlDoc = reader.readAsText(file, "UTF-8");
  // Since onload has asynchronous behaviour subsequent code must be trigger by a callback
  reader.onload = (event) => {
    let xmlDoc = parser.parseFromString(event.target.result, "text/xml");
    callback(file.name, xmlDoc);
  };
}

function callback(filename, xml) {
  let workbook = new Workbook(filename, xml);
  console.log(workbook);

  for (let datasourceIndex in workbook.datasources) {
    let datasource = workbook.datasources[datasourceIndex];
    console.log(datasource);
    for (let connectionIndex in datasource.connections) {
      let connection = datasource.connections[connectionIndex];
      console.log(connection);
      connection.dbName = "sample-testing";
    }
  }
  workbook.save();
}

async function main() {
  let fileUpload = document.querySelector("#file");
  fileUpload.onchange = getWorkbook;
}

main();
