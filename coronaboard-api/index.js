const express = require('express');
const bodyParser = require('body-parser');
//const app = express();  //익스프레스 인스턴스 생성
const { sequelize } = require('./database');

const globalStatController = require('./controller/global-stat.controller');  //추가된부분1
const keyValueController = require('./controller/key-value.controller');

async function launchServer() {
    const app = express();
    
    app.use(bodyParser.json());

    app.get('/',(req, res) => {
        res.json({ message: 'Hello CoronaBoard!' });
    });

    app.get('/global-stats', globalStatController.getAll);
    app.post('/global-stats', globalStatController.insertOrUpdate);
    app.delete('/global-stats', globalStatController.remove);

    app.get('/key-value/:key', keyValueController.get);
    app.post('/key-value', keyValueController.insertOrUpdate);
    app.delete('/key-value/:key', keyValueController.remove);
    
    try {
        await sequelize.sync();  //2
        console.log('Database is ready!');
    }   catch (error) {
        console.log('Unable to connect to the database:');
        console.log(error);
        process.exit(1);
    }



    const port = process.env.PORT || 8080;  // 포트 기본값을 8080로 지정-관습적 포트 80
    app.listen(port, () => {
        console.log(`Server is running on port ${port}.`);
    });
}     //1
launchServer();
/*
app.use(bodyParser.json());

app.get('/',(req,res) => {
    res.json({ message: 'Hello Coronaboard!'});
});

const port = process.env.PORT || 8080;  //포트 기본값을 8080으로 지정
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
*/

/*
const globalStatController = require('./controller/global-stat.controller');  //추가된부분1
const keyValueController = require('./controller/key-value.controller');

//Content-Type이 application/json인 HTTP 요청의 바디를 파싱할 수 있도록 설정
//    app.use(bodyParser.json());
async function launchServer() {
    const app = express();
    app.use(bodyParser.json());

    app.get('/',(req, res) => {
        res.json({ message: 'Hello CoronaBoard!' });
    });

    app.get('/global-stats', globalStatController.getAll);
    app.post('/global-stats', globalStatController.insertOrUpdate);
    app.delete('/global-stats', globalStatController.remove);

    app.get('/key-value/:key', keyValueController.get);
    app.post('/key-value', keyValueController.insertOrUpdate);
    app.delete('/key-value/:key', keyValueController.remove);

    try {
        await sequelize.sync();  //2
        console.log('Database is ready!');
    }   catch (error) {
        console.log('Unable to connect to the database:');
        console.log(error);
        process.exit(1);
    }



    const port = process.env.PORT || 8080;  // 포트 기본값을 8080로 지정-관습적 포트 80
    app.listen(port, () => {
        console.log(`Server is running on port ${port}.`);
    });
}     //1
launchServer();
*/