<!-- Sweet Alert -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/7.0.3/sweetalert2.all.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/7.0.3/sweetalert2.all.min.js"></script>
<link  href="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/7.0.3/sweetalert2.css" rel="stylesheet" type="text/css">

<?php
require_once './php/class.user.php';
$user = new USER();

if (isset($_POST['btn-submit'])) {

    $email = $_POST['email'];

    $stmt = $user->runQuery("SELECT cod_usuario FROM usuarios WHERE email=:email LIMIT 1");
    $stmt->execute(array(":email" => $email));
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($stmt->rowCount() == 1) {
        $id = base64_encode($row['cod_usuario']);
        $code = md5(uniqid(rand()));

        $stmt = $user->runQuery("UPDATE usuarios SET tokenCode=:token WHERE email=:email");
        $stmt->execute(array(":token" => $code, "email" => $email));

        $message = "
				   Hola , $email
				   <br /><br />
				   Por favor no contestar a este correo, dar clic en el siguiente enlace para contiunar el proceso
				   <br /><br />
                                   Tome en cuenta que este enlace solo servira una sola vez, despues de eso tendra que repetir el proceso.
				   <br /><br />
				   <a href='http://sepron.ca-ne.com/resetpass.php?id=$id&code=$code'>Restablecer Ahora</a>
                                   <br /><br />
                                   O puede copiar el siguiente link y pegarlo en su navegador web preferido
				   <br /><br />
                                   http://sepron.ca-ne.com/resetpass.php?id=$id&code=$code
                                   <br /><br />
				   Departamento TIC Nipro Ecuador
                                   <br /><br />
				   Gracias...!
				   ";
        $subject = "Restablecer Clave";

        $user->send_mail($email, $message, $subject);


        echo "<script type='text/javascript'>";
        echo "setTimeout(function () { swal({";
        echo "title: 'GRACIAS',";
        echo "text: 'Te acabamos de enviar un correo electrónico con las instruciones para restablecer tu contraseña, si el correo no llega en 5 minutos vuelva a repetir el proceso',";
        echo "type: 'success',";
        echo "showCancelButton: false,";
        echo "confirmButtonText: 'OK'";
        echo "}).then(function () {";
        echo "location.href = 'index.php';";
        echo "});";
        echo "});</script>";
    } else {

        echo "<script type='text/javascript'>";
        echo "setTimeout(function () { swal({";
        echo "title: 'ERROR',";
        echo "text: 'Lo sentimos, su correo no existe en nuestras bases de datos',";
        echo "type: 'error',";
        echo "showCancelButton: false,";
        echo "confirmButtonText: 'Corregir'";
        echo "}).then(function () {";
        echo "});";
        echo "});</script>";
    }
}
?>
<!DOCTYPE html>
<html lang="en">

    <head><meta http-equiv="Content-Type" content="text/html; charset=gb18030">
        

        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Nipro Ecuador - SEPRON</title>

        <!-- CSS -->
        <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Roboto:400,100,300,500">
        <link rel="stylesheet" href="assets_login/bootstrap/css/bootstrap.min.css">
        <link rel="stylesheet" href="assets_login/font-awesome/css/font-awesome.min.css">

        <link rel="stylesheet" href="assets_login/css/form-elements.css">
        <link rel="stylesheet" href="assets_login/css/style.css">


        <!-- Favicon and touch icons -->
        <link rel="shortcut icon" href="assets_login/ico/images.png">
        <link rel="apple-touch-icon-precomposed" sizes="144x144" href="assets_login/ico/apple-touch-icon-144-precomposed.png">
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="assets_login/ico/apple-touch-icon-114-precomposed.png">
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="assets_login/ico/apple-touch-icon-72-precomposed.png">
        <link rel="apple-touch-icon-precomposed" href="assets_login/ico/apple-touch-icon-57-precomposed.png">

       

    </head>

    <body>

        <!-- Top content -->
        <div class="top-content">

            <div class="inner-bg">
                <div class="container">
                    <div class="row">
                        <a href="index.php"><img src="images/nipro2.png" width="300" height="80" /></a>
                    </div>
                    <div class="row">
                        <div class="col-sm-6 col-sm-offset-3 form-box">
                            <div class="form-top">
                                <div class="form-top-left">
                                    <h3>Productos Nuevos</h3>
                                    <p>Ingrese el correo electrónico corporativo</p>
                                </div>
                                <div class="form-top-right">
                                    <i class="fa fa-key"></i>
                                </div>
                            </div>
                            <div class="form-bottom">
                                <form class="form-signin" method="post">
                                    <?php
                                    if (isset($msg)) {
                                        echo $msg;
                                    }
                                    ?>
                                    <div class="form-group">
                                        <input type="email" name="email" placeholder="Email" class="form-username form-control" required/>
                                    </div>
                                    <button class="btn btn-info" type="submit" name="btn-submit">Recuperar Contraseña <i class="glyphicon glyphicon-lock"></i></button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>


        <!-- Javascript -->
        <script src="js/jquery-3.1.1.min.js"></script>
        <script src="js/main.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="assets_login/js/jquery-1.11.1.min.js"></script>
        <script src="assets_login/bootstrap/js/bootstrap.min.js"></script>
        <script src="assets_login/js/jquery.backstretch.min.js"></script>
        <script src="assets_login/js/scripts.js"></script>



    </body>