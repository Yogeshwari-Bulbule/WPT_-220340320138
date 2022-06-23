const express = require('express');
const app = express();
app.use(express.static("folder"));
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'node_db',
	port:3306
});
app.get('/book',(req,res)=>{
console.log(req.query.bookid);
let bookid = req.query.bookid;
connection.query("select * from bookwhere bookid=?",[bookid],(err,data)=>{
    if(err) {
        console.log(err);
        if (data[0]) == undefined){
            console.log("undefined found");
        } else{
            console.log(data[0].bookid);
            console.log(data[0].bookname);
            console.log(data[0].price);
            output.status = true;
            output.bookid = data [0].bookid;
            output.bookname = data [0].bookname;
            output.price = data [0].price;


        }
        res.send(outout);
        })
    

app.get("/insert",(req ,resp)=> {
    let bookid = req.query.bookid;
    let bookname = req.query.bookname;
    let price = req.query.price;
    let output = {status:false}
    connection.query("insert into book values(?,?,?)"[bookid,bookname,price],(err,rest1)=>
    {
        if (err) {
            result = err;
			console.log("book id is not found " + err);
        } else {
            result = res1;
			console.log("book id is found" + result)
            output.status =true;
        }
        resp.send(output);
    });

});
app.get("/update",(req ,resp)=> {
    console.log(req.requry.pric);
    let price = req.query.price;
    let bookid = req.query.bookid;
    let output = {status:false}
    if(price){
        console.log("price is present");

    
connection.query('update book set price = ? where bookid = ?', [price , bookid],
[err ,data]=>{
    if (err) {
        console.log(err);

    }
    else {
        if (data.afftedted.rows == 1) {
            output.status = true;

        }
    }
    res.send(output);
})
} else {
    console.log('price is not present in database');
    res.send(output);
}
})
app.get('/',req, res)=>{
    res,send('root');
})
        
        
   
app.listen(900,() =>{
    console.log("server is running");
});