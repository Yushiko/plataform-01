//nueva plantilla
$(".nuevaPlantillaBoton").on("click", function() {
    valor = $(this).val();
    unit = $(this).attr("data-unit");
    $("#nueva_plantilla").submit(function(event) {
      event.preventDefault();
      var parametros = $(this).serialize();
      $.ajax({
        type: "POST",
        url: "/profesor/nueva_plantilla/" + valor,
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
          $("#adminMenu").load("/profesor/alltopics/" + unit);
        }
      });
      event.preventDefault();
    });
  });
  
  //PLANTILLA TIPO 1
  
  // nuevo elemento
  $(".nuevoElementoT1Boton").on("click", function() {
    valor = $(this).val();
    topic = $(this).attr("data-topic");
    $("#nueva_elementoT1").submit(function(event) {
      event.preventDefault();
      var parametros = $(this).serialize();
      $.ajax({
        type: "POST",
        url: "/profesor/nuevo_elementot1/" + valor,
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
          $("#adminMenu").load("/profesor/template/" + topic);
        }
      });
      event.preventDefault();
    });
  });
  // editar elemento
  $(".editarElementoT1Boton").on("click", function() {
      valor = $(this).val();
      topic = $(this).attr("data-topic");
      $(".editar_elementoT1").submit(function(event) {
        event.preventDefault();
        var parametros = $(this).serialize();
        $.ajax({
          type: "POST",
          url: "/profesor/editElementt1/" + valor,
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
            $("#adminMenu").load("/profesor/template/" + topic);
          }
        });
        event.preventDefault();
      });
    });
    // eliminar elemento
  $(".eliminarElementoT1Boton").on("click", function() {
      valor = $(this).val();
      topic = $(this).attr("data-topic");
      $(".eliminar_elementoT1").submit(function(event) {
        event.preventDefault();
        var parametros = $(this).serialize();
        $.ajax({
          type: "POST",
          url: "/profesor/delElementt1/" + valor,
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
            $("#adminMenu").load("/profesor/template/" + topic);
          }
        });
        event.preventDefault();
      });
    });