const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");

// app.js (프론트엔드) : socket.addEventListener("메서드", 함수) 로 사용

const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
    console.log("Connected to Server ✅");
});

socket.addEventListener("message", (message) => {
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li)
});

socket.addEventListener("close", () => {
    console.log("Disconnected from Server ❌");
});


function handleSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(input.value);
    input.value = ""
}

messageForm.addEventListener("submit", handleSubmit);