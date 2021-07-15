<?php
session_start();

if (isset($_SESSION['usuario'])) {

    if ($_SESSION['tipo_usuario'] != "usuario" && $_SESSION['tipo_usuario'] != "administrador") {
        session_destroy();
        header('Location: index.php');
    }
} else {
    session_destroy();
    header('Location: index.php');
}
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        

        <meta charset="UTF-8" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        <title>Nipro Ecuador - SEPRON</title>

        <!-- Google fonts -->
        <link href='http://fonts.googleapis.com/css?family=Roboto:400,300,700' rel='stylesheet' type='text/css'>

        <!-- font awesome -->
        <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">

        <!-- bootstrap -->
        <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css" />

        <!-- animate.css -->
        <link rel="stylesheet" href="assets/animate/animate.css" />
        <link rel="stylesheet" href="assets/animate/set.css" />

        <!-- gallery -->
        <link rel="stylesheet" href="assets/gallery/blueimp-gallery.min.css">

        <!-- favicon -->
        <link rel="shortcut icon" href="images/images.png" type="image/x-icon">
        <link rel="icon" href="images/favicon.ico" type="image/x-icon">


        <link rel="stylesheet" href="assets/style.css">
        
        <!-- Sweet Alert -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/7.0.3/sweetalert2.all.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/7.0.3/sweetalert2.all.min.js"></script>
        <link  href="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/7.0.3/sweetalert2.css" rel="stylesheet" type="text/css">

    </head>

    <body>
        <div class="topbar animated fadeInLeftBig"></div>

        <!-- Header Starts -->
        <div class="navbar-wrapper">
            <div class="container">

                <div class="navbar navbar-default navbar-fixed-top" role="navigation" id="top-nav">
                    <div class="container">
                        <div class="navbar-header">
                            <!-- Logo Starts -->
                            <?php
                            if ($_SESSION['tipo_usuario'] == 'administrador') {
                              echo "<a class=navbar-brand href= 'administrador.php'><img src='images/nipro2.png' width='180' height='50'></a>";
                            } else
                            if ($_SESSION['tipo_usuario'] == 'usuario') {
                              echo "<a class=navbar-brand href= 'usuario.php'><img src='images/nipro2.png' width='180' height='50'></a>";
                            }
                            ?>
                            <!-- #Logo Ends -->

                            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
                                <span class="sr-only">Toggle navigation</span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </button>
                        </div>

                        <!-- Nav Starts -->
                        <div class="navbar-collapse  collapse">
                            <ul class="nav navbar-nav navbar-right">
                                <li><a href=""><strong>Bienvenido <?php echo $_SESSION['usuario'] ?></strong></a></li>
                                <?php
                                if ($_SESSION['tipo_usuario'] == 'administrador') {
                                    echo "<li><a href='indicadores.php'>Indicadores</a></li>";
                                    echo "<li><a href='reporte.php'>Reportes</a></li>";
                                    echo "<li><a href='salir.php'>Cerrar Sessión</a></li>";
                                } else
                                if ($_SESSION['tipo_usuario'] == 'usuario') {
                                    echo "<li><a href='salir.php'>Cerrar Sessión</a></li>";
                                }
                                ?>
                            </ul>
                        </div>
                        <!-- #Nav Ends -->

                    </div>
                </div>

            </div>
        </div>
        <!-- #Header Starts -->



        <!-- Cirlce Starts -->
        <div id="about"  class="container spacer about">
            <br>
            <h3 class=text-center  wowload fadeInUp>Cambiar Clave</h3>

            <div class="process">
                <ul class="row text-center list-inline  wowload bounceInUp">
                    <li>
                        <span><i class="glyphicon glyphicon-lock"></i><b>Contraseña</b></span>
                    </li>
                    <li>
                        <span><i class="glyphicon glyphicon-user"></i><b>Usuario</b></span>
                    </li>
                    <li>
                        <span><i class="glyphicon glyphicon-refresh"></i><b>Actualizar</b></span>
                    </li>        

                </ul>
            </div>
            <br>
            <br>
            <div class="col-md-6 col-md-offset-3">
                <div class="form-bottom">
                    <br>
                    <form role="form" method="post" class="login-form wowload bounceInUp" id="clave">
                        <div class="form-group">
                            <input type="text" value="<?php echo $_SESSION['nickname'] ?>" class="form-username form-control" id="nombre_usuario" readonly="readonly" />
                        </div>
                        <div class="form-group">
                            <input type="password" placeholder="Clave Actual" class="form-username form-control" required pattern="[A-Za-z0-9_-]{1,20}" id="c_actual" />
                        </div>
                        <div class="form-group">
                            <input type="password" placeholder="Clave Nueva" class="form-username form-control" required pattern="[A-Za-z0-9_-]{1,20}" id="c_nueva"/>
                        </div>
                        <div class="form-group">
                            <input type="password" placeholder="Repetir Clave Nueva" class="form-username form-control" required  pattern="[A-Za-z0-9_-]{1,20}" id="c_nueva_2"/>
                        </div>
                        <br>
                        <div class="col-lg-12 text-center">
                            <button type="submit" class="wowload bounceInUp btn btn-primary" >Cambiar Clave</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- #Cirlce Ends -->

    <!-- Footer Starts -->
    <div class="footer text-center spacer">
        <p class="wowload flipInX"><a href="#"><i class="fa fa-facebook fa-2x"></i></a> <a href="#"><i class="fa fa-instagram fa-2x"></i></a> <a href="#"><i class="fa fa-twitter fa-2x"></i></a> <a href="#"><i class="fa fa-flickr fa-2x"></i></a> </p>
        Desarrollado por: Departamento TIC Ecuador. Todos los derechos reservados.
    </div>
    <!-- # Footer Ends -->
    <a href="#about" class="gototop "><i class="fa fa-angle-up  fa-3x"></i></a>

    <!-- The Bootstrap Image Gallery lightbox, should be a child element of the document body -->
    <div id="blueimp-gallery" class="blueimp-gallery blueimp-gallery-controls">
        <!-- The container for the modal slides -->
        <div class="slides"></div>
        <!-- Controls for the borderless lightbox -->
        <h3 class="title">Title</h3>
        <a class="prev">‹</a>
        <a class="next">›</a>
        <a class="close">×</a>
        <!-- The modal dialog, which will be used to wrap the lightbox content -->    
    </div>



    <!-- jquery -->
    <script src="assets/jquery.js"></script>

    <!-- wow script -->
    <script src="assets/wow/wow.min.js"></script>


    <!-- boostrap -->
    <script src="assets/bootstrap/js/bootstrap.js" type="text/javascript" ></script>

    <!-- jquery mobile -->
    <script src="assets/mobile/touchSwipe.min.js"></script>
    <script src="assets/respond/respond.js"></script>

    <!-- gallery -->
    <script src="assets/gallery/jquery.blueimp-gallery.min.js"></script>

    <!-- custom script -->
    <script src="assets/script.js"></script>

    <script src="js/index.js" type="text/javascript"></script>

</body>
</html>
