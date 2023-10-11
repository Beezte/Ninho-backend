const  express = require("express");
const router = express.Router();
const User = require("./User");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");


router.use(bodyParser.urlencoded({extended: true}))

router.get("/users", (req, res)=>{
    User.findAll({ raw : true}).then(users => {
        res.render("users/index", {
            users : users
        });
    });
});

router.get("/users/novo", (req, res)=>{
    res.render("users/novo");
});

router.post("/users/save", (req, res)=>{
    var email = req.body.email;
    var password = req.body.password;
    User.findOne({
        where : {
            email : email
        }}).then(user => {
        if(user === undefined){
            const hash = bcrypt.hashSync(password, 15);

            User.create({
                email : email,
                password : hash
            }).then(()=>{
                res.redirect("/");
            })
        }else {
            res.redirect("/");
        }
    });
    User.create({
        email : email,
        password : password
    }).then(()=>{
        res.redirect("/users");
    });
});

module.exports = router;