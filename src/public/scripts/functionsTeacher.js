//CREATE-------------------------------
  //nueva unidad
  $(".nuevaUnidadBoton").on("click", function() {
    valor = $(this).val();
    $("#nueva_unidad").submit(function(event) {
      event.preventDefault();
      var formData = new FormData(this);
      console.log(formData);
      var parametros = $(this).serialize();
      $.ajax({
        type: "POST",
        url: "/profesor/nueva_unidad/" + valor,
        data: formData,
        processData: false,
        contentType: false,
  
        beforeSend: function(objeto) {
          $("#pantallaCarga").css({ display: "block" });
        },
        success: function(datos) {
          $("#pantallaCarga").css({ display: "none" });
          $("body").removeClass("modal-open");
          $(".modal-backdrop").remove();
          $("#adminMenu").empty();
          $("#adminMenu").load("/profesor/allunit/" + valor);
        }
      });
      event.preventDefault();
    });
  });
  //nuevo tema
  $(".nuevoTemaBoton").on("click", function() {
    valor = $(this).val();
    $("#nuevo_tema").submit(function(event) {
      event.preventDefault();
      var parametros = $(this).serialize();
      $.ajax({
        type: "POST",
        url: "/profesor/nuevo_tema/" + valor,
        data: parametros,
        beforeSend: function(objeto) {
          $("#pantallaCarga").css({ display: "block" });
          //$("#loader").html("Cargando...");
        },
        success: function(datos) {
          $("#pantallaCarga").css({ display: "none" });
          $("body").removeClass("modal-open");
          $(".modal-backdrop").remove();
  
          $("#adminMenu").empty();
          $("#adminMenu").load("/profesor/alltopics/" + valor);
        }
      });
      event.preventDefault();
    });
  });
  


  //nuevo integrante
  $(".nuevoIntegranteBoton").on("click", function() {
      valor = $(this).val();
      $("#searchForm").submit(function(event) {
        event.preventDefault();
        var parametros = $(this).serialize();
        $.ajax({
          type: "POST",
          url: "/profesor/nuevo_integrante/" + valor,
          data: parametros,
          beforeSend: function(objeto) {
            $("#pantallaCarga").css({ display: "block" });
            //$("#loader").html("Cargando...");
          },
          success: function(datos) {
            var JsonID = JSON.stringify(datos);
            var id = JsonID.replace(/\"/g, "");
            $("#pantallaCarga").css({ display: "none" });
            $("body").removeClass("modal-open");
            $(".modal-backdrop").remove();
    
            $("#adminMenu").empty();
            $("#adminMenu").load("/profesor/alllist/" + id);
          }
        });
        event.preventDefault();
      });
    });
  
  //UPDATE-----------------------------------------------
  
 
  //unidad
  $(".modificarUnitBoton").on("click", function() {
    valor = $(this).val();
    course = $(this).attr("data-course");
    console.log(course);
    $(".modificar_unidad").submit(function(event) {
      event.preventDefault();
      var parametros = $(this).serialize();
      $.ajax({
        type: "POST",
        url: "/profesor/editUnit/" + valor,
        data: parametros,
        beforeSend: function(objeto) {
          $("#pantallaCarga").css({ display: "block" });
        },
        success: function(datos) {
          $("#pantallaCarga").css({ display: "none" });
          $("body").removeClass("modal-open");
          $(".modal-backdrop").remove();
  
          $("#adminMenu").empty();
          $("#adminMenu").load("/profesor/allunit/" + course);
        }
      });
      event.preventDefault();
    });
  });
  //tema
  $(".modificarTopicBoton").on("click", function() {
    valor = $(this).val();
    unit = $(this).attr("data-unit");
    //console.log(unit);
    $(".modificar_tema").submit(function(event) {
      event.preventDefault();
      var parametros = $(this).serialize();
      $.ajax({
        type: "POST",
        url: "/profesor/editTopic/" + valor,
        data: parametros,
        beforeSend: function(objeto) {
          $("#pantallaCarga").css({ display: "block" });
        },
        success: function(datos) {
          $("#pantallaCarga").css({ display: "none" });
          $("body").removeClass("modal-open");
          $(".modal-backdrop").remove();
  
          $("#adminMenu").empty();
          $("#adminMenu").load("/profesor/alltopics/" + unit);
        }
      });
      event.preventDefault();
    });
  });
 

  
  //DELETE
 
  
    $(".eliminarListBoton").on("click", function() {
      valor = $(this).val();
      group = $(this).attr("data-group");
      $(".eliminar_integrante").submit(function(event) {
        event.preventDefault();
        var parametros = $(this).serialize();
        $.ajax({
          type: "POST",
          url: "/profesor/delList/" + valor,
          data: parametros,
          beforeSend: function(objeto) {
            $("#pantallaCarga").css({ display: "block" });
          },
          success: function(datos) {
            $("#pantallaCarga").css({ display: "none" });
            $("body").removeClass("modal-open");
            $(".modal-backdrop").remove();
    
            $("#adminMenu").empty();
            $("#adminMenu").load("/profesor/alllist/"+group);
          }
        });
        event.preventDefault();
      });
    });