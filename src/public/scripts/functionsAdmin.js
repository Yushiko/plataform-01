//CREATE-------------------------------
//nuevo curso
$(".nuevoCursoBoton").on("click", function() {
  $("#nuevo_curso").submit(function(event) {
    event.preventDefault();
    var formData = new FormData(this);
    console.log(formData);
    var parametros = $(this).serialize();
    $.ajax({
      type: "POST",
      url: "/administrador/nuevo_curso",
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
        $("#adminMenu").load("/administrador/allcourses");
      },
      error: function() {
        alert("error");
      }
    });
    event.preventDefault();
  });
});
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
      url: "/administrador/nueva_unidad/" + valor,
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
        $("#adminMenu").load("/administrador/allunit/" + valor);
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
      url: "/administrador/nuevo_tema/" + valor,
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
        $("#adminMenu").load("/administrador/alltopics/" + valor);
      }
    });
    event.preventDefault();
  });
});

//nuevo periodo
$(".nuevoPeriodoBoton").on("click", function() {
  $("#nuevo_periodo").submit(function(event) {
    event.preventDefault();
    var parametros = $(this).serialize();
    $.ajax({
      type: "POST",
      url: "/administrador/nuevo_periodo",
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
        $("#adminMenu").load("/administrador/allperiods");
      }
    });
    event.preventDefault();
  });
});
//nueva categoria
$(".nuevaCategoriadoBoton").on("click", function() {
  $("#nueva_categoria").submit(function(event) {
    event.preventDefault();
    var parametros = $(this).serialize();
    $.ajax({
      type: "POST",
      url: "/administrador/nueva_categoria",
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
        $("#adminMenu").load("/administrador/allcategorys");
      }
    });
    event.preventDefault();
  });
});
//nueva subcategoria
$(".nuevaSubcategoriadoBoton").on("click", function() {
  valor = $(this).val();
  $("#nueva_subcategoria").submit(function(event) {
    event.preventDefault();
    var parametros = $(this).serialize();
    $.ajax({
      type: "POST",
      url: "/administrador/nueva_subcategoria/" + valor,
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
        $("#adminMenu").load("/administrador/allsubcategorys/" + id);
      }
    });
    event.preventDefault();
  });
});
//nuevo grupo
$(".nuevoGrupoBoton").on("click", function() {
    $("#nuevo_grupo").submit(function(event) {
      event.preventDefault();
      var parametros = $(this).serialize();
      $.ajax({
        type: "POST",
        url: "/administrador/nuevo_grupo",
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
          $("#adminMenu").load("/administrador/allgroups");
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
        url: "/administrador/nuevo_integrante/" + valor,
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
          $("#adminMenu").load("/administrador/alllist/" + id);
        }
      });
      event.preventDefault();
    });
  });

//UPDATE-----------------------------------------------

//curso
$(".modificarCourseBoton").on("click", function() {
  valor = $(this).val();
  $(".modificar_curso").submit(function(event) {
    event.preventDefault();
    var parametros = $(this).serialize();
    $.ajax({
      type: "POST",
      url: "/administrador/editCourse/" + valor,
      data: parametros,
      beforeSend: function(objeto) {
        $("#pantallaCarga").css({ display: "block" });
      },
      success: function(datos) {
        $("#pantallaCarga").css({ display: "none" });
        $("body").removeClass("modal-open");
        $(".modal-backdrop").remove();

        $("#adminMenu").empty();
        $("#adminMenu").load("/administrador/allcourses");
      }
    });
    event.preventDefault();
  });
});
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
      url: "/administrador/editUnit/" + valor,
      data: parametros,
      beforeSend: function(objeto) {
        $("#pantallaCarga").css({ display: "block" });
      },
      success: function(datos) {
        $("#pantallaCarga").css({ display: "none" });
        $("body").removeClass("modal-open");
        $(".modal-backdrop").remove();

        $("#adminMenu").empty();
        $("#adminMenu").load("/administrador/allunit/" + course);
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
      url: "/administrador/editTopic/" + valor,
      data: parametros,
      beforeSend: function(objeto) {
        $("#pantallaCarga").css({ display: "block" });
      },
      success: function(datos) {
        $("#pantallaCarga").css({ display: "none" });
        $("body").removeClass("modal-open");
        $(".modal-backdrop").remove();

        $("#adminMenu").empty();
        $("#adminMenu").load("/administrador/alltopics/" + unit);
      }
    });
    event.preventDefault();
  });
});
//periodo
$(".modificarPeriodBoton").on("click", function() {
  valor = $(this).val();
  //unit = $(this).attr("data-unit");
  //console.log(unit);
  $(".modificar_periodo").submit(function(event) {
    event.preventDefault();
    var parametros = $(this).serialize();
    $.ajax({
      type: "POST",
      url: "/administrador/editPeriod/" + valor,
      data: parametros,
      beforeSend: function(objeto) {
        $("#pantallaCarga").css({ display: "block" });
      },
      success: function(datos) {
        $("#pantallaCarga").css({ display: "none" });
        $("body").removeClass("modal-open");
        $(".modal-backdrop").remove();

        $("#adminMenu").empty();
        $("#adminMenu").load("/administrador/allperiods");
      }
    });
    event.preventDefault();
  });
});

