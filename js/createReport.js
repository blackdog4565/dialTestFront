document
  .getElementById("createReport")
  .addEventListener("submit", createReport)
document.getElementById("saveReport").addEventListener("onclick", saveReport)

async function createReport(event) {
  event.preventDefault()

  const newForm = {
    idDep: document.getElementById("depart1").value,
    idVal: document.getElementById("valve1").value,
  }

  let a = await fetch("http://dialtestback.ru/createReport.php", {
    method: "POST",
    // mode:'no-cors',
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/x-form-urlencoded",
    },
    body: JSON.stringify(newForm),
  })

  try {
    let result = await a.json()

    if (result == "no") {
      document.getElementById("valuesClapReport").style.display = "none"

      throw new Error()
    } else {
      document.getElementById("valuesClapReport").style.height = "auto"
      document.getElementById("valuesClapReport").style.display = "flex"

      const stringList = []
      result.forEach((element) => {
        // console.log(element)
        stringList.push(`
            <div class="rawReport">
            <p>${element["id_valve"]}</p>
            <p>${element["name_department"]}</p>
            <p>${element["measure_date_time"]}</p>
            <p>${element["droppers_volume"]}</p>
            <p>${element["droppers_EC"]}</p>
            <p>${element["droppers_pH"]}</p>
            <p>${element["drainages_volume"]}</p>
            <p>${element["drainages_EC"]}</p>
            <p>${element["drainages_pH"]}</p>
            <p>${element["mates_EC"]}</p>
            <p>${element["mates_pH"]}</p>
            </div>`)
      })
      document.getElementById("otherRawsReport").innerHTML = stringList.join(
        ""
      )
      await makeLinkReport()
    }

  } catch (error) {
    document.getElementById("valuesClapReport").style.height = "0"
    document.getElementById("valuesClapReport").style.display = "none"

    const block = document.getElementById("errorReport")
    block.classList.toggle("successWrapOp")

    setTimeout(async function () {
      block.classList.toggle("successWrapOp")
    }, 3000)

    // console.log("err", error)
  }
}

var encodeCP1251 = function (string) {
  function encodeChar(c) {
    var isKyr = function (str) {
      return /[а-я]/i.test(str)
    }
    var cp1251 =
      "ЂЃ‚ѓ„…†‡€‰Љ‹ЊЌЋЏђ‘’“”•–—�™љ›њќћџ ЎўЈ¤Ґ¦§Ё©Є«¬*®Ї°±Ііґµ¶·\
ё№є»јЅѕїАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя"
    var p = isKyr(c) ? cp1251.indexOf(c) + 128 : c.charCodeAt(0)
    var h = p.toString(16)
    if (h == "a") {
      h = "0A"
    }
    return "%" + h
  }
  var res = ""
  for (var i = 0; i < string.length; i++) {
    res += encodeChar(string.charAt(i)) 
  }
  return res
}

async function makeLinkReport() {
  var text = document.getElementById("valuesClapReport").innerText
  let ar = text.split("\n\n")

  var csvText = ""

  for (let i = 0; i < 3; i++) {
    csvText = csvText + ar[i].trim() + ","
  }

  csvText = csvText + "\n"

  for (let i = 3; i < ar.length - 1; i++) {
    csvText = csvText + ar[i].trim() + ","

    if ((i - 2) % 11 == 0) {
      csvText = csvText + "\n"
    }
  }
  csvText = csvText.replace(/[\n\n]/g, "\n")

  // let type = 'data:application/octet-stream, ' + window.btoa(unescape(encodeURIComponent(text)))
  // let type = 'data:application/csvcharset=CP1251, ' + encodeCP1251(text)
  let type = "data:application/csv;charset=CP1251, " + encodeCP1251(csvText)

  document.getElementById("saveReport").download = document.getElementById("cur_date").innerHTML + "-" + document.getElementById("cur_time").innerHTML + " Report.csv"
  document.getElementById("saveReport").href = type
}

async function saveReport(event) {
  event.preventDefault()
}