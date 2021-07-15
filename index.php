<?php
session_start();

if (isset($_SESSION['usuario'])) {

    if ($_SESSION['tipo_usuario'] == "usuario") {
        header('Location: usuario.php');
    }
}
?>

<!DOCTYPE html>
<html lang="en">

    <head><meta http-equiv="Content-Type" content="text/html; charset=euc-jp">
        
        
    

        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Nipro</title>

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

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
        <script src="//code.jquery.com/jquery-1.12.0.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>  
        <script>
            $(document).ready(function ()
            {
                $("#mostrarmodal").modal("show");
            });
        </script>
        
        <!-- Sweet Alert -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/7.0.3/sweetalert2.all.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/7.0.3/sweetalert2.all.min.js"></script>
        <link  href="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/7.0.3/sweetalert2.css" rel="stylesheet" type="text/css">

    </head>

    <body>

        <!-- Modal -->
        <div class="modal fade" id="mostrarmodal" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-body">
                        <center><img class="img-responsive img-rounded" width="900" src="images/modal/sepron.jpg"/></center>
                    </div>
                </div>
            </div>
        </div>

        <!-- Top content -->
        <div class="top-content">

            <div class="inner-bg">
                <div class="container">
                    <div class="row">
                        <img src="images/nipro2.png" width="300" height="80" />
                    </div>
                    <div class="row">
                        <div class="col-sm-6 col-sm-offset-3 form-box">
                            <div class="form-top">
                                <div class="form-top-left">
                                    <h3>Seguimiento de Productos Nuevos Nipro Ecuador</h3>
                                    <p>Ingrese su usuario y contraseña</p>
                                </div>
                                <div class="form-top-right">
                                    <i class="fa fa-key"></i>
                                </div>
                            </div>
                            <div class="form-bottom">
                                <form role="form" action="" method="post" class="login-form" id="formlg">
                                    <div class="form-group">
                                        <input type="text" name="usuariolg" placeholder="Usuario" class="form-username form-control" required pattern="[A-Za-z0-9_-]{1,20}" />
                                    </div>
                                    <div class="form-group">
                                        <input type="password" name="passlg" placeholder="Contraseña" class="form-password form-control" required pattern="[A-Za-z0-9_-]{1,20}" />
                                    </div>
                                    <div id="loading">
                                        <button type="submit" class="btn btn-info">Iniciar Sesión <i class="glyphicon glyphicon-user"></i></button>
                                    </div>
                                    <br>
                                     <div align=right>
                                    <a href="recuperar_contrasena.php">Olvidaste tu contraseña? </a>
                                    </div>
                                    
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