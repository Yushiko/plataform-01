const express = require('express');
const router = express.Router();

const conex = require('../database');

const {LoggedIn} = require('../lib/session');

const multer = require('multer');

const path = require('path');

const uuid = require('uuid/v4');

const fs = require('fs');


//-------------------------multer--------------------------------------
/*const storage = multer.diskStorage({
    destination: path.join(__dirname,'../public/images/'),
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname).toLocaleLowerCase());
    }

});*/

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      //const ss = path.join(__dirname,'../public/images/');
      let parte = req.directorios ;
      file.path = parte;
      cb(null, parte);
    },
    filename: (req, file, cb) => {
        req.imageName = uuid() + path.extname(file.originalname).toLocaleLowerCase();
        cb(null, req.imageName);
    }
  });


const folderNameCourse = (req, res, next) => {
    req.imagesFolder = uuid();
    req.directorios = path.join(__dirname,'../public/images/')+req.imagesFolder + '/Cursos/';
    fs.mkdirSync( path.join(__dirname,'../public/images/')+req.imagesFolder);
    fs.mkdirSync( path.join(__dirname,'../public/images/')+req.imagesFolder+"/Cursos");
    fs.mkdirSync( path.join(__dirname,'../public/images/')+req.imagesFolder+"/Unidades");
    fs.mkdirSync( path.join(__dirname,'../public/images/')+req.imagesFolder+"/Temas");
    next();

};  
const folderNameUnit = async(req, res, next) => {
    const { id } = req.params;
    console.log(id);
    const directory = await conex.query("select directory from course where id = ?", [id]);
    console.log(directory[0].directory);
    req.directorios = path.join(__dirname,'../public/images/')+directory[0].directory+'/Unidades/';
    next();

};  


const uploadImg = multer({
    storage,
    limits: {fileSize: 5000000},
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const mimetype = fileTypes.test(file.mimetype);
        const extensName = fileTypes.test(path.extname(file.originalname));
        if (mimetype && extensName)
        {
            return cb(null,true);

        }
        else
        {
            cb('Formato invalido de imagen');
            
        }
    }
}).single('imageField')

//-------------------------------------------------------------------------

//--------CURSOS------------------------------------------------------------

//nuevo curso
router.post('/nuevo_curso', folderNameCourse, uploadImg, async (req, res) => {
    console.log(req.files);
    console.log("la imagen se llama: " +req.imageName);
    console.log("la carpeta se llama: "+req.imagesFolder);
    const {courname, catecve, description, status} = req.body;
    const newCourse = {
        courname,
        catecve,
        description,
        status,
        image: req.imageName,
        directory: req.imagesFolder
    };
    await conex.query('INSERT INTO course SET ?', [newCourse]);
    req.flash('alert', 'Nuevo curso añadido correctamente');
    res.send("listo");
    //res.redirect('/administrador/cursos');
});
//editar curso
router.post('/editCourse/:id', async (req, res) => {
    const { id } = req.params;
    console.log(req.params);
    const {courname, catecve, description, status} = req.body;
    const updateCourse = {
        courname,
        catecve,
        description,
        status,
    };
    await conex.query('UPDATE course set ? where id = ?', [updateCourse, id]);
    req.flash('alert', 'Curso modificado correctamente');
    res.send("listo");
    //res.redirect('/administrador/cursos');
});
//eliminar curso
router.post('/delCourse/:id', async (req, res) => {
    const { id } = req.params;
    await conex.query('DELETE from course where id = ?', [id]);
    req.flash('alert', 'Curso eliminado correctamente');
    res.send("listo");
    //res.redirect('/administrador/cursos');
});

//------------------------------------------------------------------------

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

//-------CATEGORIAS-------------------------------------------------------

