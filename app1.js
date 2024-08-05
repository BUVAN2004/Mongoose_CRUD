const express = require('express');
const app1 = express();
const bodyparser = require('body-parser');
const exhbs = require('express-handlebars');
const dbo = require('./db1');
const employeemodel = require('./Models/employeeModel');
// const ObjectID = dbo.ObjectID;

dbo.getdatabase();

app1.engine('hbs',exhbs.engine({
    layoutsDir:'views1/', 
    defaultLayout:"main1", 
    extname:'hbs',
    // Especially, below code is used for Handlebar engine
    runtimeOptions: {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault : true
    }
}))
app1.set('view engine','hbs');
app1.set('views' ,'views1');
app1.use(bodyparser.urlencoded({extended: true}));


app1.get('/',async(req,res)=>{
    
    // let database = await dbo.getdatabase();
    // const collection = database.collection('employees');
    // const cursor = collection.find({});
    // let data = await cursor.toArray();
    let data = await employeemodel.find({});

    let message ='';

    let edit_id, edit_employee;
    if(req.query.edit_id){
        edit_id = req.query.edit_id;
        // edit_employee = await colle(ction.findOne({_id: new ObjectID(edit_id)});
        edit_employee = await employeemodel.findOne({_id: edit_id});     
    }

    if(req.query.delete_id){
        // await collection.deleteOne({id : ObjectID(delete_id)});
        await employeemodel.deleteOne({_id: req.query.delete_id})
        return res.redirect('/?status=3');
    }

    switch(req.query.status){
        case '1':
            message = "Create(Insertion) Operation Done successfully";
            break;
        case '2':
            message = "Updation(Edit) operation done successfully";
            break;
        case '3':
            message = "Delete operation done successfully";
            break;
        default:
            message="No operation performed";
    }


    res.render('main1',{message, data, edit_id, edit_employee});
})

app1.post('/save_employee', async (req,res)=>{
    // let database = await dbo.getdatabase();
    // const collection = database.collection('employees');
    // let data = { name: req.body.name, age: req.body.age, designation: req.body.designation};
    // await collection.insertOne(data);
    const data = new employeemodel( {name: req.body.name, age: req.body.age, designation: req.body.designation});
    data.save();
    return res.redirect('/?status=1')
})

app1.post('/update_employee/:edit_id', async (req,res)=>{
    // let database = await dbo.getdatabase();
    // const collection = database.collection('employees');
    // let data = { name: req.body.name, age: req.body.age, designation: req.body.designation};
    let edit_id = req.params.edit_id;
    // await collection.updateOne({_id: new ObjectID(edit_id)},{ $set: data});

    await employeemodel.findOneAndUpdate({_id: edit_id},{ name: req.body.name, age: req.body.age, designation: req.body.designation})
    return res.redirect('/?status=2')
})

app1.listen(7000,()=>{console.log('Listening to 7000 port');})
