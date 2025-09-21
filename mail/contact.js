$(function () {
    $("#contactForm").submit(function (e) {
        e.preventDefault(); // evita que se recargue la página

        var name = $("#name").val();
        var email = $("#email").val();
        var subject = $("#subject").val();
        var message = $("#message").val();
        var $btn = $("#sendMessageButton");
        $btn.prop("disabled", true);

        $.ajax({
            url: "contact.php", // archivo PHP que procesará el envío
            type: "POST",
            data: {name: name, email: email, subject: subject, message: message},
            success: function(response) {
                $("#form-message").html('<div class="alert alert-success">' + response + '</div>');
                $("#contactForm")[0].reset();
            },
            error: function(xhr) {
                $("#form-message").html('<div class="alert alert-danger">Error al enviar el mensaje. Intenta de nuevo.</div>');
            },
            complete: function() {
                $btn.prop("disabled", false);
            }
        });
    });
});
