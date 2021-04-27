require('dotenv').config();
const express = require('express');
const nunjucks = require('nunjucks');
const mysql = require('mysql');
const port = process.env.SERVER_PORT;

const app = express();
app.use(express.urlencoded());
app.set('view engine', 'html');

nunjucks.configure('views' , {
    express:app,
    autoescape:true,
});

let connection = mysql.createConnection({ // mysql을 연결하여 database를 객체로 담는다
    host:'localhost',
    user:'root',
    password:'1234',
    database:'node1',
});

connection.connect();
app.get('/', (req, res)=>{
                                            // results는 배열 내에 객체가 있는 형태
    connection.query("select * from user", (error, results)=>{
        if(error){
            console.log('error');
        } else {
            console.log(results);
            results.forEach(ele=>{
                console.log(ele.username,ele.userid,ele.userpw,ele.gender);
            })
        }
    })
    
    res.render('index.html' ,{
        title:'na',
    })
});


app.get('/join', (req, res)=>{
                                        
    res.render('join.html' ,{
      
    })

});

app.get('/login', (req, res)=>{
                                        
    res.render('login.html' ,{
        
    })
});

app.post('/main', (req, res)=>{
                                        
    res.render('main.html' ,{
        id:req.body.userid,
    })
});



app.post('/join', (req, res)=>{
    console.log(req.body)
    let params = [req.body.userid, req.body.userpw, req.body.username, req.body.gender];
    const id = req.body.userid;
    const name = req.body.username;
    const password = req.body.userpw;
    connection.query("insert into user values(?,?,?,?)", params , (error, results)=>{
        if(error){
            console.log('error');
        } else {
           
            res.render('login.html', {
                id:req.body.userid,
                name: req.body.userbody,
                password : req.body.userpw,
            })
        }
    })
})

app.post('/login', (req, res)=>{
    console.log(req.body.userid,req.body.userpw);
})

app.listen(port, ()=>{
    console.log(`server start port:${port}`);
});


/* 과제 *

1.auto increment - 자동으로 1씩 증가하는 제약조건
2.limit 기능 - limit 뒤의 수가 1개일 때는 1번 부터 숫자 만큼, 2개일 때는 a번 부터 ~ b 번째 까지 조회
3.type조사 - int(n): 숫자(n byte) , varchar(n):가변 문자열(n byte), text:긴 문자열, enum:해당 집합 내의 데이터만 받는 데이터 타입,
4.not null - null이 없어야하는 제약조건
5.%기능 - % % 사이의 문자에 해당하는 데이터 조회
6.primary key - 기본 키 제약조건으로 not null과 unique key 제약 조건을 포함, 테이블 내에서 유일한 식별자로 사용, 다른 테이블에서 foreign key로 사용하여 참조 가능

*/