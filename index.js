const express = require("express");
var app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

const Produto = require("./produtos/Produto");
const produtoController = require("./produtos/produtoController");

app.use("/", produtoController);

connection
    .authenticate()
    .then(()=>{
        console.log("conexao feita com o db");
    })
    .catch((msgErro)=>{
        console.log(msgErro);
    })


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//EJS como view engine
app.set('view engine', 'ejs');


//definindo a pasta de arquivos estaticos
app.use(express.static('public'));

app.listen(8000, ()=>{
    console.log("app rodando");
});

app.get("/", (req, res)=>{
    res.render("index");
});
app.get("produtos/index", (req, res)=>{
    res.render("./produto/index");
});