//nueva categoria
router.post('/nueva_categoria',async (req, res) => {
    const { catecve, catedesc} = req.body;
    const newCategory = {
        catecve,
        catedesc,
    };
    await conex.query('INSERT INTO category SET ?', [newCategory]);
    req.flash('alert', 'Categoria añadida correctamente');
    res.send("listo");
    //res.redirect('/administrador/cursos');
});
//editar categoria
router.post('/editCategory/:id', async (req, res) => {
    const { id } = req.params;
    const { catecve,catedesc} = req.body;
    const updateCategory = {
        catecve,
        catedesc,
    };
    await conex.query('UPDATE category set ? where catecve = ?', [updateCategory, id]);
    req.flash('alert', 'Categoria modificada correctamente');
    res.send("listo");
    //res.redirect('/administrador/cursos');
});
//eliminar categoria
router.post('/delCategory/:id', async (req, res) => {
    const { id } = req.params;
    await conex.query('DELETE from category where catecve = ?', [id]);
    req.flash('alert', 'Categoria eliminada correctamente');
    res.send("listo");
    //res.redirect('/administrador/cursos');
});
//----------------------------------------------------------------------------------------- 

//-------SUBCATEGORIAS-------------------------------------------------------

//nueva subcategoria
router.post('/nueva_subcategoria/:id',async (req, res) => {
    const { subcatecve, subcatedesc} = req.body;
    const { id } = req.params;
    const category = await conex.query("select id from category where catedesc = ?",[id]);
    const newSubcategory = {
        cateid: category[0].id,
        subcatecve,
        subcatedesc,
    };
    await conex.query('INSERT INTO subcategory SET ?', [newSubcategory]);
    const categoryid = category[0].id;
    res.send(""+categoryid+"");
    //res.redirect('/administrador/cursos');
});
//editar subcategoria
router.post('/editSubcategory/:id', async (req, res) => {
    const { id } = req.params;
    const { subcatecve,subcatedesc} = req.body;
    const category = await conex.query("select cateid from subcategory where subcatecve = ?",[id]);
    const updateSubcategory = {
        subcatecve,
        subcatedesc,
    };
    await conex.query('UPDATE subcategory set ? where subcatecve = ?', [updateSubcategory, id]);
    const categoryid = category[0].cateid;
    req.flash('alert', 'Subcategoria modificada correctamente');
    res.send(""+categoryid+"");
    //res.redirect('/administrador/cursos');
});
//eliminar subcategoria
router.post('/delSubcategory/:id', async (req, res) => {
    const { id } = req.params;
    const category = await conex.query("select cateid from subcategory where subcatecve = ?",[id]);
    await conex.query('DELETE from subcategory where subcatecve = ?', [id]);
    const categoryid = category[0].cateid;
    req.flash('alert', 'Subcategoria eliminada correctamente');
    res.send(""+categoryid+"");
    //res.redirect('/administrador/cursos');
});
//----------------------------------------------------------------------------------------- 

//-------PERIODOS--------------------------------------------------------------------------

//nuevo periodo
router.post('/nuevo_periodo',async (req, res) => {
    const { percve, perdesc} = req.body;
    console.log(req.body);
    const newPeriod = {
        percve,
        perdesc,
    };
    await conex.query('INSERT INTO period SET ?', [newPeriod]);
    req.flash('alert', 'Periodo agregado correctamente');
    res.send("listo");
    //res.redirect('/administrador/cursos');
});
//editar periodo
router.post('/editPeriod/:id', async (req, res) => {
    const { id } = req.params;
    const { percve,perdesc} = req.body;
    console.log(percve);
    const updatePeriod = {
        percve,
        perdesc,
    };
    await conex.query('UPDATE period set ? where percve = ?', [updatePeriod, id]);
    req.flash('alert', 'Periodo modificado correctamente');
    res.send("listo");
    //res.redirect('/administrador/cursos');
});
//eliminar periodo
router.post('/delPeriod/:id', async (req, res) => {
    const { id } = req.params;
    await conex.query('DELETE from period where percve = ?', [id]);
    req.flash('alert', 'Periodo eliminado correctamente');
    res.send("listo");
    //res.redirect('/administrador/cursos');
});
//----------------------------------------------------------------------------------------- 

//-------GRUPO--------------------------------------------------------------------------

//nuevo grupo
router.post('/nuevo_grupo',async (req, res) => {
    const { percve, courid, teacherid} = req.body;
    const newGroup = {
        percve,
        courid,
        teacherid

    };
    await conex.query('INSERT INTO groups SET ?', [newGroup]);
    req.flash('alert', 'Grupo creado correctamente');
    res.send("listo");
    //res.redirect('/administrador/cursos');
});

