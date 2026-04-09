<?php
// 1. Correo de destino en TecnoWeb
$destino = "contacto@marchi.cl"; 

// 2. Asunto del correo
$asunto = "Nuevo mensaje desde la pagina web";

// 3. Captura los datos del formulario
$nombre = $_POST['nombre'];
$email = $_POST['email'];
$mensaje = $_POST['mensaje'];

// 4. Arma el cuerpo del mensaje
$contenido = "Nombre del cliente: " . $nombre . "\n";
$contenido .= "Correo del cliente: " . $email . "\n";
$contenido .= "Mensaje: \n" . $mensaje . "\n";

// 5. Función que envía el correo internamente
mail($destino, $asunto, $contenido);

// 6. Redirige a la página principal tras enviar
header("Location: index.html");
?>