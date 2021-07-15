<?php
session_start();
if (isset($_SESSION['usuario'])) {
    
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
        <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon">
        <link rel="icon" href="images/images.png" type="image/x-icon">


        <link rel="stylesheet" href="assets/style.css">

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
                                    echo "<li><a href='cambiar_clave.php' >Cambiar Clave</a></li>";
                                    echo "<li><a href='salir.php'>Cerrar Sessión</a></li>";
                                } else
                                if ($_SESSION['tipo_usuario'] == 'usuario') {
                                    echo "<li><a href='indicadores.php'>Indicadores</a></li>";
                                    echo "<li><a href='cambiar_clave.php' >Cambiar Clave</a></li>";
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


        <div id="partners" class="container spacer ">

            <div id="info_titulo"></div>

            <div class="clearfix">
                <div class="col-sm-12">
                    <div id="carousel-testimonials" class="carousel slide testimonails  wowload fadeInRight" data-ride="carousel">
                        <div class="carousel-inner">  
                            <div class="item active animated bounceInRight row">
                                <div id="carrusel1"></div>
                            </div>
                            <div class="item  animated bounceInRight row">
                                <div id="carrusel2"></div>
                            </div>
                            <div class="item  animated bounceInRight row">
                                <div id="carrusel3"></div>
                            </div>
                        </div>

                        <!-- Indicators -->
                        <ol class="carousel-indicators">
                            <li data-target="#carousel-testimonials" data-slide-to="0" class="active"></li>
                            <li data-target="#carousel-testimonials" data-slide-to="1"></li>
                            <li data-target="#carousel-testimonials" data-slide-to="2"></li>
                        </ol>
                        <!-- Indicators -->
                    </div>
                </div>
            </div>

            <div class="container">
                <br>
                <a href="javascript:history.back()"><img src="images/atras.png" height="30" width="80" alt="Atrás"></a>
                <div class="row sidebar-page">
                    <div class="col-md-9 page-content">
                        <br>
                        <div class="container">
                            <ul class="nav nav-tabs">
                                <li><a data-toggle="tab" href="#menu1"><strong>Información General</strong></a></li>
                                <li><a data-toggle="tab" href="#menu4"><strong>Forecast</strong></a></li>
                                <li><a data-toggle="tab" href="#menu2"><strong>Importación</strong></a></li>
                                <li><a data-toggle="tab" href="#menu3"><strong>Stock & Expiración</strong></a></li>
                                <li><a data-toggle="tab" href="#menu5"><strong>Ventas USD</strong></a></li>
                                <li><a data-toggle="tab" href="#menu6"><strong>Ventas Uni</strong></a></li>
                                <li><a data-toggle="tab" href="#menu7"><strong>Ventas Territorio</strong></a></li>
                                <li class="dropdown">
                                    <a class="dropdown-toggle" data-toggle="dropdown" href="#"><strong>Ventas vs Presupuesto</strong><span class="caret"></span></a>
                                    <ul class="dropdown-menu">
                                        <li><a href="#sierra" data-toggle="tab">Sierra</a></li>
                                        <li><a href="#costa" data-toggle="tab">Costa</a></li>
                                        <li><a href="#austro" data-toggle="tab">Austro</a></li>
                                        <li><a href="#manabi" data-toggle="tab">Manabi</a></li>
                                        <li><a href="#general" data-toggle="tab">General</a></li>
                                    </ul><!-- end of dropdown menu -->
                                </li>
                            </ul>

                            <div class="tab-content">

                                <div id="menu1" class="tab-pane fade in active">
                                    <br>
                                    <div id="info_general"></div>
                                </div>

                                <div id="menu2" class="tab-pane fade">
                                    <br>
                                    <div id="importacion"></div>
                                </div>

                                <div id="menu3" class="tab-pane fade">
                                    <br>
                                    <div id="stock"></div>
                                </div>

                                <div id="menu4" class="tab-pane fade">
                                    <br>
                                    <div id="forecast"></div>
                                </div>

                                <div id="menu5" class="tab-pane fade">
                                    <br>
                                    <div id="ventas" class="container"></div>
                                    <br>
                                    <br>
                                    <div id="container" style="min-width: 310px; height: 400px; margin: 0 auto"></div>
                                </div>

                                <div id="menu6" class="tab-pane fade">
                                    <br>
                                    <div id="ventas_cant" class="container"></div>
                                    <br>
                                    <br>
                                    <div id="container_cant" style="min-width: 310px; height: 400px; margin: 0 auto"></div>
                                </div>

                                <div id="menu7" class="tab-pane fade">
                                    <br>
                                    <div id="ventas_terri" class="container"></div>
                                    <br>
                                    <br>
                                    <div id="container_terri" style="min-width: 310px; height: 400px; margin: 0 auto"></div>
                                </div>

                                <div class="tab-pane" id="sierra">
                                    <br>
                                    <div id="ventas_sierra" class="container"></div>
                                    <br>
                                    <br>
                                    <div id="container_sierra" style="min-width: 310px; height: 400px; margin: 0 auto"></div>
                                </div>

                                <div class="tab-pane" id="costa">
                                    <br>
                                    <div id="ventas_costa" class="container"></div>
                                    <br>
                                    <br>
                                    <div id="container_costa" style="min-width: 310px; height: 400px; margin: 0 auto"></div>
                                </div>

                                <div class="tab-pane" id="austro">
                                    <br>
                                    <div id="ventas_austro" class="container"></div>
                                    <br>
                                    <br>
                                    <div id="container_austro" style="min-width: 310px; height: 400px; margin: 0 auto"></div>
                                </div>

                                <div class="tab-pane" id="manabi">
                                    <br>
                                    <div id="ventas_manabi" class="container"></div>
                                    <br>
                                    <br>
                                    <div id="container_manabi" style="min-width: 310px; height: 400px; margin: 0 auto"></div>
                                </div>

                                <div class="tab-pane" id="general">
                                    <br>
                                    <div id="ventas_sierra2" class="container"></div>
                                    <div id="ventas_costa2" class="container"></div>
                                    <div id="ventas_austro2" class="container"></div>
                                    <div id="ventas_manabi2" class="container"></div>
                                    <br>
                                    <br>
                                </div>


                            </div>

                        </div>
                    </div>


                </div>

            </div>
        </div>
    </div>



</div>


<!-- Footer Starts -->
<div class="footer text-center spacer">
    <p class="wowload flipInX"><a href="#"><i class="fa fa-facebook fa-2x"></i></a> <a href="#"><i class="fa fa-instagram fa-2x"></i></a> <a href="#"><i class="fa fa-twitter fa-2x"></i></a> <a href="#"><i class="fa fa-flickr fa-2x"></i></a> </p>
    Desarrollado por: Departamento TIC Ecuador. Todos los derechos reservados.
</div>
<!-- # Footer Ends -->
<a href="#partners" class="gototop "><i class="fa fa-angle-up  fa-3x"></i></a>





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


<!-- graficos -->
<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>

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