//editar grupo
router.post('/editGroup/:id', async (req, res) => {
    const { id } = req.params;
    const { percve,perdesc} = req.body;
    const updatePeriod = {
        percve,
        perdesc,
    };
    await conex.query('UPDATE period set ? where percve = ?', [updatePeriod, id]);
    req.flash('alert', 'Periodo modificado correctamente');
    res.redirect('/administrador/cursos');
});
//eliminar grupo
router.post('/delGroup/:id', async (req, res) => {
    const { id } = req.params;
    await conex.query('DELETE from groups where id = ?', [id]);
    req.flash('alert', 'Grupo eliminado correctamente');
    res.send("listo");
    //res.redirect('/administrador/cursos');
});
//----------------------------------------------------------------------------------------- 

//-------LISTA--------------------------------------------------------------------------

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
//-----------------------------------------------------------------------------------------
//la pantalla de carga
router.get('/loadScreen',LoggedIn,(req,res) => {
    res.render('../views/partials/loadScreen.hbs',{layout: false});
});


//menu principal del admin
router.get('/menu',LoggedIn,(req,res) => {
    res.render('../views/admin/menu.hbs');
});

//MENU DE CURSOS

//el menu de los cursos y todo lo que contiene
router.get('/menu_cursos',LoggedIn,(req,res) => {
    res.render('../views/admin/courses/menuCourses.hbs');
});

//carga la pag de admin cursos
router.get('/cursos',LoggedIn, async (req,res) => {
    res.render('../views/admin/courses/adminCourses.hbs');
});


//LAS VISTAS DEL CRUD DE LOS CURSOS---------------------------------------------

router.get('/allcourses',LoggedIn, async (req,res) => {
    //const course =  await conex.query("select * from course inner join subcategory on course.catecve = subcategory.subcatecve inner join category on category.id = subcategory.cateid");
    const course2 =  await conex.query("select course.id, course.courname, course.image, course.directory,  course.description, course.status, course.createcour, subcategory.subcatedesc from course inner join subcategory on course.catecve = subcategory.subcatecve inner join category on category.id = subcategory.cateid");
    const category = await conex.query("select * from category inner join subcategory on category.id = subcategory.cateid");
    const allcategory = await conex.query("select *from category");
    const period = await conex.query("select * from period");
    const teacher = await conex.query("select *from user inner join infouser on user.usercve = infouser.usercve where user.typeacc = '2' ");
    const group = await conex.query("select groups.id, period.perdesc, course.courname, course.catecve, infouser.fullname from groups inner join infouser on groups.teacherid = infouser.id inner join period on groups.percve = period.percve inner join course on groups.courid = course.id");

    //console.log(allCourses);
    res.render('../views/admin/courses/views/allCourses.hbs',{category,period,teacher,group,allcategory,course2, layout: false});
});

router.get('/allunit/:id',LoggedIn, async (req,res) => {
    const {id} = req.params;
    const course = await conex.query("select courname,directory from course where id = ?",[id]);
    const nameCour = course[0].courname;
    const directoryCour = course[0].directory;
    //console.log(course[0].directory);
    const unit = await conex.query("select *from unit where courid = ?",[id]);
    res.render('../views/admin/courses/views/allUnits.hbs',{unit,nameCour,directoryCour,id, layout: false});
});

router.get('/alltopics/:id',LoggedIn, async (req,res) => {
    const {id} = req.params;
    const unitID = id; 
    try
    {
    const topicid = await conex.query("select id from topic where unitid = ?",[unitID]);
    const topicID = topicid[0].id;
    const template = await conex.query("select id from template where topicid = ?",[topicID]);
    const existTempl = template[0].id;
    console.log("ssss "+template[0].id);

    const all = await conex.query("select course.id, unit.unittitle, course.courname from unit inner join course on unit.courid = course.id where unit.id = ?",[id]);
    const unitName = all[0].unittitle;
    const courseID = all[0].id;
    const courName = all[0].courname;
    const topics = await conex.query("select *from topic where unitid = ?",[unitID]);
    res.render('../views/admin/courses/views/allTopics.hbs',{unitName,courName,courseID,unitID,existTempl, topics,layout: false});
    }
    catch(e)
    {
        console.log("sssssd" );
    const all = await conex.query("select course.id, unit.unittitle, course.courname from unit inner join course on unit.courid = course.id where unit.id = ?",[id]);
    const unitName = all[0].unittitle;
    const courseID = all[0].id;
    const courName = all[0].courname;
    const topics = await conex.query("select *from topic where unitid = ?",[unitID]);
    res.render('../views/admin/courses/views/allTopics.hbs',{unitName,courName,courseID,unitID, topics,layout: false});

    }
   
});

