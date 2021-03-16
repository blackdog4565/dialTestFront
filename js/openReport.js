document.getElementById("openReportForm").addEventListener("click", openReport)
document
  .getElementById("closeReportForm")
  .addEventListener("click", closeReport)

function closeReport(event) {
  event.preventDefault()

  document.getElementById("measuringForm").style.display = "flex"
  document.getElementById("createReport").style.display = "none"
  document.getElementById("valuesClapReport").style.height = "0"
  document.getElementById("valuesClapReport").style.display = "none"
}

function openReport(event) {
  event.preventDefault()

  document.getElementById("measuringForm").style.display = "none"
  document.getElementById("createReport").style.display = "flex"

  getDepartments1()
  getValves1()
}

async function getDepartments1() {
  return await fetch("http://dialtestback.ru/getDepartments.php", {
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/x-form-urlencoded",
    },
  })
    .then((response) => response.text())
    .then((data) => renderSelect1(data))
}

function renderSelect1(data) {
  const departmentsInfo = JSON.parse(data)
  const stringList = []

  for (const key in departmentsInfo) {
    if (departmentsInfo.hasOwnProperty(key)) {
      stringList.push(
        `<option value="${key}">${departmentsInfo[key]}</option>`
      )
    }
  }

  document.getElementById("depart1").innerHTML = stringList
}

async function getValves1() {
  return await fetch("http://dialtestback.ru/getValves.php", {
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/x-form-urlencoded",
    },
  })
    .then((response) => response.text())
    .then((data) => renderValves1(data))
}

function renderValves1(data) {
  const stringList = []
  data
    .trim()
    .split(" ")
    .forEach((element) => {
      stringList.push(`
            <option value="${element}">${element}</option>
          `)
    })
  document.getElementById("valve1").innerHTML = stringList.join("")
}
