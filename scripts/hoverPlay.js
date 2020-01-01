//Play Videos -- Hover
$(document).ready(function () {
    var nowPlaying = $('#gridVideoz0').attr("src");
    var nowPlaying1 = $('#gridVideoz1').attr("src");
    var nowPlaying2 = $('#gridVideoz2').attr("src");
    var nowPlaying3 = $('#gridVideoz3').attr("src");
    var nowPlaying4 = $('#gridVideoz4').attr("src");
    var nowPlaying5 = $('#gridVideoz5').attr("src");
    var nowPlaying6 = $('#gridVideoz6').attr("src");
    var nowPlaying7 = $('#gridVideoz7').attr("src");
    $('#gridVideoz0').hover(function () {
        $('#gridVideoz0').attr("src", nowPlaying + '&autoplay=1')
    }, function () {
        $('#gridVideoz0').attr("src", nowPlaying)
    });
    $('#gridVideoz1').hover(function () {
        $('#gridVideoz1').attr("src", nowPlaying1 + '&autoplay=1')
    }, function () {
        $('#gridVideoz1').attr("src", nowPlaying1)
    });
    $('#gridVideoz2').hover(function () {
        $('#gridVideoz2').attr("src", nowPlaying2 + '&autoplay=1')
    }, function () {
        $('#gridVideoz2').attr("src", nowPlaying2)
    });
    $('#gridVideoz3').hover(function () {
        $('#gridVideoz3').attr("src", nowPlaying3 + '&autoplay=1')
    }, function () {
        $('#gridVideoz3').attr("src", nowPlaying3)
    });
    $('#gridVideoz4').hover(function () {
        $('#gridVideoz4').attr("src", nowPlaying4 + '&autoplay=1')
    }, function () {
        $('#gridVideoz4').attr("src", nowPlaying4)
    });
    $('#gridVideoz5').hover(function () {
        $('#gridVideoz5').attr("src", nowPlaying5 + '&autoplay=1')
    }, function () {
        $('#gridVideoz5').attr("src", nowPlaying5)
    });
    $('#gridVideoz6').hover(function () {
        $('#gridVideoz6').attr("src", nowPlaying6 + '&autoplay=1')
    }, function () {
        $('#gridVideoz6').attr("src", nowPlaying6)
    });
    $('#gridVideoz7').hover(function () {
        $('#gridVideoz7').attr("src", nowPlaying7 + '&autoplay=1')
    }, function () {
        $('#gridVideoz7').attr("src", nowPlaying7)
    });
});
