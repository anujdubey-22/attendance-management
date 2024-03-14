const express = require('express');
const sequelize = require('./database');

const bodyParser = require("body-parser");

const cors = require('cors');
const attendence = require('./models/attendence');

const app = express();
app.use(cors());

app.use(bodyParser.json({extended: false}));


app.get('/distinct-attendance', async(req,res,next) => {
    try{
        //const date = req.query.date;
        const data = await attendence.findAll({
            attributes: [
                [sequelize.fn('DISTINCT', sequelize.col('date')), 'date']
              ],
              group: ['date']
          })
        console.log(data,'data in getting distinct values in app.js');
        res.status(201).json(data);
    }
    catch(error){
        console.log(error,'error in getting disticnt attendace in app.js');
    }
})

app.get('/get-attendance',async(req,res,next) => {
    try{
        const date = req.query.date;
        console.log(date,'in get reqeust')
        const data = await attendence.findAll({where: {date:date}});
        res.status(201).json(data)
    }
    catch(error){
        console.log(error,'error in getting attendence in app.js');
        res.json('no');
    }
})


app.post('/add-attendance', async(req,res,next) => {
    try{
        let data;
        console.log(req.body.obj);
        const obj = req.body.obj;
        for(let item of obj){
            data = await attendence.create({date:item.date,name:item.name,status:item.attendance});
        }
        console.log(data,'data in creating attendence in app.js');
        res.status(201).json({data:data.dataValues});
    }
    catch(error){
        console.log(error,'error in post in app.js');
    }
})

async function sync(){
    try{
        const data = await sequelize.sync();
        //console.log(data);
        app.listen(3000,() => {
            console.log('Backend-Server started on port 3000')
        })
    }
    catch(error){
        console.log(error,'error in sync database in app.js')
    }
 
}

sync()