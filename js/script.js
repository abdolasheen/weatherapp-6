let inputVal = document.querySelector("#mainInput");
let api_url = `http://api.weatherapi.com/v1/forecast.json?key=02bb4987e50d4fce80b151736230502&q=cairo&days=7`;
let date = new Date();

function dayDate() {
  var a = new Date();
  var weekdays = new Array(7);
  weekdays[0] = "Sunday";
  weekdays[1] = "Monday";
  weekdays[2] = "Tuesday";
  weekdays[3] = "Wednesday";
  weekdays[4] = "Thursday";
  weekdays[5] = "Friday";
  weekdays[6] = "Saturday";
  let i = a.getDay();
  let x = a.getDay();
  if (i == 6) {
    i = 0;
    x = 0;
  } else if (i == 5) {
    x = -2;
  }
  return {
    today: weekdays[a.getDay()],
    sec: weekdays[i + 1],
    third: weekdays[x + 2],
  };
}
function monthDate() {
  var a = new Date();
  var month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";
  var r = month[a.getMonth()];
  return r;
}
async function getapi(url) {
  // Storing response
  const response = await fetch(url);

  if (response.status >= 200 && response.status <= 299) {
    var data = await response.json();
    console.log(data);
    show(data);
  } else {
    // Handle errors
    console.log(response.status, response.statusText);
  }
}
// Calling that async function
getapi(api_url);
function updateUrl() {
  api_url = `http://api.weatherapi.com/v1/forecast.json?key=7907aedd855a4a8f8bb51404221310&q=${inputVal.value}&days=3`;
  getapi(api_url);
}
inputVal.addEventListener("keyup", updateUrl);
document.querySelector(".findBtn").addEventListener("click", updateUrl);
// Defining async function
function show(data) {
  let firsthtml = ` <div class="data-table text-muted rounded-top overflow-hidden">
  <div class="upper px-3 py-3">
    <span>${dayDate().today}</span>
    <span>${date.getDate()} ${monthDate()}</span>
  </div>
  <div class="lower p-3 overflow-hidden">
    <p class="city">${data.location.name}</p>
    <div class = "d-flex justify-content-between">
    <p class="todayTemp">${data.current.temp_c} <sup>o</sup>C</p>

    
    <div class="image-wrapper"><img src="${data.current.condition.icon}" style = "width:70px"alt="" /></div>
    </div>
    <span class="status-txt">${data.current.condition.text}</span>
    <div class="lower-status d-flex  mt-4">
      <span class="me-4">
        <img src="/img/icon-umberella.png" alt="" />
        <span>${data.current.feelslike_c}%</span>
      </span>
      <span class="me-4">
        <img src="/img/icon-wind.png" alt="" />
        <span>${data.current.gust_mph} </span>
      </span>
      <span>
        <img src="/img/icon-compass.png" alt="" />
        <span>${data.current.wind_dir} </span>
      </span>
    </div>
  </div>
</div>`;
  let secHtml = `<div class="data-table text-muted text-center">
  <div class="upper px-3 py-3 middle">
    <span>${dayDate().sec}</span>
  </div>
  <div class="lower p-3 middle">
    <i class="status-icon">
      <img src="${data.forecast.forecastday[1].day.condition.icon}" alt="" />
    </i>
    <p class="midTemp-heigh fs-3 text-white">${
      data.forecast.forecastday[1].day.maxtemp_c
    }<sup>o</sup>C</p>
    <p class="midTemp-low">${
      data.forecast.forecastday[1].day.mintemp_c
    }<sup>o</sup>C</p>
    <span class="midTemp-status text-primary">${
      data.forecast.forecastday[1].day.condition.text
    }</span>
  </div>
</div>`;
  let thirdHtml = `<div class="data-table text-muted text-center lastOne">
<div class="upper px-3 py-3 middle">
  <span>${dayDate().third}</span>
</div>
<div class="lower p-3  lastOne" >
<i class="status-icon">
<img src="${data.forecast.forecastday[2].day.condition.icon}" alt="" />
</i>
<p class="midTemp-heigh fs-3 text-white">${
    data.forecast.forecastday[2].day.maxtemp_c
  }<sup>o</sup>C</p>
<p class="midTemp-low">${
    data.forecast.forecastday[2].day.mintemp_c
  }<sup>o</sup>C</p>
<span class="midTemp-status text-primary">${
    data.forecast.forecastday[2].day.condition.text
  }</span>
</div>
</div>`;
  // Setting innerHTML as tab variable
  document.querySelector(".firstCol").innerHTML = firsthtml;
  document.querySelector(".secCol").innerHTML = secHtml;
  document.querySelector(".thirdCol").innerHTML = thirdHtml;
  // let firstColumn = document.querySelector(".firstCol");
}

