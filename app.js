const express = require('express');
const sequelize = require('./database');

const bodyParser = require("body-parser");

const cors = require('cors');
const attendence = require('./models/attendence');

const app = express();
app.use(cors());

app.use(bodyParser.json({extended: false}));

app.get('/get-attendence',async(req,res,next) => {
    try{
        const date = req.query;
        console.log(date,'in get reqeust')
        const data = await attendence.findAll({where: {date:date}});
        console.log(data);
    }
    catch(error){
        console.log(error,'error in getting attendence in app.js');
        res.json('no');
    }
})


app.post('/mark-attendence', async(req,res,next) => {
    try{
        console.log(req.body);
        
        const data = await attendence.create({});
        console.log(data,'data in creating attendence in app.js');
        res.status(201).json({data:data.dataValues});
    }
    catch(error){
        console.log(error,'error in post in app.js');
    }
    
})

async function sync(){
    try{
        const data = await sequelize.sync({force:true});
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