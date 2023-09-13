const express = require('express');
const router = express.Router();

const conex = require('../database');

const {LoggedIn} = require('../lib/session');

//carga los cursos activos para los usuarios
router.get('/mis_cursos',LoggedIn,async (req,res) => {
    const mycourses = await conex.query("select course.courname,course.id,course.description,course.image,course.directory,infouser.fullname from course inner join groups on groups.courid = course.id inner join list on list.groid = groups.id inner join infouser on infouser.id = groups.teacherid where course.status = 'activo' and list.usercve = ?",[req.user.usercve]);
    //const mycourses = await conex.query("select *from course where status = 'activo'");
    //console.log(mycourses);
    res.render('../views/user/mycourses.hbs', {mycourses});
});

//carga las unidades que contienen los cursos
router.get('/mis_cursos/:id',LoggedIn,async (req,res) => {
    const {id} = req.params;
    //const idTitle = id;
    //console.log(idTitle);
    //const queryCourseID = await conex.query("select id from cursos where title = ?",[id]);
    //var QuerryCourse = (JSON.stringify(queryCourseID[0].id));
    //var idCourse = QuerryCourse.replace(/\"/g, "");

    const unites = await conex.query("select *from unit where courid = ?",[id]);
    const course = await conex.query("select directory,courname from course where id = ?", [id]);
    const directoryCour = course[0].directory;
    const nameCour = course[0].courname;
    //const unites = await conex.query("select *from cursos where course_status = 'active'");
    //console.log(unites);
    res.render('../views/user/units.hbs', {unites,nameCour,directoryCour});
});

//vista del contenido

//contenido del navbar y sidebar
router.get('/mis_cursos/:id/comenzar',LoggedIn,async (req,res) => {
    const {id} = req.params;

    const unitColor = await conex.query("select color from unit where unittitle = ?",[id]);
    const color = unitColor[0].color;
    const unitTopics = await conex.query("select topic.topicnum, topic.id, topic.topictitle, unit.color from topic inner join unit on topic.unitid = unit.id where unit.unittitle = ? order by topic.topicnum",[id]);
    console.log(color);
    /*const queryUnit = await conex.query("select id from cursos where title = ?",[id]);
    var QuerryCourse = (JSON.stringify(queryCourseID[0].id));
    var idCourse = QuerryCourse.replace(/\"/g, "");

    //const unites = await conex.query("select *from unidades where courseID = ?",[idCourse]);
    //const unites = await conex.query("select *from cursos where course_status = 'active'");
    //console.log(unites);
    res.render('../views/user/units.hbs', {unites, id});*/
    res.render('../views/user/activities.hbs',{id,color,unitTopics});
});

router.get('/activity/:id',LoggedIn,async (req,res) => {
    const {id} = req.params;
    const topicid = id;
    const unit = await conex.query("select unitid from topic where id = ?",[id]);
    const unitID = unit[0].unitid;
    const type = await conex.query("select typetemp, id from template where topicid = ?",[id]);
    const typeid = type[0].typetemp;
    const tempid = type[0].id;
  
    if(typeid == 1)
    {
        const template = await conex.query("select templatet1.id, templatet1.numberTemp, templatet1.templateid, templatet1.element, templatet1.answer from templatet1 inner join template on template.id = templatet1.templateid where template.topicid = ? order by templatet1.numberTemp",[id]);
        res.render('../views/user/templates/type1.hbs',{unitID,template,tempid,topicid,layout: false});
    }
});


module.exports = router;