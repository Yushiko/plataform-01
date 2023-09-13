const passport = require('passport');
const strategy = require('passport-local').Strategy;

const conex = require('../database');
const datas = require('../lib/datas');

const {format,render, cancel, register} = require('timeago.js');


//Actualizar usuario
passport.use('local.update', new strategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const {fullname} = req.body;
    const update = {
        username,
        passport,
        fullname
    };
    update.password = await datas.encryptPassword(password);
    const result = await conex.query('update..');
    return done(null, update);
}));



//Logeo
passport.use('local.signin', new strategy({

    usernameField: 'userID',
    passwordField: 'password',

    passReqToCallback: true
}, async (req, userID, password, done) => {
    //console.log(req.body);
    //console.log(userID);
    //console.log(password);

    const row = await conex.query('select * from user where usercve = ?',[userID]);

    //const row = await conex.query("select *from user inner join infouser on user.usercve = infouser.usercve where user.usercve = ?",[userID]);
    if(row.length > 0)
    {
        const user = row[0];
        const validPassword = await datas.comparePassword(password, user.password);

        console.log(user);

        if(validPassword)
        {
            //console.log(user.password);
            //var Time = CURRENT_TIMESTAMP;
            //console.log(Time);
            await conex.query('update user set lastconec = CURRENT_TIMESTAMP where usercve = ?', [userID]);
            done(null, user)
        }
        else
        {
            //console.log(user.password);
            done(null,false, req.flash('alert','Contraseña incorrecta'))
        }


    }
    else
    {
        done(null,false, req.flash('alert','Usuario incorrecto'))
    }

}));

//guardo el id del usuario
passport.serializeUser((user, done) => {
    done(null, user.id);
})

//uso el id que guarde para comprobar si existe
passport.deserializeUser( async (id, done) => {
    const row = await conex.query("select *from user inner join infouser on user.usercve = infouser.usercve where user.id = ?",[id]);
    //const row = await conex.query('select * from usuarios where userID = ?', [id]);
    done(null, row[0]);

})


