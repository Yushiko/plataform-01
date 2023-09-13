$("li").click(function() {
    // If this isn't already active
    if (!$(this).hasClass("active")) {
      // Remove the class from anything that is active
      $("li.active").removeClass("active");
      // And make this active
      $(this).addClass("active");
    }
  });

$(".activityButton").on("click", function() {
    $("#activity").empty();
    $("#activity").load("/usuario/activity/" + $(this).data("value"));
    //alert("valor :"+ $(this).data("value"));
    //alert("/administrador/allsubcategorys/"+ $(this).data("value"));
});