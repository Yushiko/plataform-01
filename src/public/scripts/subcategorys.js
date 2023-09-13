//funcion de los subtemas
$(".pruebabut").on("click", function() {
  $("#adminMenu").empty();
  $("#adminMenu").load(
    "/administrador/allsubcategorys/" + $(this).data("value")
  );
  //alert("valor :"+ $(this).data("value"));
  //alert("/administrador/allsubcategorys/"+ $(this).data("value"));
});

$(".regresarCate").on("click", function() {
  $("#adminMenu").empty();
  $("#adminMenu").load("/administrador/allcategorys");
});

//funcion de las unidades
$(".unitsButton").on("click", function() {
  $("#adminMenu").empty();
  $("#adminMenu").load("/administrador/allunit/" + $(this).data("value"));
  //alert("valor :"+ $(this).data("value"));
  //alert("/administrador/allsubcategorys/"+ $(this).data("value"));
});
$(".regresarCourse").on("click", function() {
  $("#adminMenu").empty();
  $("#adminMenu").load("/administrador/allcourses");
});
//--------------------------FUNCION PARA VER LOS TEMAS------------------------
//VISTA ADMINISTRADOR
$(".topicButton").on("click", function() {
  $("#adminMenu").empty();
  $("#adminMenu").load("/administrador/alltopics/" + $(this).data("value"));
  //alert("valor :"+ $(this).data("value"));
  //alert("/administrador/allsubcategorys/"+ $(this).data("value"));
});
$(".regresarUnits").on("click", function() {
  $("#adminMenu").empty();
  $("#adminMenu").load("/administrador/allunit/" + $(this).data("value"));
});
//VISTA PROFESOR
$(".topicTButton").on("click", function() {
  $("#adminMenu").empty();
  $("#adminMenu").load("/profesor/alltopics/" + $(this).data("value"));
  //alert("valor :"+ $(this).data("value"));
  //alert("/administrador/allsubcategorys/"+ $(this).data("value"));
});
$(".regresarTUnits").on("click", function() {
  $("#adminMenu").empty();
  $("#adminMenu").load("/profesor/allunit/" + $(this).data("value"));
});

//funcion de las listas del grupo
$(".listButton").on("click", function() {
  $("#adminMenu").empty();
  $("#adminMenu").load("/administrador/alllist/" + $(this).data("value"));
});
$(".regresarGroup").on("click", function() {
  $("#adminMenu").empty();
  $("#adminMenu").load("/administrador/allgroups");
});
//VISTA PROFESOR
$(".listTButton").on("click", function() {
  $("#adminMenu").empty();
  $("#adminMenu").load("/profesor/alllist/" + $(this).data("value"));
});
$(".regresarTGroup").on("click", function() {
  $("#adminMenu").empty();
  $("#adminMenu").load("/profesor/allgroups/" + $(this).data("value"));
});

//--------------------------FUNCION PARA VER LA PLANTILLA------------------------
//VISTA ADMINISTRADOR
$(".templateButton").on("click", function() {
  $("#adminMenu").empty();
  $("#adminMenu").load("/administrador/template/" + $(this).data("value"));
  //alert("valor :"+ $(this).data("value"));
  //alert("/administrador/allsubcategorys/"+ $(this).data("value"));
});
$(".regresarTemplates").on("click", function() {
  $("#adminMenu").empty();
  $("#adminMenu").load("/administrador/alltopics/" + $(this).data("value"));
});
//VISTA PROFESOR
$(".templateTButton").on("click", function() {
  $("#adminMenu").empty();
  $("#adminMenu").load("/profesor/template/" + $(this).data("value"));
  //alert("valor :"+ $(this).data("value"));
  //alert("/administrador/allsubcategorys/"+ $(this).data("value"));
});
$(".regresarTTemplates").on("click", function() {
  $("#adminMenu").empty();
  $("#adminMenu").load("/profesor/alltopics/" + $(this).data("value"));
});




//funcion de la busqueda de usuarios
$(".searchUsers").on("click", function() {
  $("#searchForm").submit(function(event) {
    var parametros = $(this).serialize();
    var data = {};
    data.search = "search";
    $.ajax({
      type: "POST",
      url: "/administrador/searchUser",
      data: parametros,

      beforeSend: function(objeto){
        $("#pantallaCarga").css({ display: "block" });
        //$("#loader").html("Cargando...");
      },
      success: function(datos) {
        $("#pantallaCarga").css({ display: "none" });
        //console.log(JSON.stringify(datos));
        $("#userInfo").empty();
        $("#userInfo").load("/administrador/searchUsers/" + JSON.stringify(datos));
        //$("#resultados").html(datos);
        //load(1);
        //$('#editProductModal').modal('hide');
      }
    });
    event.preventDefault();
  });

});

$(".regresarUnits").on("click", function() {
  $("#adminMenu").empty();
  $("#adminMenu").load("/administrador/allunit/" + $(this).data("value"));
});

