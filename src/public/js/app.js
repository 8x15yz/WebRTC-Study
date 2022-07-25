// 프론트엔드

const socket = io();

// socket.io 에는 이미 room을 만드는 기능이 있다.. 
// 여기서 말하는 room : 채팅방에 접속 + 채팅방 생성 + leave 채팅방 + 채팅생성

const welcome = document.getElementById("welcome")
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomName;

function addMessage(message){
    const ul = room.querySelector("ul")
    const li = document.createElement("li")
    li.innerText = message
    ul.appendChild(li);
}

function showRoom() {
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector("h3");
    h3.innerText = `Room: ${roomName}`
}

function backendDone(msg) {
    console.log(`The backend Says:`, msg)
}

function handleRoomSubmit(event) {
    event.preventDefault();
    const input = form.querySelector("input");
    // socket.emit이라는게 api를 만드는거인듯 ?? 의미를 좀 더 찾아보자 : 근데 기능이 짱 좋다
    // 1. enter_room 이라는 커스텀 이벤트도 socket.io에서는 이용할 수 있다...
    socket.emit("enter_room", { payload: input.value }, showRoom);
    // 2. 파싱도 저절로 됨 => front-end에서 object를 바로 전송할 수 있다는 점 ..
    // 3. callback도 됨 => 서버로부터 실행되는 function
    roomName = input.value;
    input.value = "";

};

form.addEventListener("submit", handleRoomSubmit);


// socket.emit("커스텀 이벤트", 그 이후에는 전부 페이로드인데 많이 실을 수 있어)
// 그리고 emit이라는게 클라 => 서버로 페이로드를 객체로 보내는 작업인것같아
// WebSocket에서의 send가 socket.io에서는 emit인거야


// 추가적으로 socket.io의 emit에는 마지막 argument에 특이사항이 있어
//  => 끝날때 실행되는 function을 넣고 싶으면 마지막에 넣는건데
// 이거는 백엔드에서 프론트엔드 코드를 실행시킨거임


socket.on("welcome", () => {
    addMessage("Someone joined!")
})

