$(document).ready(function () {
    //funcion que toma la altura del navegador y la guarda dentro de la variable --altura dentro de la etiqueta contentNewcoruses
    var alt = $(window).height();
    $(".contentNewcourses").css("--altura", alt);
    $(".contentCourses").css("--altura", alt);
    $(".contentMenu").css("--altura", alt);
    $(".fondoHotel").css("height", alt);
    $("#sidebar").css("height", alt);
    //alert(alt);

});