router.get('/allgroups',LoggedIn, async (req,res) => {
    const course =  await conex.query("select * from course inner join subcategory on course.catecve = subcategory.subcatecve inner join category on category.id = subcategory.cateid");
    const course2 =  await conex.query("select course.id, course.courname, subcategory.subcatedesc from course inner join subcategory on course.catecve = subcategory.subcatecve inner join category on category.id = subcategory.cateid");
    const category = await conex.query("select * from category inner join subcategory on category.id = subcategory.cateid");
    const allcategory = await conex.query("select *from category");
    const period = await conex.query("select * from period");
    const teacher = await conex.query("select *from user inner join infouser on user.usercve = infouser.usercve where user.typeacc = '2' ");
    const group = await conex.query("select groups.id, period.perdesc, course.courname, course.catecve, infouser.fullname from groups inner join infouser on groups.teacherid = infouser.id inner join period on groups.percve = period.percve inner join course on groups.courid = course.id");

    //console.log(allCourses);
    res.render('../views/admin/courses/views/allGroups.hbs',{category,period,teacher,group,course,allcategory,course2, layout: false});
});
router.get('/alllist/:id',LoggedIn, async (req,res) => {
    const {id} = req.params;
    
    const group = await conex.query("select groups.id, period.perdesc, course.courname, course.catecve, infouser.fullname from groups inner join infouser on groups.teacherid = infouser.id inner join period on groups.percve = period.percve inner join course on groups.courid = course.id where groups.id = ?", [id]);
    const list = await conex.query("select infouser.fullname, user.usercve, user.status, list.id, user.lastconec from user inner join infouser on user.usercve = infouser.usercve inner join list on list.usercve = user.usercve where list.groid = ?", [id]);
    const period = group[0].perdesc;
    const teacher = group[0].fullname;
    const course = group[0].courname;
    const groid = id;
    
    //console.log(allCourses);
    res.render('../views/admin/courses/views/groups/groupList.hbs',{period,course,teacher,list,groid,layout: false});
});
router.post('/searchUser', async (req, res) => {
    //console.log("el dato es: "+JSON.stringify(req.body));
    const {usercve} = req.body;

    const myuser = await conex.query("select *from infouser where usercve = ?",[usercve]);
    console.log(myuser[0].usercve);
    res.send(myuser[0].usercve);
;
});

router.get('/searchUsers/:id',LoggedIn, async (req,res) => {
    //console.log(req.body);
    const {id} = req.params;
    var JsonID = id;
    var idUser = JsonID.replace(/\"/g, "");
    const user = await conex.query("select infouser.fullname, infouser.usercve, infouser.employment,user.status from infouser inner join user on user.usercve = infouser.usercve where infouser.usercve = ?",[idUser]);
    const nombre = user[0].fullname;
    const clave = user[0].usercve;
    const status = user[0].status;
    const puesto = user[0].employment;
    
    //console.log(allCourses);
    res.render('../views/admin/teachers/searchUser.hbs',{nombre,clave,status,puesto, layout: false});
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
        res.render('../views/partials/templates/type1Admin.hbs',{unitID,template,tempid,topicid,layout: false});
    }

});


router.get('/allcategorys',LoggedIn, async (req,res) => {
    const course =  await conex.query("select * from course inner join subcategory on course.catecve = subcategory.subcatecve inner join category on category.id = subcategory.cateid");
    const course2 =  await conex.query("select course.id, course.courname, subcategory.subcatedesc from course inner join subcategory on course.catecve = subcategory.subcatecve inner join category on category.id = subcategory.cateid");
    const category = await conex.query("select * from category inner join subcategory on category.id = subcategory.cateid");
    const allcategory = await conex.query("select *from category");
    const period = await conex.query("select * from period");
    const teacher = await conex.query("select *from user inner join infouser on user.usercve = infouser.usercve where user.typeacc = '2' ");
    const group = await conex.query("select groups.id, period.perdesc, course.courname, course.catecve, infouser.fullname from groups inner join infouser on groups.teacherid = infouser.id inner join period on groups.percve = period.percve inner join course on groups.courid = course.id");

    //console.log(allCourses);
    res.render('../views/admin/courses/views/allCategorys.hbs',{category,period,teacher,group,course,allcategory,course2, layout: false});
});
router.get('/allsubcategorys/:id',LoggedIn, async (req,res) => {
    const {id} = req.params;
    const subcate = await conex.query("select *from subcategory where cateid = ?",[id]);
    const category = await conex.query("select catedesc from category where id = ?",[id]);
    const cate = category[0].catedesc;
    res.render('../views/admin/courses/views/allSubcategorys.hbs',{subcate,cate, layout: false});
});

