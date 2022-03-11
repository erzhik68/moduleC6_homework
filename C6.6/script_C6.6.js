const wsUrl = "wss://echo-ws-service.herokuapp.com";
const inputText = document.querySelector(".input");
const correspondence = document.querySelector(".row2");
const btn = document.querySelector(".btn");

let websocket = null;

function writeToScreen(message) {
  correspondence.insertAdjacentHTML("beforeend", `<div class="client"><span class="time_who_message">${new Date().toLocaleTimeString()} User's message:</span><span class="message">${message}</span></div>`);
}

function start() {
	websocket = new WebSocket(wsUrl);
	websocket.onopen = function(evt) {
	console.log("CONNECTED", new Date().toLocaleTimeString());
	//correspondence.innerHTML = "Chat is online";	
	};
	websocket.onclose = function(evt) {
	console.log("DISCONNECTED");
	};
	websocket.onmessage = function(evt) {
	console.log("Responce from server");
	correspondence.insertAdjacentHTML("beforeend", `<div class="server"><div class="inserver"><span class="time_who_message">${new Date().toLocaleTimeString()} FROM SERVER:</span><span class="message">${evt.data}</span></div></div>`);
	inputText.value = "";
	};
	websocket.onerror = function(evt) {
	console.log("ERROR");
	};
}
// socket.readyState со значениями: 0 - «CONNECTING»: соединение ещё не установлено, 1 - «OPEN»: обмен данными,
// 2 - «CLOSING»: соединение закрывается, 3 - «CLOSED»: соединение закрыто.
btn.addEventListener('click', () => {
  if (!websocket || websocket.readyState == 2 || websocket.readyState == 3) { 
	start();
	if (websocket.readyState == 0) {
		setTimeout (function() {
			writeToScreen(inputText.value);
			setTimeout(function() {
				websocket.send(inputText.value);
			}, 2000);
		}, 5000);
	} else {
		writeToScreen(inputText.value);
		//setTimeout(function() {
		//	websocket.send(inputText.value);
		//}, 0);
		websocket.send(inputText.value);
	}
  } else {
	writeToScreen(inputText.value);
	//setTimeout(function() {
	//	websocket.send(inputText.value);
	//}, 0);
	websocket.send(inputText.value);
  }
});

// работа с геолокацией
//const status = document.querySelector('#status');
let mapLink = null;
const btn_geo = document.querySelector(".geo");

// Функция, выводящая текст об ошибке
const error = () => {
  status.textContent = 'Невозможно получить ваше местоположение';
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
  console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;

  //status.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;
  console.log(`Широта: ${latitude} °, Долгота: ${longitude} °`);
  mapLink.href = `https://www.openstreetmap.org/#map=14/${latitude}/${longitude}`;
  mapLink.textContent = 'Гео-локация';
}

btn_geo.addEventListener('click', () => {
  correspondence.insertAdjacentHTML("beforeend", `<div class="client"><a id="map-link" target="_blank"></a></div>`);
  mapLink = document.querySelector('#map-link');
  mapLink.href = '';
  mapLink.textContent = '';
  
  if (!navigator.geolocation) {
    correspondence.insertAdjacentHTML("beforeend", `<div class="client">Geolocation не поддерживается вашим браузером</div>`);
  } else {
    console.log("Test");
	navigator.geolocation.getCurrentPosition(success, error);
  }
});
