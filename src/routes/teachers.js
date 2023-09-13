const express = require("express");
const router = express.Router();

const conex = require("../database");

const { LoggedIn } = require("../lib/session");

const multer = require("multer");

const path = require("path");

const uuid = require("uuid/v4");

const fs = require("fs");

//---multer---
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    //const ss = path.join(__dirname,'../public/images/');
    let parte = req.directorios;
    file.path = parte;
    cb(null, parte);
  },
  filename: (req, file, cb) => {
    req.imageName =
      uuid() + path.extname(file.originalname).toLocaleLowerCase();
    cb(null, req.imageName);
  }
});
const folderNameUnit = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const directory = await conex.query(
    "select directory from course where id = ?",
    [id]
  );
  console.log(directory[0].directory);
  req.directorios =
    path.join(__dirname, "../public/images/") +
    directory[0].directory +
    "/Unidades/";
  next();
};
const uploadImg = multer({
  storage,
  limits: { fileSize: 5000000 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimetype = fileTypes.test(file.mimetype);
    const extensName = fileTypes.test(path.extname(file.originalname));
    if (mimetype && extensName) {
      return cb(null, true);
    } else {
      cb("Formato invalido de imagen");
    }
  }
}).single("imageField");


//--------UNIDADES------------------------------------------------------------

//nueva unidad
router.post('/nueva_unidad/:id',folderNameUnit, uploadImg, async (req, res) => {
    const { id } = req.params;
    //const courseID = await conex.query("select id from course where courname = ?", [id]);
    const {unitnum, unittitle, color} = req.body;
    const newUnit = {
        courid: id,
        unitnum,
        unittitle,
        image: req.imageName,
        color
    };
    console.log(newUnit);
    await conex.query('INSERT INTO unit SET ?', [newUnit]);
    req.flash('alert', 'Nueva unidad añadida correctamente');
    res.send("listo");
    //res.redirect('/administrador/cursos');
});
//editar unidad
router.post('/editUnit/:id', async (req, res) => {
    const { id } = req.params;
    const {unitnum, unittitle, color} = req.body;
    const updateUnit = {
        unitnum,
        unittitle,
        color
    };
    await conex.query('UPDATE unit set ? where id = ?', [updateUnit, id]);
    req.flash('alert', 'Unidad modificado correctamente');
    res.send("listo");
    //res.redirect('/administrador/cursos');
});
//eliminar unidad
router.post('/delUnit/:id', async (req, res) => {
    const { id } = req.params;
    await conex.query('DELETE from unit where id = ?', [id]);
    req.flash('alert', 'Unidad eliminado correctamente');
    res.redirect('/administrador/cursos');
});

//------------------------------------------------------------------------

//--------TEMAS------------------------------------------------------------

//nuevo tema
router.post('/nuevo_tema/:id', async (req, res) => {
    const { id } = req.params;
    //const courseID = await conex.query("select id from course where courname = ?", [id]);
    const {topicnum, topictitle} = req.body;
    const newTopic = {
        topicnum,
        unitid: id,
        topictitle
    };
    //console.log(newTopic);
    await conex.query('INSERT INTO topic SET ?', [newTopic]);
    req.flash('alert', 'Nuevo tema añadido correctamente');
    res.send("listo");
    //res.redirect('/administrador/cursos');
});
//añadir plantilla
router.post('/nueva_plantilla/:id', async (req, res) => {
  const { id } = req.params;
  //const courseID = await conex.query("select id from course where courname = ?", [id]);
  const {typetemp} = req.body;
  const newTemplate = {
      topicid: id,
      typetemp,

  };
  console.log(newTemplate);
  await conex.query('INSERT INTO template SET ?', [newTemplate]);
  req.flash('alert', 'Plantilla añadida correctamente');
  res.send("listo");
  //res.redirect('/administrador/cursos');
});
//editar tema
router.post('/editTopic/:id', async (req, res) => {
    const { id } = req.params;
    const {topicnum, topictitle} = req.body;
    const updateTopic = {
        topicnum,
        topictitle,
    };
    await conex.query('UPDATE topic set ? where id = ?', [updateTopic, id]);
    req.flash('alert', 'Tema modificado correctamente');
    res.send("listo");
    //res.redirect('/administrador/cursos');
});
//eliminar tema
router.post('/delTopic/:id', async (req, res) => {
    const { id } = req.params;
    await conex.query('DELETE from topic where id = ?', [id]);
    req.flash('alert', 'Tema eliminado correctamente');
    res.redirect('/administrador/cursos');
});
//------------------------------------------------------------------------