router.get('/allperiods',LoggedIn, async (req,res) => {
    const course =  await conex.query("select * from course inner join subcategory on course.catecve = subcategory.subcatecve inner join category on category.id = subcategory.cateid");
    const course2 =  await conex.query("select course.id, course.courname, subcategory.subcatedesc from course inner join subcategory on course.catecve = subcategory.subcatecve inner join category on category.id = subcategory.cateid");
    const category = await conex.query("select * from category inner join subcategory on category.id = subcategory.cateid");
    const allcategory = await conex.query("select *from category");
    const period = await conex.query("select * from period");
    const teacher = await conex.query("select *from user inner join infouser on user.usercve = infouser.usercve where user.typeacc = '2' ");
    const group = await conex.query("select groups.id, period.perdesc, course.courname, course.catecve, infouser.fullname from groups inner join infouser on groups.teacherid = infouser.id inner join period on groups.percve = period.percve inner join course on groups.courid = course.id");

    //console.log(allCourses);
    res.render('../views/admin/courses/views/allPeriods.hbs',{category,period,teacher,group,course,allcategory,course2, layout: false});
});








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


//-------------------ADMINISTRAR DOCENTES----------------------------------------------------------


//menu usuarios---
router.get('/usuarios',LoggedIn, async(req,res) => {
    const users = await conex.query("select *from user inner join infouser on user.usercve = infouser.usercve");
    //console.log(users[0].birthday);
    res.render('../views/admin/teachers/adminUsers.hbs',{users});
});
//añadir nuevo usuario
router.post('/nuevo_usuario', async (req, res) => {
    const { fullname,email,birthday,usercve,employment } = req.body;

    const newUser = {
       usercve,
       password: 'Default_1234',
       status: 'activo',
       lastconec: null,
       typeacc: '3'
       
    };
    const infoUser = {
        usercve,
        fullname,
        email,
        employment,
        birthday,

    };
    await conex.query('INSERT INTO user SET ?', [newUser]);
    await conex.query('INSERT INTO infouser SET ?', [infoUser]);
    req.flash('alert', 'Usuario añadido correctamente');
    res.redirect('/administrador/usuarios');
});

//editar usuarios
router.post('/editUser/:id', async (req, res) => {
    const { id } = req.params;
    const { fullname,email,birthday,status,employment } = req.body;
    const updateInfoUser = {
        fullname,
        email,
        employment,
        birthday,
    };
    const updateUser = {
        status
    };
    console.log(updateInfoUser);
    console.log(updateUser);
    await conex.query('UPDATE infouser set ? where id = ?', [updateInfoUser, id]);
    await conex.query('UPDATE user set ? where id = ?', [updateUser, id]);
    req.flash('alert', 'Usuario modificado correctamente');
    res.redirect('/administrador/usuarios');
});

//editar permisos
router.post('/editTypeUser/:id', async (req, res) => {
    const { id } = req.params;
    const { typeacc } = req.body;
    await conex.query('UPDATE user set typeacc = ? where id = ?', [typeacc, id]);

    req.flash('alert', 'Permiso modificado correctamente');
    res.redirect('/administrador/usuarios');
});

//eliminar usuario
router.post('/delUser/:id', async (req, res) => {
    const { id } = req.params;
    await conex.query('DELETE from user where id = ?', [id]);
    await conex.query('DELETE from infouser where id = ?', [id]);
    req.flash('alert', 'Usuario eliminado correctamente');
    res.redirect('/administrador/usuarios');
});




module.exports = router;
