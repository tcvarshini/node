var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/studentdb')
var Student=require('./New folder/student.js');

var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static('public'));
app.get('/index', function (req, res) {
res.sendFile( __dirname + "/" + "regpg.html");
})
app.post('/sample', urlencodedParser, function (req, res) {

response = req.body;
console.log(response);
    
    
 Student.addStudent(req.body,function(err,student){
    if(Student){
        response={
            "result":"data inserted succesfully"
        }
        res.json(response);
    }
    else{
        console.log(error);
    }
     
});
    
    });

app.get('/api/retrievedByField',function(req,res){
        var name="asdf";
       Student.getStudentByField(name,function(err,studentData){
            if(err){
                console.log(err);
            }
            res.json(studentData);
        });
    

});
app.get('/api/removeByField',function(req,res){
        var name="sass";
       Student.remStudentByField(name,function(err,studentData){
            if(err){
                console.log(err);
            }
            res.json(studentData);
        });
    

});
app.get('/update',function(req,res){
    var conditions={"name":"hsg"};
    var update={"name":"varsh"};
    var options={multi:true};
    Student.update(conditions,update,options,function(err,numAffected){
        if(err){
            console.log(err);
        }
        else{
            res.json(numAffected);
        }
    })
})

var server = app.listen(8081, function () {
var host = server.address().address
var port = server.address().port
console.log("Example app listening at http://%s:%s", host, port)
});












