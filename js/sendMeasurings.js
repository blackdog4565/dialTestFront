document
  .getElementById("measuringForm")
  .addEventListener("submit", sendMeasuring)

function sendMeasuring(event) {
  event.preventDefault()

  const newForm = {}

  const formElements = document.getElementById("otherRaws")
  const valves = formElements.innerText.split("\n\n")

  valves.forEach((element) => {
    const inputAr = Array.prototype.slice
      .call(formElements.getElementsByTagName("input"), 0)
      .slice(8 * (element - 1), 8 + 8 * (element - 1))

    for (const iterator in inputAr) {
      inputAr[iterator] = inputAr[iterator].value
    }

    newForm[`${element}`] = inputAr
  })
  newForm["depart"] = document.getElementById("depart").value
  newForm["user"] = document.getElementById("userID").value

  // console.log(newForm)

  fetch("http://dialtestback.ru/sendMeasurings.php", {
    method: "POST",
    // mode:'no-cors',
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/x-form-urlencoded",
    },
    body: JSON.stringify(newForm),
  })
    .then((response) => console.log(response.text()))
    .then((response) => {
      if (response != "ok") {
        const block = document.getElementById("success")
        block.classList.toggle("successWrapOp")

        setTimeout(async function () {
          block.classList.toggle("successWrapOp")
        }, 3000)

        const inp = document
          .getElementById("otherRaws")
          .getElementsByTagName("input")

        for (let i = 0; i < inp.length; i++) {
          inp.item(i).value = ""
        }
      } else {
        const block = document.getElementById("unSuccess")
        block.classList.toggle("successWrapOp")

        setTimeout(async function () {
          block.classList.toggle("successWrapOp")
        }, 3000)
      }
    })
}
