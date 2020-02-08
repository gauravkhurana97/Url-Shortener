$(function () {
    $('#submit').click(function () {
        var url = $('#url').val();
        $.post('/api/v1/shorten', {
            url: url
        }, function (data) {
            $('#shortcode').html("Short URL: " + '<a style="color:white" target="_blank" href="/' + data + '">' + window.location.href + data + '</a>');
        })
    })
})