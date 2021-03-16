include("/js/getDepVal.js")
include("/js/auth.js")
include("/js/sendMeasurings.js")
include("/js/openReport.js")
include("/js/createReport.js")

function include(url) {
  var script = document.createElement("script")
  script.src = url
  document.getElementsByTagName("script")[0].appendChild(script)
}

setInterval(async function () {
  date = new Date()
  hours = date.getHours()
  minutes = date.getMinutes()
  seconds = date.getSeconds()

  hours = hours < 10 ? "0" + hours : hours
  minutes = minutes < 10 ? "0" + minutes : minutes
  seconds = seconds < 10 ? "0" + seconds : seconds

  day = String(date.getDate()).padStart(2, "0")
  month = String(date.getMonth() + 1).padStart(2, "0")
  year = date.getFullYear()

  document.getElementById("cur_time").innerHTML =
    hours + ":" + minutes + ":" + seconds
  document.getElementById("cur_date").innerHTML =
    day + "." + month + "." + year
}, 1000)
