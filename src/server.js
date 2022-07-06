// server.js (백엔드) : socket.on("메서드", 함수) 로 사용

import express from "express";

import http from "http";
// import WebSocket from "ws";
import SocketIO from "socket.io"

const app = express(); 

app.set("view engine", "pug");
app.set("views", __dirname + "/views" );
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));  // home.pug 를 렌더하는 중
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);
// app.listen(3000, handleListen);

const httpServer = http.createServer(app);
// const wss = new WebSocket.Server({ server });
const wsServer = SocketIO(httpServer);





/* Websocket 사용한 Web RTC 로직

function onSocketClose() {
    console.log("Disconnected from the Browser ❌");
}

const sockets = [];

wss.on("connection", (socket) => { // 연결했을 때 사용하는 함수 => 지금 연결을 기다리는 중인거임
    sockets.push(socket);
    socket["nickname"] = "Anonymous";

    console.log("Connected to Browser ✅");
    socket.on("close", () => onSocketClose);
    socket.on("message", (msg) => {
        const message = JSON.parse(msg); // JSON을 파싱해줘야될 필요가 있다 (객체로 들어가야되기 때문)
        switch (message.type) {
            case "new_message":
                sockets.forEach((aSocket) => aSocket.send(`${socket.nickname}: ${message.payload}`));
                break
            case "nickname":
                socket["nickname"] = message.payload;
        }

    });
    // https://velog.io/@plate0113/JS-Buffer-68-65-6c-6c-6f-20-66-72-6f-6d-20-74-68-65-20-62-72-6f-77-73-65-72-73-%ED%98%84%EC%83%81-%ED%95%B4%EA%B2%B0-%EB%B0%A9%EB%B2%95
    // message.toString('utf8') 문자열 깨져서 나타나는 현상 해결
}); 

*/


httpServer.listen(3000, handleListen);