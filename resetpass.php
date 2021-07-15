<!-- Sweet Alert -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/7.0.3/sweetalert2.all.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/7.0.3/sweetalert2.all.min.js"></script>
<link  href="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/7.0.3/sweetalert2.css" rel="stylesheet" type="text/css">

<?php
require_once './php/class.user.php';
$user = new USER();

if (empty($_GET['id']) && empty($_GET['code'])) {
    $user->redirect('index.php');
}

if (isset($_GET['id']) && isset($_GET['code'])) {
    $id = base64_decode($_GET['id']);
    $code = $_GET['code'];

    $stmt = $user->runQuery("SELECT * FROM usuarios WHERE cod_usuario=:uid AND tokenCode=:token");
    $stmt->execute(array(":uid" => $id, ":token" => $code));
    $rows = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($stmt->rowCount() == 1) {
        if (isset($_POST['btn-reset-pass'])) {
            $pass = $_POST['pass'];
            $cpass = $_POST['confirm-pass'];

            if ($cpass !== $pass) {

                echo "<script type='text/javascript'>";
                echo "setTimeout(function () { swal({";
                echo "title: 'ERROR',";
                echo "text: 'Sus contraseñas no coinciden',";
                echo "type: 'error',";
                echo "showCancelButton: false,";
                echo "confirmButtonText: 'Corregir'";
                echo "}).then(function () {";
                echo "});";
                echo "});</script>";
            } else {
                $password = $cpass;
                $stmt = $user->runQuery("UPDATE usuarios SET password=:upass WHERE cod_usuario=:uid");
                $stmt->execute(array(":upass" => $password, ":uid" => $rows['cod_usuario']));

                $stmt = $user->runQuery("UPDATE usuarios SET tokenCode= '' WHERE tokenCode=:token");
                $stmt->execute(array(":token" => $code));

                echo "<script type='text/javascript'>";
                echo "setTimeout(function () { swal({";
                echo "title: 'GRACIAS',";
                echo "text: 'Su contraseña fue actualizada correctamente',";
                echo "type: 'success',";
                echo "showCancelButton: false,";
                echo "confirmButtonText: 'OK'";
                echo "}).then(function () {";
                echo "location.href = 'index.php';";
                echo "});";
                echo "});</script>";
            }
        }
    } else {
        echo "<script type='text/javascript'>";
        echo "setTimeout(function () { swal({";
        echo "title: 'ERROR',";
        echo "text: 'TOKEN no válido',";
        echo "type: 'error',";
        echo "showCancelButton: false,";
        echo "confirmButtonText: 'OK'";
        echo "}).then(function () {";
        echo "location.href = 'index.php';";
        echo "});";
        echo "});</script>";
    }
}
?>

<!DOCTYPE html>
<html lang="en">

    <head>
        
        <meta charset="utf-8">
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
                                    <strong>Hola !  <?php echo $rows['nombre'] ?></strong> <br>Recuerde <strong>NO</strong> ingresar signos especiales y con una longitud máxima de 20 caracateres. 
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
                                        <input type="password" class="form-username form-control" placeholder="Nueva Contraseña" name="pass" required pattern="[A-Za-z0-9_-]{1,20}"/>
                                    </div>
                                    <div class="form-group">
                                        <input type="password" class="form-username form-control" placeholder="Confirmar Nueva Contraseña" name="confirm-pass" required pattern="[A-Za-z0-9_-]{1,20}"/>
                                    </div>
                                    <button class="btn btn-large btn-primary" type="submit" name="btn-reset-pass">Restablecer Contraseña <i class="glyphicon glyphicon-lock"></i></button>
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

</html>