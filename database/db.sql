create database Hotel_Cursos;

use database Hotel_Cursos;

-- tabla de usuarios
create table usuarios(
    id int(11) not null,
    userID varchar(16) not null,
    password varchar(60) not null,
    status varchar(100) not null,
    lastConex timestamp null default null,
    createAccount timestamp not null default current_timestamp,
    typeAccount varchar(16) not null
);

alter table usuarios
 ADD PRIMARY KEY (id);

 alter table usuarios
 modify id int (11) not null auto_increment;

 --ALTER TABLE usuarios
--ADD COLUMN lastConex 
 -- TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
  --ON UPDATE CURRENT_TIMESTAMP;

 describe usuarios;
insert into usuarios values(null,'1','Default_1234','activo',CURRENT_TIMESTAMP,'2020-02-19 22:19:43','1');
insert into datosUsuarios values(null,'1','Juan Carlos Miranda Campos','algo@algo.com','1996-05-25');
-- tabla de datosUsuario
create table datosUsuarios(
    id int(11) not null,
    userID varchar(16) not null,
    fullname varchar(100) not null,
    email varchar(60) not null,
    birthday varchar(60) not null,
    constraint fk_userid foreign KEY (userID) references usuarios(userID)
);
 alter table datosUsuarios
 add PRIMARY KEY (id);

-- tabla profesores
create table profesores(
    userID varchar(16) not null,
    courses varchar(60) not null,
    constraint fk_userid foreign KEY (userID) references usuarios(userID)
);




alter table datosUsuarios
 modify id int (11) not null auto_increment;

 -- tabla de cursos
 create table cursos(
      id int(11) not null,
      title varchar(150) not null,
      category varchar(60) not null,
      description text,
      user_id int(11),
      course_status varchar(11) not null,
      created_at timestamp not null default current_timestamp,
      constraint fk_user foreign KEY (user_id) references users(id)

 );

 alter table cursos
 add PRIMARY KEY (id);

alter table cursos
 modify id int (11) not null auto_increment;


 create table unidades(
 id int(11) not null,
 courseID int (11) not null,
 unit varchar(60) not null,
 title varchar(150) not null,
 created_at timestamp not null default current_timestamp,
 constraint fk_course foreign KEY (courseID) references cursos(id)
 );
alter table unidades
 add PRIMARY KEY (id);

alter table unidades
 modify id int (11) not null auto_increment;


 create table temas(
 topicNumber int(11) not null,
 unitID int (11) not null,
 title varchar(150) not null,
 created_at timestamp not null default current_timestamp,
 constraint fk_course foreign KEY (unitID) references unidades(id)
 );
