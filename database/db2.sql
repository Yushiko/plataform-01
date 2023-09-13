create database Hotel_Cursos;

use Hotel_Cursos;

insert into user values(null,'1','Default_1234','activo',CURRENT_TIMESTAMP,'2020-02-19 22:19:43','1');
insert into infouser values(null,'1','Juan Carlos Miranda Campos','algo@algo.com','programador','1996-05-25');
select distinct * from category inner join subcategory on category.id = subcategory.cateid;
select distinct category.catedesc, subcategory.subcatedesc from category inner join subcategory on category.id = subcategory.cateid;
select count(subcatedesc), cateid  from subcategory group by cateid;
--USUARIOS
create table user(
    id int(11) not null,
    usercve varchar(16) not null,
    password varchar(60) not null,
    status varchar(100) not null,
    lastconec timestamp null default null,
    createacc timestamp not null default current_timestamp,
    typeacc varchar(16) not null
);

alter table user
 ADD PRIMARY KEY (id);

 alter table user
 modify id int (11) not null auto_increment;

 create table infouser(
    id int(11) not null,
    usercve varchar(16) not null,
    fullname varchar(100) not null,
    email varchar(60) not null,
    employment varchar(60) not null,
    birthday varchar(60) not null,
    constraint fk_usercve foreign KEY (usercve) references user(usercve)
);
 alter table infouser
 add PRIMARY KEY (id);

 alter table infouser
 modify id int (11) not null auto_increment;
 

--CATEGORIA
 create table category(
     id int(11) not null, 
     catecve varchar(50) not null,
     catedesc varchar(50) not null
 );
 alter table category
 add PRIMARY KEY (id);

 alter table category
 modify id int (11) not null auto_increment;


 --SUBCATEGORIA
 create table subcategory(
     cateid varchar(50) not null,
     subcatecve varchar(50) not null,
     subcatedesc varchar(50) not null,
     constraint fk_cateid foreign KEY (cateid) references category(id)
 );


 --PERIODO
 create table period(
     percve varchar(50) not null,
     perdesc varchar(50) not null

 );

 --PROFESOR
 create table teacher(
     id int(11) not null,
     usercve varchar(16) not null,
     constraint fk_usercve foreign KEY (usercve) references user(usercve)

 );

 --GRUPO
 create table groups(
     id int(11) not null,
     courid int(11) not null,
     percve varchar(50) not null,
     teacherid int(11) not null,
     constraint fk_percve foreign KEY (percve) references period(percve),
     constraint fk_courcve foreign KEY (courid) references course(id),
     constraint fk_teacherid foreign KEY (teacherid) references user(id)

 );

 alter table groups
 add PRIMARY KEY (id);

 alter table groups
 modify id int (11) not null auto_increment;


 --LISTA

 create table list(
     id int(11) not null,
     usercve varchar(50) not null,
     groid int(11) not null,
     constraint fk_usercve foreign KEY (usercve) references user(usercve),
     constraint fk_groupid foreign KEY (groid) references groups(id)

 );
 
 alter table list
 add PRIMARY KEY (id);

 alter table list
 modify id int (11) not null auto_increment;

  --CURSOS
 create table course(
      id int(11) not null,
      courname varchar(150) not null,
      catecve varchar(60) not null,
      description text,
      image varchar(100) not null,
      directory varchar(100) not null,
      status varchar(11) not null,
      createcour timestamp not null default current_timestamp,
      constraint fk_category foreign KEY (catecve) references category(catecve)

 );

 alter table course
 add PRIMARY KEY (id);

alter table course
 modify id int (11) not null auto_increment;

--unidades
  create table unit(
 id int(11) not null,
 courid int (11) not null,
 unitnum varchar(60) not null,
 unittitle varchar(150) not null,
 image varchar(100) not null,
 color varchar(100) not null,
 createunit timestamp not null default current_timestamp,
 constraint fk_course foreign KEY (courid) references course(id)
 );
alter table unit
 add PRIMARY KEY (id);

alter table unit
 modify id int (11) not null auto_increment;

--temas
  create table topic(
 id int(11) not null,
 topicnum int(11) not null,
 unitid int (11) not null,
 topictitle varchar(150) not null,
 createtopic timestamp not null default current_timestamp,
 constraint fk_unit foreign KEY (unitid) references unit(id)
 );
alter table topic
 add PRIMARY KEY (id);

alter table topic
 modify id int (11) not null auto_increment;

 --plantillas
  create table template(
 id int(11) not null,
 topicid int(11) not null,
 instruction varchar(150) null,
 typetemp int(11) not null,
 constraint fk_topic foreign KEY (topicid) references topic(id)
 );
alter table template
 add PRIMARY KEY (id);

alter table template
 modify id int (11) not null auto_increment;

--pantilla tipo 1
   create table templatet1(
 id int(11) not null,
 numberTemp int(11) not null,
 templateid int(11) not null,
 element varchar(150) not null,
 answer varchar(150) not null,
 constraint fk_template foreign KEY (templateid) references template(id)
 );
alter table templatet1
 add PRIMARY KEY (id);

alter table templatet1
 modify id int (11) not null auto_increment;

