const  express = require("express");
const router = express.Router();
const Produto = require("./Produto");
const bodyParser = require("body-parser");
//const bodyParser = require("body-parser");

//router.use(bodyParser.urlencoded({extended: true}))
//router.use(bodyParser.json())

router.use(bodyParser.urlencoded({extended: true}))

router.get("/produtos", (req, res)=>{
    Produto.findAll({ raw : true}).then(produtos=> {
        res.render("produtos/index", {
            produtos : produtos
        });
    });
});

router.get("/produto/novo", (req, res)=>{
    res.render("produtos/novo");
});

router.post("/salvarProduto", (req, res)=>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Produto.create({
        titulo : titulo,
        descricao : descricao
    }).then(()=>{
        res.redirect("produtos");
    });
});

router.post("/produto/delete", (req, res)=>{
    var id = req.body.id;
    if(id !== undefined){
        if(!isNaN(id)){
            Produto.destroy({
                where : {
                    id : id
                }
            }).then(()=>{
                res.redirect("/produtos");
            })
        }else{
            res.redirect("/produtos");
        }
    } else {
        res.redirect("/produtos");
    }
})

router.get("/produto/edit/:id", (req, res)=>{
    var id = req.params.id;
    if(isNaN(id)){
        res.redirect("/produtos");
    }
    Produto.findByPk(id).then(produto=>{
        if(produto !== undefined){
            res.render("produtos/edit", {produto : produto});
        }else{
            res.redirect("/produtos");
        }
    }).catch(erro=>{
        res.redirect("/produtos");
    })
})
router.post("/produto/edit", (req, res)=>{
    var id = req.body.id;
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Produto.update({titulo : titulo, descricao : descricao}, {
        where : {
            id : id
        }
    }).then(()=>{
        res.redirect("/produtos");
    }).catch(erro=>{
        res.redirect("/");
    });
});

module.exports = router;