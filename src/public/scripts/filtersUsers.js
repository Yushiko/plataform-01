$(document).ready(function() {
  $("#searchUser").on("keyup", function() {
    var value = $(this)
      .val()
      .toLowerCase();
    $("#allUsers tr").filter(function() {
      $(this).toggle(
        $(this)
          .text()
          .toLowerCase()
          .indexOf(value) > -1
      );
    });
  });
});

$(document).ready(function() {
  $("#searchCourse").on("keyup", function() {
    var value = $(this)
      .val()
      .toLowerCase();
    $("#allCourse tr").filter(function() {
      $(this).toggle(
        $(this)
          .text()
          .toLowerCase()
          .indexOf(value) > -1
      );
    });
  });
});

$(document).ready(function() {
  $("#searchCategory").on("keyup", function() {
    var value = $(this)
      .val()
      .toLowerCase();
    $("#allCategory tr").filter(function() {
      $(this).toggle(
        $(this)
          .text()
          .toLowerCase()
          .indexOf(value) > -1
      );
    });
  });
});

$(document).ready(function() {
  $("#searchPeriod").on("keyup", function() {
    var value = $(this)
      .val()
      .toLowerCase();
    $("#allPeriod tr").filter(function() {
      $(this).toggle(
        $(this)
          .text()
          .toLowerCase()
          .indexOf(value) > -1
      );
    });
  });
});

$(document).ready(function() {
  $("#tableCourses").DataTable({
    searching: false,
    paging: false,
    info: false,
    scrollY: "80%",
    scrollCollapse: true,
    paging: false
  });
});

$(document).ready(function() {
  $("#tableUsers").DataTable({
    searching: false,
    paging: false,
    info: false,
    scrollY: "80%",
    scrollCollapse: true,
    paging: false
  });
});

$(document).ready(function() {
  $("#tableGroups").DataTable({
    searching: false,
    paging: false,
    info: false,
    scrollY: "80%",
    scrollCollapse: true,
    paging: false
  });
});

$(document).ready(function() {
  $("#tablePeriods").DataTable({
    searching: false,
    paging: false,
    info: false,
    scrollY: "80%",
    scrollCollapse: true,
    paging: false
  });
});

$(document).ready(function() {
  $("#tableCategorys").DataTable({
    searching: false,
    paging: false,
    info: false,
    scrollY: "80%",
    scrollCollapse: true,
    paging: false
  });
});

//funcion para el cambio de categorias en la administracion 
function myFunction() {
  var x = document.getElementById("filter").value;
  var cour = document.getElementById("allCourses");
  var grou = document.getElementById("allGroups");
  var peri = document.getElementById("allPeriods");
  var cate = document.getElementById("allCategorys");
  if (x == "cursos") {
    cour.style.display = "block";
    grou.style.display = "none";
    peri.style.display = "none";
    cate.style.display = "none";
  }
  if (x == "grupo") {
    cour.style.display = "none";
    grou.style.display = "block";
    peri.style.display = "none";
    cate.style.display = "none";
  }
  if (x == "periodo") {
    cour.style.display = "none";
    grou.style.display = "none";
    peri.style.display = "block";
    cate.style.display = "none";
  }
  if (x == "categoria") {
    cour.style.display = "none";
    grou.style.display = "none";
    peri.style.display = "none";
    cate.style.display = "block";
  }
}
