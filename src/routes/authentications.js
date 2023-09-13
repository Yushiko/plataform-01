const express = require('express');
const router = express.Router();

const passport = require('passport');
const {LoggedIn} = require('../lib/session');

module.exports = router;

//login
router.get('/', (req,res) =>{
    res.render('../views/user/login.hbs');
}); 

router.post('/', passport.authenticate('local.signin', {
    //successRedirect: '/usuario/mis_cursos',
    failureRedirect: '/',
    failureFlash: true
}), (req, res ) => {
if(req.user.typeacc == '3')
{
res.redirect('/usuario/mis_cursos');
}

if(req.user.typeacc == '2')
{
res.redirect('/Profesor/mis_cursos');
}

if(req.user.typeacc == '1')
{
res.redirect('/administrador/menu');
}

}
);

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});