//-----LISTAS-------------------------------------------------------------
//nuevo integrante
router.post('/nuevo_integrante/:id',async (req, res) => {
    const { id } = req.params;
    const { usercve } = req.body;
    const newMember = {
        usercve,
        groid: id

    };
    console.log(newMember);
    await conex.query('INSERT INTO list SET ?', [newMember]);
    req.flash('alert', 'Integrante añadido correctamente');
    res.send(""+id+"");
    //res.redirect('/administrador/cursos');
});

//eliminar integrante
router.post('/delList/:id', async (req, res) => {
    const { id } = req.params;
    await conex.query('DELETE from list where id = ?', [id]);
    req.flash('alert', 'Integrante eliminado correctamente');
    res.send("listo");
    //res.redirect('/administrador/cursos');
});

//------------------------------------------------------------

//------------------PLANTILLAS-----------------------------------------------------

//----Tipo 1-------
//nuevo elemento t1
router.post('/nuevo_elementot1/:id', async (req, res) => {
  const {id} = req.params;
  const {element, answer, numberTemp} = req.body;
  const newElement = {
      templateid: id,
      element,
      answer,
      numberTemp
  };
  console.log(newElement);
  await conex.query('INSERT INTO templatet1 SET ?', [newElement]);
  req.flash('alert', 'Elemento añadido correctamente');
  res.send("listo");
  //res.redirect('/administrador/cursos');
});
//editar elemento t1
router.post('/editElementt1/:id', async (req, res) => {
  const { id } = req.params;
  const {element, answer, numberTemp} = req.body;
  const updatelement = {
      element,
      answer,
      numberTemp
  };
  //console.log(updatelement);
  //console.log(id);
  await conex.query('UPDATE templatet1 set ? where id = ?', [updatelement, id]);
  req.flash('alert', 'Elemento modificado correctamente');
  res.send("listo");
  //res.redirect('/administrador/cursos');
});

//eliminar elemento t1
router.post('/delElementt1/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  await conex.query('DELETE from templatet1 where id = ?', [id]);
  req.flash('alert', 'Elemento eliminado correctamente');
  res.send("listo");
  //res.redirect('/administrador/cursos');
});

//--------------------------------------------------------



//la pantalla de carga
router.get('/loadScreen',LoggedIn,(req,res) => {
    res.render('../views/partials/loadScreen.hbs',{layout: false});
});
//carga la pag de admin cursos
router.get('/curso/:id',LoggedIn, async (req,res) => {
    const {id} = req.params;
    const course = await conex.query("select courname from course where id = ?",[id]);
    const courseName = course[0].courname;
    res.render('../views/teacher/courses/adminCourses.hbs', {courseName,id});
});

