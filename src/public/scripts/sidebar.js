/*const btnToggle = document.querySelector('.sideButton');

btnToggle.addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('active');

})*/

$(".sideButtonAdmin").on("click", function() {
  document.getElementById("adminsidebar").classList.toggle("active");
});

$(".sideButton").on("click", function() {
  document.getElementById("sidebar").classList.toggle("active");
});

$("li").click(function() {
  // If this isn't already active
  if (!$(this).hasClass("active")) {
    // Remove the class from anything that is active
    $("li.active").removeClass("active");
    // And make this active
    $(this).addClass("active");
  }
});

//evento de los botones del sidebar del administrador
$(".courseButton").on("click", function() {
  //var $loader = $('.carga');

  $("#adminMenu").empty();
  //$loader.show();
  //$("#adminMenu").load("/administrador/loadScreen");
  //$("#adminMenu").empty();
  $("#adminMenu").load("/administrador/allcourses");
  //$loader.hide();
});

$(".groupButton").on("click", function() {
  $("#adminMenu").empty();
  $("#adminMenu").load("/administrador/allgroups");
});

$(".categoryButton").on("click", function() {
  $("#adminMenu").empty();
  $("#adminMenu").load("/administrador/allcategorys");
});

$(".periodButton").on("click", function() {
  $("#adminMenu").empty();
  $("#adminMenu").load("/administrador/allperiods");
});
//evento de los botones del sidebar del profesor
$(".unitButton").on("click", function() {
  $("#adminMenu").empty();
  $("#adminMenu").load("/profesor/allunit/" + $(this).data("value"));
});
$(".listsButton").on("click", function() {
  $("#adminMenu").empty();
  $("#adminMenu").load("/profesor/allgroups/" + $(this).data("value"));
});

