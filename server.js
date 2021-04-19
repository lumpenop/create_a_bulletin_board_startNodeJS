const express = require('express'); // express 객체 생성
const app = express(); // express 객체를 app에 담는다
const port = 3000; // 포트 번호


// 요청을 이벤트로 받아서 처리함
// app.get()은 url의 변동에 대한 이벤트
// app.get()의 매개변수
// 1. 경로 '/' => localhost:3000
// 2. 콜백함수(요청, 응답) => {}
//      요청:url, 응답:응답.send('응답');

app.get('/', (요청, 응답)=>{
     응답.send('helloworld');
})

app.get('/hello', (요청, 응답)=>{
    응답.send('helloworld');
})

app.listen(port, ()=>{
    console.log(`server is listening at localhost ${port}`);
})

// app 객체에서 listen()메서드 호출
// listen()에는 2가지 매개변수 : 1. port 번호, 2. 실행 시 rollback 함수

// 서버 수정 후에는 종료 후 재실행 해야 적용됨

// npm init 후 끝까지 엔터
// npm install express 
// node server.js 로 서버 실행
// localhost:3000 서버 접속
// ctrl + c 로 접속 종료