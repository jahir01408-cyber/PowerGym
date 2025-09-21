<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = strip_tags(trim($_POST["subject"]));
    $message = trim($_POST["message"]);

    if ( empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL) ) {
        http_response_code(400);
        echo "Por favor completa todos los campos correctamente.";
        exit;
    }

    $to = "jahir01408@gmail.com"; // tu correo
    $email_subject = "Nuevo mensaje de $name: $subject";
    $email_body = "Nombre: $name\nCorreo: $email\n\nMensaje:\n$message";
    $headers = "From: $name <$email>\r\n";

    if (mail($to, $email_subject, $email_body, $headers)) {
        http_response_code(200);
        echo "Tu mensaje ha sido enviado correctamente.";
    } else {
        http_response_code(500);
        echo "Error al enviar el mensaje, intenta más tarde.";
    }
} else {
    http_response_code(403);
    echo "Error, intenta de nuevo.";
}
?>
