/*---HEADER---*/
$("header").click(function () {
    $("header").animate({
        bottom: "100%",
        opacity: "0.1",
    }, 2000)
})


/*---CAROUSEL---*/
$('.carousel').carousel({
    interval: 5000
})

$("#playButton").hide()

$('#playButton').click(function () {
    $("#playButton").hide()
    $("#pauseButton").show()
    $('#carouselFonctionnement').carousel('cycle');
});
$('#pauseButton').click(function () {
    $("#playButton").show()
    $("#pauseButton").hide()
    $('#carouselFonctionnement').carousel('pause');
});

// Uncomment to enable Bootstrap tooltips
// https://getbootstrap.com/docs/4.0/components/tooltips/#example-enable-tooltips-everywhere
// $(function () { $('[data-toggle="tooltip"]').tooltip(); });

// Uncomment to enable Bootstrap popovers
// https://getbootstrap.com/docs/4.0/components/popovers/#example-enable-popovers-everywhere
// $(function () { $('[data-toggle="popover"]').popover(); });