//categoria
$(".modificarCategoryBoton").on("click", function() {
  valor = $(this).val();
  $(".modificar_categoria").submit(function(event) {
    event.preventDefault();
    var parametros = $(this).serialize();
    $.ajax({
      type: "POST",
      url: "/administrador/editCategory/" + valor,
      data: parametros,
      beforeSend: function(objeto) {
        $("#pantallaCarga").css({ display: "block" });
      },
      success: function(datos) {
        $("#pantallaCarga").css({ display: "none" });
        $("body").removeClass("modal-open");
        $(".modal-backdrop").remove();

        $("#adminMenu").empty();
        $("#adminMenu").load("/administrador/allcategorys");
      }
    });
    event.preventDefault();
  });
});
//subcategoria
$(".modificarSubcategoryBoton").on("click", function() {
  valor = $(this).val();
  $(".modificar_subcategoria").submit(function(event) {
    event.preventDefault();
    var parametros = $(this).serialize();
    $.ajax({
      type: "POST",
      url: "/administrador/editSubcategory/" + valor,
      data: parametros,
      beforeSend: function(objeto) {
        $("#pantallaCarga").css({ display: "block" });
      },
      success: function(datos) {
        var JsonID = JSON.stringify(datos);
        var id = JsonID.replace(/\"/g, "");
        $("#pantallaCarga").css({ display: "none" });
        $("body").removeClass("modal-open");
        $(".modal-backdrop").remove();

        $("#adminMenu").empty();
        $("#adminMenu").load("/administrador/allsubcategorys/" + id);
      }
    });
    event.preventDefault();
  });
});

//DELETE
$(".eliminarCourseBoton").on("click", function() {
  valor = $(this).val();
  $(".eliminar_curso").submit(function(event) {
    event.preventDefault();
    var parametros = $(this).serialize();
    $.ajax({
      type: "POST",
      url: "/administrador/delCourse/" + valor,
      data: parametros,
      beforeSend: function(objeto) {
        $("#pantallaCarga").css({ display: "block" });
      },
      success: function(datos) {
        $("#pantallaCarga").css({ display: "none" });
        $("body").removeClass("modal-open");
        $(".modal-backdrop").remove();

        $("#adminMenu").empty();
        $("#adminMenu").load("/administrador/allcourses");
      }
    });
    event.preventDefault();
  });
});
$(".eliminarPeriodBoton").on("click", function() {
  valor = $(this).val();
  $(".eliminar_periodo").submit(function(event) {
    event.preventDefault();
    var parametros = $(this).serialize();
    $.ajax({
      type: "POST",
      url: "/administrador/delPeriod/" + valor,
      data: parametros,
      beforeSend: function(objeto) {
        $("#pantallaCarga").css({ display: "block" });
      },
      success: function(datos) {
        $("#pantallaCarga").css({ display: "none" });
        $("body").removeClass("modal-open");
        $(".modal-backdrop").remove();

        $("#adminMenu").empty();
        $("#adminMenu").load("/administrador/allperiods");
      }
    });
    event.preventDefault();
  });
});

$(".eliminarCategoryBoton").on("click", function() {
  valor = $(this).val();
  $(".eliminar_categoria").submit(function(event) {
    event.preventDefault();
    var parametros = $(this).serialize();
    $.ajax({
      type: "POST",
      url: "/administrador/delCategory/" + valor,
      data: parametros,
      beforeSend: function(objeto) {
        $("#pantallaCarga").css({ display: "block" });
      },
      success: function(datos) {
        $("#pantallaCarga").css({ display: "none" });
        $("body").removeClass("modal-open");
        $(".modal-backdrop").remove();

        $("#adminMenu").empty();
        $("#adminMenu").load("/administrador/allcategorys");
      }
    });
    event.preventDefault();
  });
});
$(".eliminarSubcategoryBoton").on("click", function() {
  valor = $(this).val();
  $(".eliminar_subcategoria").submit(function(event) {
    event.preventDefault();
    var parametros = $(this).serialize();
    $.ajax({
      type: "POST",
      url: "/administrador/delSubcategory/" + valor,
      data: parametros,
      beforeSend: function(objeto) {
        $("#pantallaCarga").css({ display: "block" });
      },
      success: function(datos) {
        var JsonID = JSON.stringify(datos);
        var id = JsonID.replace(/\"/g, "");
        $("#pantallaCarga").css({ display: "none" });
        $("body").removeClass("modal-open");
        $(".modal-backdrop").remove();

        $("#adminMenu").empty();
        $("#adminMenu").load("/administrador/allsubcategorys/" + id);
      }
    });
    event.preventDefault();
  });
});
$(".eliminarGroupBoton").on("click", function() {
    valor = $(this).val();
    $(".eliminar_grupo").submit(function(event) {
      event.preventDefault();
      var parametros = $(this).serialize();
      $.ajax({
        type: "POST",
        url: "/administrador/delGroup/" + valor,
        data: parametros,
        beforeSend: function(objeto) {
          $("#pantallaCarga").css({ display: "block" });
        },
        success: function(datos) {
          $("#pantallaCarga").css({ display: "none" });
          $("body").removeClass("modal-open");
          $(".modal-backdrop").remove();
  
          $("#adminMenu").empty();
          $("#adminMenu").load("/administrador/allgroups");
        }
      });
      event.preventDefault();
    });
  });
  $(".eliminarListBoton").on("click", function() {
    valor = $(this).val();
    group = $(this).attr("data-group");
    $(".eliminar_integrante").submit(function(event) {
      event.preventDefault();
      var parametros = $(this).serialize();
      $.ajax({
        type: "POST",
        url: "/administrador/delList/" + valor,
        data: parametros,
        beforeSend: function(objeto) {
          $("#pantallaCarga").css({ display: "block" });
        },
        success: function(datos) {
          $("#pantallaCarga").css({ display: "none" });
          $("body").removeClass("modal-open");
          $(".modal-backdrop").remove();
  
          $("#adminMenu").empty();
          $("#adminMenu").load("/administrador/alllist/"+group);
        }
      });
      event.preventDefault();
    });
  });
