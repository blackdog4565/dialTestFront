async function getDepartments() {
  return await fetch("http://dialtestback.ru/getDepartments.php", {
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/x-form-urlencoded",
    },
  })
    .then((response) => response.text())
    .then((data) => renderSelect(data))
}

function renderSelect(data) {
  const departmentsInfo = JSON.parse(data)
  const stringList = []

  for (const key in departmentsInfo) {
    if (departmentsInfo.hasOwnProperty(key)) {
      // const element = departmentsInfo[key]
      stringList.push(
        `<option value="${key}">${departmentsInfo[key]}</option>`
      )
    }
  }
  document.getElementById("depart").innerHTML = stringList
}

getDepartments()

async function getValves() {
  return await fetch("http://dialtestback.ru/getValves.php", {
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/x-form-urlencoded",
    },
  })
    .then((response) => response.text())
    .then((data) => renderValves(data))
}

function renderValves(data) {
  let k = 1
  const stringList = []
  data
    .trim()
    .split(" ")
    .forEach((element) => {
      stringList.push(`
          <div class="raw rawInp">
            <p>${element}</p>
            <input name="droppers_volume" type="text" placeholder="0.0" pattern="\\d*(\\.\\d*)?" required />
            <input name="droppers_EC" type="text" placeholder="0.0" pattern="\\d*(\\.\\d*)?" required />
            <input name="droppers_pH" type="text" placeholder="0.0" pattern="\\d*(\\.\\d*)?" required />
            <input name="drainages_volume" type="text" placeholder="0.0" pattern="\\d*(\\.\\d*)?" required />
            <input name="drainages_EC" type="text" placeholder="0.0" pattern="\\d*(\\.\\d*)?" required />
            <input name="drainages_pH" type="text" placeholder="0.0" pattern="\\d*(\\.\\d*)?" required />
            <input name="mates_EC" type="text" placeholder="0.0" pattern="\\d*(\\.\\d*)?" required />
            <input name="mates_pH" type="text" placeholder="0.0" pattern="\\d*(\\.\\d*)?" required />
          </div>`)
    })
  document.getElementById("otherRaws").innerHTML = stringList.join("")
  const inp = document
    .getElementById("otherRaws")
    .getElementsByTagName("input")

  for (let i = 0; i < inp.length; i++) {
    inp.item(i).addEventListener("input", onInput)
    inp.item(i).addEventListener("change", onChange)
  }
}
const alph = "1234567890."
function onInput(event) {
  event.preventDefault()
  if (alph.indexOf(this.value[this.value.length - 1]) == -1) {
    this.value = this.value.substring(0, this.value.length - 1)
  }

  this.value = this.value.replace(",", ".")
  // console.log(this.value)
}

function onChange(event) {
  event.preventDefault()
  if (this.value.split(".").length - 1 == 0) {
    this.value = this.value + ".0"
  }
  if (this.value.indexOf(".") == this.value.length - 1) {
    this.value = this.value + "0"
  }
}

getValves()