//vista de todas las unidades
router.get('/allunit/:id',LoggedIn, async (req,res) => {
    const {id} = req.params;
    const course = await conex.query("select courname,directory from course where id = ?",[id]);
    const nameCour = course[0].courname;
    const directoryCour = course[0].directory;
    //console.log(course[0].directory);
    const unit = await conex.query("select *from unit where courid = ?",[id]);
    res.render('../views/teacher/courses/allUnits.hbs',{unit,nameCour,directoryCour,id, layout: false});
});
//vista de todos los temas
router.get('/alltopics/:id',LoggedIn, async (req,res) => {
  const {id} = req.params;
  const unitID = id; 
  try
  {
  const topicid = await conex.query("select id from topic where unitid = ?",[unitID]);
  const topicID = topicid[0].id;
  const template = await conex.query("select id from template where topicid = ?",[topicID]);
  const all = await conex.query("select course.id, unit.unittitle, course.courname from unit inner join course on unit.courid = course.id where unit.id = ?",[id]);
  const unitName = all[0].unittitle;
  const courseID = all[0].id;
  const courName = all[0].courname;
  const topics = await conex.query("select *from topic where unitid = ?",[unitID]);
  res.render('../views/teacher/courses/allTopics.hbs',{unitName,courName,courseID,unitID,template, topics,layout: false});
  }
  catch(e)
  {
  const all = await conex.query("select course.id, unit.unittitle, course.courname from unit inner join course on unit.courid = course.id where unit.id = ?",[id]);
  const unitName = all[0].unittitle;
  const courseID = all[0].id;
  const courName = all[0].courname;
  const topics = await conex.query("select *from topic where unitid = ?",[unitID]);
  res.render('../views/teacher/courses/allTopics.hbs',{unitName,courName,courseID,unitID, topics,layout: false});

  }
 
});
//vista de los grupos
router.get('/allgroups/:id',LoggedIn, async (req,res) => {
    const {id} = req.params;
    const course =  await conex.query("select * from course inner join subcategory on course.catecve = subcategory.subcatecve inner join category on category.id = subcategory.cateid");
    const course2 =  await conex.query("select course.id, course.courname, subcategory.subcatedesc from course inner join subcategory on course.catecve = subcategory.subcatecve inner join category on category.id = subcategory.cateid");
    const category = await conex.query("select * from category inner join subcategory on category.id = subcategory.cateid");
    const allcategory = await conex.query("select *from category");
    const period = await conex.query("select * from period");
    const teacher = await conex.query("select *from user inner join infouser on user.usercve = infouser.usercve where user.typeacc = '2' ");
    const group = await conex.query("select groups.id, period.perdesc, course.courname, course.catecve, infouser.fullname from groups inner join infouser on groups.teacherid = infouser.id inner join period on groups.percve = period.percve inner join course on groups.courid = course.id where groups.courid = ? and groups.teacherid = ?",[id,req.user.id]);

    //console.log(allCourses);
    res.render('../views/teacher/groups/allGroups.hbs',{category,period,teacher,group,course,allcategory,course2, layout: false});
});
//vista de los integrantes del grupo
router.get('/alllist/:id',LoggedIn, async (req,res) => {
    const {id} = req.params;
    
    const group = await conex.query("select groups.id, course.id, period.perdesc, course.courname, course.catecve, infouser.fullname from groups inner join infouser on groups.teacherid = infouser.id inner join period on groups.percve = period.percve inner join course on groups.courid = course.id where groups.id = ?", [id]);
    const list = await conex.query("select infouser.fullname, user.usercve, user.status, list.id, user.lastconec from user inner join infouser on user.usercve = infouser.usercve inner join list on list.usercve = user.usercve where list.groid = ?", [id]);
    const period = group[0].perdesc;
    const teacher = group[0].fullname;
    const course = group[0].courname;
    const courseID = group[0].id;
    const groid = id;
    
    //console.log(allCourses);
    res.render('../views/teacher/groups/groupList.hbs',{period,course,groid,teacher,list,courseID,layout: false});
});

//carga los cursos asiganos al profesor
router.get('/mis_cursos',LoggedIn,async (req,res) => {
    const mycourses = await conex.query("select course.courname,course.status,course.id,course.description,course.image,course.directory,infouser.fullname from course inner join groups on groups.courid = course.id inner join infouser on infouser.id = groups.teacherid where groups.teacherid = ?",[req.user.id]);
    //const mycourses = await conex.query("select *from course where status = 'activo'");
    //console.log(mycourses);
    res.render('../views/teacher/mycourses.hbs', {mycourses});
});

//vista de la plantilla
router.get('/template/:id',LoggedIn, async (req,res) => {
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
      res.render('../views/partials/templates/type1Teacher.hbs',{unitID,template,tempid,topicid,layout: false});
  }

});

module.exports = router;