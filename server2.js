const express = require('express');
const nunjucks = require('nunjucks');
// const bodyParser = require('body-parser');

const app = express();
app.use(express.urlencoded());
// app.use(bodyParser.urlencoded({extended:false}))

// sendFile 도 가능하지만 sendFile은 단순히 html 파일만 응답하게됨
// view engine을 사용해야함 -> 따로 설치해야함, 템플릿을 제공하는..?
// view engine 중 nunjucks 를 사용할 것임 html과 유사하기 때문

nunjucks.configure('views',{ 
    express:app,
    autoescape:true, // 보안 문제로 무적권 true
});

app.set('view engine', 'html'); 

app.get('/', (요청, 응답)=>{


    응답.render('index.html',{
        title:'server',
        name:요청.query.name,
        id:요청.query.id,
        pw:요청.query.pw
    });
})
// 요청은 url에서 /?뒤에 &로 구분되어있는 값
app.post('/', (요청, 응답)=>{
    console.log(요청.body);
    응답.send('is this post?');
})



app.listen(3000,()=>{
    console.log(`server start port : 3000`);
})