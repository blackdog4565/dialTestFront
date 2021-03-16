document.getElementById("measuringForm").style.display = "none"
document.getElementById("createReport").style.display = "none"

document.getElementById("authForm").addEventListener("submit", authFormHandler)
document.getElementById("buttonExit").addEventListener("click", exit)
document.getElementById("buttonExit1").addEventListener("click", exit)


function exit(event) {
  event.preventDefault()
  
  document.getElementById("user").value = ''
  document.getElementById("pass").value = ''
  
  document.getElementById("measuringForm").style.display = "none"
  document.getElementById("createReport").style.display = "none"
  document.getElementById("valuesClapReport").style.display = "none"
  
  document.getElementById("authForm").style.display = "flex"
}


async function authFormHandler(event) {
  event.preventDefault()

  const login = document.getElementById("user").value
  const pass = document.getElementById("pass").value

  const userInfo = {
    login,
    pass,
  }

  let a = await fetch("http://dialtestback.ru/auth.php", {
    method: "POST",
    // mode: 'no-cors',
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/x-form-urlencoded",
    },
    body: JSON.stringify(userInfo),
  })
  try {
    const result = await a.json()
    // console.log(result)

    if (result != "no") {
      event.target.style.display = "none"

      // console.log("yes")
      document.getElementById("measuringForm").style.display = "flex"
      const inputUserId = `<input id="userID" value="${result["id_worker"]}" readonly style="display:none" />`
      // console.log(inputUserId)
      document.getElementById(
        "userName"
      ).innerHTML = `${inputUserId} ${result["surname_worker"]} ${result["name_worker"][0]}. ${result["patronymic_worker"][0]}.`
      document.getElementById("userID").value = result["id_worker"]
    } else {
      const block = document.getElementById("unSuccessAuth")
      block.classList.toggle("successWrapOp")

      setTimeout(async function () {
        block.classList.toggle("successWrapOp")
      }, 3000)
    }
  } catch {
    const block = document.getElementById("unSuccessAuth")
    block.classList.toggle("successWrapOp")

    setTimeout(async function () {
      block.classList.toggle("successWrapOp")
    }, 2500)
  }
}
