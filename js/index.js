$(function () {
    $("#generar_excel").click(function () {

        var opcion_excel = $("#combo_excel").val();

        $.ajax({
            url: 'php/controlador.php',
            data: {opcion: 18, dato: opcion_excel},
            type: 'GET',
            dataType: 'json',
            error: function () {
                swal({
                    title: 'GRACIAS',
                    text: "Reporte Generado Correctamente",
                    type: 'success',
                    showCancelButton: false,
                    confirmButtonText: 'OK'
                }).then(function () {
                    document.location = "Reportes/Reporte.xlsx";
                })
            }
        });
    });
});

jQuery(document).on('submit', '#clave', function (event) {

    event.preventDefault();

    var nickname = $("#nombre_usuario").val();
    var c_actual = $("#c_actual").val();

    $.ajax({
        url: 'php/controlador.php',
        data: {opcion: 19, dato: nickname},
        type: 'GET',
        dataType: 'json',
        success: function (json) {

            if (json[0].password === c_actual) {
                cambiar_clave();
            } else
                swal(
                        'ERROR',
                        'La clave actual no es la correcta',
                        'error'
                        )
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema al cambiar su clave ' + status);
        },
    });


});

$(document).ready(function () {


    indicadores();
    MenuTours();
    id_sub_producto()
    informacion_general();
    importacion();
    stock();
    forecast();
    ventas();
    ventas_cant();
    ventas_terri();
    ventas_sierra();
    ventas_costa();
    ventas_austro();
    ventas_manabi();
    id_linea();
    fotos_productos();





});

function MenuTours() {
    $.ajax({
        url: 'php/controlador.php',
        data: {opcion: 1},
        type: 'GET',
        dataType: 'json',
        success: function (json) {

            lineas(json);

        },
        error: function (xhr, status) {
            alert('Hay Inconvenientes, vuelva a ejecutar menu tris' + status);
        },
        complete: function (xhr, status) {
            //alert('PeticiÃ³n realizada');
        }
    });
}


function lineas(data) {

    var MenuLineas = "";
    for (i = 0; i < data.length; i++) {

        MenuLineas += "<figure class='effect-oscar  wowload fadeInUp'>";
        MenuLineas += "<img src=images/portfolio/" + data[i].foto + ".jpg alt=img01/>";
        MenuLineas += "<figcaption><br><br>";
        MenuLineas += "<p><br><a href=lineas.php?linea=" + data[i].id_linea + "><strong>Ver Productos Nuevos</strong></a></p>";
        MenuLineas += "</figcaption>";
        MenuLineas += "</figure>";
    }
    $("#MenuLineas").html(MenuLineas);
    informacion();
}


function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function id_linea() {
    var id_linea = getUrlVars()["linea"];
    $.ajax({
        url: 'php/controlador.php',
        data: {opcion: 2, dato: id_linea},
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            fotos_productos(json);
        }
    });
}


function fotos_productos(data) {
    var titulo = "";
    var fotos_productos = "";
    var carpeta = "";

    var id_linea = getUrlVars()["linea"];
    if (id_linea == 1) {
        carpeta = "renal";
        titulo += "<h3 class=text-center  wowload fadeInUp>Productos Nuevos Renal</h3>";
    } else
    if (id_linea == 2) {
        carpeta = "hospitalaria";
        titulo += "<h3 class=text-center  wowload fadeInUp>Productos Nuevos Hospitalaria</h3>";
    } else
    if (id_linea == 3) {
        carpeta = "diagnostica";
        titulo += "<h3 class=text-center  wowload fadeInUp>Productos Nuevos Diagnóstica</h3>";
    } else
    if (id_linea == 4) {
        carpeta = "endovascular";
        titulo += "<h3 class=text-center  wowload fadeInUp>Productos Nuevos Endovascular</h3>";
    } else
    if (id_linea == 5) {
        carpeta = "diabetes";
        titulo += "<h3 class=text-center  wowload fadeInUp>Productos Nuevos Diabetes</h3>";
    } else
    if (id_linea == 6) {
        carpeta = "cardiopulmonar";
        titulo += "<h3 class=text-center  wowload fadeInUp>Productos Nuevos Cardiopulmonar</h3>";
    }

    for (i = 0; i < data.length; i++) {

        fotos_productos += "<div class= 'col-sm-3 col-xs-6'>";
        fotos_productos += "<br>";
        fotos_productos += "<figure class=effect-chico>";
        fotos_productos += "<img class=img-responsive src=images/productos_nuevos/" + carpeta + "/" + data[i].foto_producto + ".jpg />";
        fotos_productos += "<figcaption>";
        fotos_productos += "<p><b>" + data[i].nombre_producto + "</b>";
        fotos_productos += "<br>";
        fotos_productos += "<a href=sub_productos_nuevos.php?producto=" + data[i].id_producto + "&linea=" + data[i].id_linea + "><strong>Información</strong></a></p>  ";
        fotos_productos += "</figcaption>";
        fotos_productos += "</figure>";
        fotos_productos += "</div>";
    }

    $("#titulo").html(titulo);
    $("#fotos_productos").html(fotos_productos);
}

function id_sub_producto() {

    var sub_producto = getUrlVars()["producto"];

    $.ajax({
        url: 'php/controlador.php',
        data: {opcion: 14, dato: sub_producto},
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            sub_productos(json);
        }
    });
}


function sub_productos(data) {

    var id_linea2 = getUrlVars()["linea"];
    var carpeta2 = "";
    var titulo2 = "";
    var fotos_sub_productos = "";


    if (id_linea2 == 1) {
        carpeta2 = "renal";
        titulo2 += "<h3 class=text-center  wowload fadeInUp>Productos Nuevos Renal</h3>";
    } else
    if (id_linea2 == 2) {
        carpeta2 = "hospitalaria";
        titulo2 += "<h3 class=text-center  wowload fadeInUp>Productos Nuevos Hospitalaria</h3>";
    } else
    if (id_linea2 == 3) {
        carpeta2 = "diagnostica";
        titulo2 += "<h3 class=text-center  wowload fadeInUp>Productos Nuevos Diagnóstica</h3>";
    } else
    if (id_linea2 == 4) {
        carpeta2 = "endovascular";
        titulo2 += "<h3 class=text-center  wowload fadeInUp>Productos Nuevos Endovascular</h3>";
    } else
    if (id_linea2 == 5) {
        carpeta2 = "diabetes";
        titulo2 += "<h3 class=text-center  wowload fadeInUp>Productos Nuevos Diabetes</h3>";
    } else
    if (id_linea2 == 6) {
        carpeta2 = "cardiopulmonar";
        titulo2 += "<h3 class=text-center  wowload fadeInUp>Productos Nuevos Cardiopulmonar</h3>";
    }

    for (i = 0; i < data.length; i++) {

        fotos_sub_productos += "<div class= 'col-sm-3 col-xs-6'>";
        fotos_sub_productos += "<br>";
        fotos_sub_productos += "<figure class=effect-chico>";
        fotos_sub_productos += "<img class=img-responsive src=images/productos_nuevos/" + carpeta2 + "/" + data[i].id_producto + "/" + data[i].foto_producto + ".jpg />";
        fotos_sub_productos += "<figcaption>";
        fotos_sub_productos += "<p><b>" + data[i].nombre_producto + "</b>";
        fotos_sub_productos += "<br>";
        fotos_sub_productos += "<a href=informacion.php?producto=" + data[i].id_producto + "&sub_producto=" + data[i].id_sub_producto + "><strong>Ver mas</strong></a></p>  ";
        fotos_sub_productos += "</figcaption>";
        fotos_sub_productos += "</figure>";
        fotos_sub_productos += "</div>";
    }

    $("#titulo2").html(titulo2);
    $("#fotos_sub_productos").html(fotos_sub_productos);

}


function informacion_general() {

    var id_producto = getUrlVars()["producto"];
    var id_sub_producto = getUrlVars()["sub_producto"];

    $.ajax({
        url: 'php/controlador.php',
        data: {opcion: 3, dato: id_producto, dato2: id_sub_producto},
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            informacion_general_producto(json);
        }
    });
}

function informacion_general_producto(data) {

    var info_titulo = "";
    var carpeta = "";
    var info_general = "";
    var carrusel1 = "";
    var carrusel2 = "";
    var carrusel3 = "";
    for (i = 0; i < data.length; i++) {

        info_titulo += "<h3 class=text-center  wowload fadeInUp>" + data[i].nombre_producto + "</h3>";

        if (data[i].id_linea == 1) {
            carpeta = "renal";
        } else
        if (data[i].id_linea == 2) {
            carpeta = "hospitalaria";
        } else
        if (data[i].id_linea == 3) {
            carpeta = "diagnostica";
        } else
        if (data[i].id_linea == 4) {
            carpeta = "endovascular";
        } else
        if (data[i].id_linea == 5) {
            carpeta = "diabetes";
        } else
        if (data[i].id_linea == 6) {
            carpeta = "cardiopulmonar";
        }


        carrusel1 += " <img class='img-responsive' src=images/productos_nuevos/" + carpeta + "/" + data[i].id_producto + "/" + data[i].foto1 + ".jpg />";
        carrusel2 += " <img class='img-responsive' src=images/productos_nuevos/" + carpeta + "/" + data[i].id_producto + "/" + data[i].foto2 + ".jpg  />";
        carrusel3 += " <img class='img-responsive' src=images/productos_nuevos/" + carpeta + "/" + data[i].id_producto + "/" + data[i].foto3 + ".jpg />";


        info_general += "<div class=table-responsive>";
        info_general += "<table class=table>";
        info_general += "<thead>";
        info_general += "<tr class=info>";
        info_general += "<th style=text-align:center;>Nombre Producto</th>";
        info_general += "<th style=text-align:center;>Codigo Producto</th>";
        info_general += "<th style=text-align:center;>Divisón</th>";
        info_general += "<th style=text-align:center;>Responsable</th>";
        info_general += "</tr>";
        info_general += "</thead>";
        info_general += "<tbody>";
        info_general += "<tr class=warning>";
        info_general += "<td style=text-align:center;>" + data[i].nombre_producto + "</td>";
        info_general += "<td style=text-align:center;>" + data[i].codigo_producto + "</td>";
        info_general += "<td style=text-align:center;>" + data[i].division + "</td>";
        info_general += "<td style=text-align:center;>" + data[i].responsable + "</td>";
        info_general += "</tr>";
        info_general += "</tbody>";
        info_general += "</table>";
        info_general += "</div>";



    }

    $("#info_titulo").html(info_titulo);
    $("#carrusel1").html(carrusel1);
    $("#carrusel2").html(carrusel2);
    $("#carrusel3").html(carrusel3);
    $("#info_general").html(info_general);
}

function importacion() {

    var id_producto = getUrlVars()["producto"];
    var id_sub_producto = getUrlVars()["sub_producto"];

    $.ajax({
        url: 'php/controlador.php',
        data: {opcion: 4, dato: id_producto, dato2: id_sub_producto},
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            importacion_producto(json);
        }
    });
}

function importacion_producto(data) {

    var importacion = "";
    for (i = 0; i < data.length; i++) {


        importacion += "<div class=table-responsive>";
        importacion += "<table class=table>";
        importacion += "<thead>";
        importacion += "<tr class=info>";
        importacion += "<th style=text-align:center;>Registro Sanitario</th>";
        importacion += "<th style=text-align:center;>Lote</th>";
        importacion += "<th style=text-align:center;>PO</th>";
        importacion += "<th style=text-align:center;>Fecha de pedio PO</th>";
        importacion += "<th style=text-align:center;>Número de Factura</th>";
        importacion += "<th style=text-align:center;>ECU</th>";
        importacion += "<th style=text-align:center;>Fecha Embarcación</th>";
        importacion += "<th style=text-align:center;>Fecha Ingreso</th>";
        importacion += "<th style=text-align:center;>Tiempo de Importación</th>";
        importacion += "</tr>";
        importacion += "</thead>";
        importacion += "<tbody>";
        importacion += "<tr class=warning>";
        importacion += "<td style=text-align:center;>" + data[i].registro_sanitario + "</td>";
        importacion += "<td style=text-align:center;>" + data[i].lote + "</td>";
        importacion += "<td style=text-align:center;>" + data[i].po + "</td>";
        importacion += "<td style=text-align:center;>" + data[i].fecha_po + "</td>";
        importacion += "<td style=text-align:center;>" + data[i].factura + "</td>";
        importacion += "<td style=text-align:center;>" + data[i].ecu + "</td>";
        importacion += "<td style=text-align:center;>" + data[i].fecha_embarcacion + "</td>";
        importacion += "<td style=text-align:center;>" + data[i].fecha_ingreso + "</td>";
        importacion += "<td style=text-align:center;>" + data[i].tiempo_importacion + "</td>";
        importacion += "</tr>";
        importacion += "</tbody>";
        importacion += "</table>";
        importacion += "</div>";

    }

    $("#importacion").html(importacion);
}

function stock() {

    var id_producto = getUrlVars()["producto"];
    var id_sub_producto = getUrlVars()["sub_producto"];

    $.ajax({
        url: 'php/controlador.php',
        data: {opcion: 5, dato: id_producto, dato2: id_sub_producto},
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            stock_producto(json);
        }
    });
}

function stock_producto(data) {

    var stock = "";
    for (i = 0; i < data.length; i++) {

        stock += "<div class=table-responsive>";
        stock += "<table class=table>";
        stock += "<thead>";
        stock += "<tr class=info>";
        stock += "<th style=text-align:center;>Cantidad en Bodega</th>";
        stock += "<th style=text-align:center;>Cantidad Reservada</th>";
        stock += "<th style=text-align:center;>Cantidad Disponible</th>";
        stock += "<th style=text-align:center;>Cantidad en Orden de Compra</th>";
        stock += "<th style=text-align:center;>Caducar en el mes</th>";
        stock += "<th style=text-align:center;>Caducar 3 meses</th>";
        stock += "<th style=text-align:center;>Caducar 6 meses</th>";
        stock += "<th style=text-align:center;>Caducar 9 meses</th>";
        stock += "<th style=text-align:center;>Caducar 12 meses</th>";
        stock += "</tr>";
        stock += "</thead>";
        stock += "<tbody>";
        stock += "<tr class=warning>";
        stock += "<td style=text-align:center;>" + data[i].cantidad_bodega + "</td>";
        stock += "<td style=text-align:center;>" + data[i].cantidad_reservada + "</td>";
        stock += "<td style=text-align:center;>" + data[i].cantidad_disponible + "</td>";
        stock += "<td style=text-align:center;>" + data[i].cantidad_orden_compra + "</td>";
        stock += "<td style=text-align:center;>" + data[i].caduca_mes + "</td>";
        stock += "<td style=text-align:center;>" + data[i].caduca_3_meses + "</td>";
        stock += "<td style=text-align:center;>" + data[i].caduca_6_meses + "</td>";
        stock += "<td style=text-align:center;>" + data[i].caduca_9_meses + "</td>";
        stock += "<td style=text-align:center;>" + data[i].caduca_12_meses + "</td>";
        stock += "</tr>";
        stock += "</tbody>";
        stock += "</table>";
        stock += "</div>";
    }

    $("#stock").html(stock);
}

function forecast() {

    var id_producto = getUrlVars()["producto"];
    var id_sub_producto = getUrlVars()["sub_producto"];

    $.ajax({
        url: 'php/controlador.php',
        data: {opcion: 6, dato: id_producto, dato2: id_sub_producto},
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            forecast_producto(json);
        }
    });
}

function forecast_producto(data) {

    var forecast = "";
    for (i = 0; i < data.length; i++) {

        forecast += "<div class=table-responsive>";
        forecast += "<table class=table>";
        forecast += "<thead>";
        forecast += "<tr class=info>";
        forecast += "<th style=text-align:center;>Pronostico de Ventas Anual en Unidades</th>";
        forecast += "<th style=text-align:center;>Pronostico de Ventas Mensual en Unidades</th>";
        forecast += "<th style=text-align:center;>Pronostico de Ventas Anual USD</th>";
        forecast += "<th style=text-align:center;>Pronostico en Ventas Mensual USD</th>";
        forecast += "<th style=text-align:center;>Rentabilidad %</th>";
        forecast += "</tr>";
        forecast += "</thead>";
        forecast += "<tbody>";
        forecast += "<tr class=warning>";
        forecast += "<td style=text-align:center;>" + data[i].anual_cant + "</td>";
        forecast += "<td style=text-align:center;>" + data[i].mensual_cant + "</td>";
        forecast += "<td style=text-align:center;>" + data[i].anual_usd + " USD</td>";
        forecast += "<td style=text-align:center;>" + data[i].mensual_usd + " USD</td>";
        forecast += "<td style=text-align:center;>" + data[i].rentabilidad + " %</td>";
        forecast += "</tr>";
        forecast += "</tbody>";
        forecast += "</table>";
        forecast += "</div>";
    }

    $("#forecast").html(forecast);
}

function ventas() {

    var id_producto = getUrlVars()["producto"];
    var id_sub_producto = getUrlVars()["sub_producto"];

    $.ajax({
        url: 'php/controlador.php',
        data: {opcion: 7, dato: id_producto, dato2: id_sub_producto},
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            ventas_producto(json);
        }
    });
}

function ventas_producto(data) {

    var ventas = "";
    var color = "";
    var color2 = "";
    var color3 = "";
    var color4 = "";
    var color5 = "";
    var color6 = "";
    var color7 = "";
    var color8 = "";
    var color9 = "";
    var color10 = "";
    var color11 = "";
    var color12 = "";
    var color13 = "";

    var a1 = parseInt(data[0].enero);
    var a2 = parseInt(data[0].febrero);
    var a3 = parseInt(data[0].marzo);
    var a4 = parseInt(data[0].abril);
    var a5 = parseInt(data[0].mayo);
    var a6 = parseInt(data[0].junio);
    var a7 = parseInt(data[0].julio);
    var a8 = parseInt(data[0].agosto);
    var a9 = parseInt(data[0].septiembre);
    var a10 = parseInt(data[0].octubre);
    var a11 = parseInt(data[0].noviembre);
    var a12 = parseInt(data[0].diciembre);

//     revisar en fin de año
    var hoy = new Date();
//    var mm = hoy.getMonth();
    mm = 12;

    if (mm == 1) {
        var total = a1;
    } else
    if (mm == 2) {
        var total = a1 + a2;
    } else
    if (mm == 3) {
        var total = a1 + a2 + a3;
    } else
    if (mm == 4) {
        var total = a1 + a2 + a3 + a4;
    } else
    if (mm == 5) {
        var total = a1 + a2 + a3 + a4 + a5;
    } else
    if (mm == 6) {
        var total = a1 + a2 + a3 + a4 + a5 + a6;
    } else
    if (mm == 7) {
        var total = a1 + a2 + a3 + a4 + a5 + a6 + a7;
    } else
    if (mm == 8) {
        var total = a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8;
    } else
    if (mm == 9) {
        var total = a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8 + a9;
    } else
    if (mm == 10) {
        var total = a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8 + a9 + a10;
    } else
    if (mm == 11) {
        var total = a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8 + a9 + a10 + a11;
    } else
    if (mm == 12) {
        var total = a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8 + a9 + a10 + a11 + a12;
    }


    var b1 = parseInt(data[1].enero);
    var b2 = parseInt(data[1].febrero);
    var b3 = parseInt(data[1].marzo);
    var b4 = parseInt(data[1].abril);
    var b5 = parseInt(data[1].mayo);
    var b6 = parseInt(data[1].junio);
    var b7 = parseInt(data[1].julio);
    var b8 = parseInt(data[1].agosto);
    var b9 = parseInt(data[1].septiembre);
    var b10 = parseInt(data[1].octubre);
    var b11 = parseInt(data[1].noviembre);
    var b12 = parseInt(data[1].diciembre);

    if (mm == 1) {
        var total2 = b1;
    } else
    if (mm == 2) {
        var total2 = b1 + b2;
    } else
    if (mm == 3) {
        var total2 = b1 + b2 + b3;
    } else
    if (mm == 4) {
        var total2 = b1 + b2 + b3 + b4;
    } else
    if (mm == 5) {
        var total2 = b1 + b2 + b3 + b4 + b5;
    } else
    if (mm == 6) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6;
    } else
    if (mm == 7) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6 + b7;
    } else
    if (mm == 8) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6 + b7 + b8;
    } else
    if (mm == 9) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6 + b7 + b8 + b9;
    } else
    if (mm == 10) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6 + b7 + b8 + b9 + b10;
    } else
    if (mm == 11) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6 + b7 + b8 + b9 + b10 + b11;
    } else
    if (mm == 12) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6 + b7 + b8 + b9 + b10 + b11 + b12;
    }

    var id_producto = getUrlVars()["producto"];
    var id_sub_producto = getUrlVars()["sub_producto"];

    $.ajax({
        url: 'php/controlador.php',
        data: {opcion: 17, dato: id_producto, dato2: id_sub_producto, dato3: total, dato4: total2},
        type: 'GET',
        success: function () {
//            alert("se actualizo");
        }

    });

    var enero = (parseInt(data[1].enero) * 100) / parseInt(data[0].enero);
    var febrero = (parseInt(data[1].febrero) * 100) / parseInt(data[0].febrero);
    var marzo = (parseInt(data[1].marzo) * 100) / parseInt(data[0].marzo);
    var abril = (parseInt(data[1].abril) * 100) / parseInt(data[0].abril);
    var mayo = (parseInt(data[1].mayo) * 100) / parseInt(data[0].mayo);
    var junio = (parseInt(data[1].junio) * 100) / parseInt(data[0].junio);
    var julio = (parseInt(data[1].julio) * 100) / parseInt(data[0].julio);
    var agosto = (parseInt(data[1].agosto) * 100) / parseInt(data[0].agosto);
    var septiembre = (parseInt(data[1].septiembre) * 100) / parseInt(data[0].septiembre);
    var octubre = (parseInt(data[1].octubre) * 100) / parseInt(data[0].octubre);
    var noviembre = (parseInt(data[1].noviembre) * 100) / parseInt(data[0].noviembre);
    var diciembre = (parseInt(data[1].diciembre) * 100) / parseInt(data[0].diciembre);
    var total3 = (parseInt(total2) * 100) / parseInt(total);

    if (isNaN(enero) == true || isFinite(enero) == false) {
        color = "FF8A8A";
        enero = 0;
    } else
    if (enero < 0) {
        color = "0B0B61";
    } else
    if (enero >= 0 && enero <= 70) {
        color = "FF8A8A";
    } else
    if (enero > 70 && enero <= 99) {
        color = "FFFF84";
    } else
    if (enero > 99) {
        color = "89FC63";
    }

    if (isNaN(febrero) == true || isFinite(febrero) == false) {
        color2 = "FF8A8A";
        febrero = 0;
    } else
    if (febrero < 0) {
        color2 = "0B0B61";
    } else
    if (febrero >= 0 && febrero <= 70) {
        color2 = "FF8A8A";
    } else
    if (febrero > 70 && febrero <= 99) {
        color2 = "FFFF84";
    } else
    if (febrero > 99) {
        color2 = "89FC63";
    }

    if (isNaN(marzo) == true || isFinite(marzo) == false) {
        color3 = "FF8A8A";
        marzo = 0;
    } else
    if (isNaN(marzo) == true) {
        color3 = "white";
    } else
    if (marzo < 0) {
        color3 = "0B0B61";
    } else
    if (marzo >= 0 && marzo <= 70) {
        color3 = "FF8A8A";
    } else
    if (marzo > 70 && marzo <= 99) {
        color3 = "FFFF84";
    } else
    if (marzo > 99) {
        color3 = "89FC63";
    }

    if (isNaN(abril) == true || isFinite(abril) == false) {
        color4 = "FF8A8A";
        abril = 0;
    } else
    if (abril < 0) {
        color4 = "0B0B61";
    } else
    if (abril >= 0 && abril <= 70) {
        color4 = "FF8A8A";
    } else
    if (abril > 70 && abril <= 99) {
        color4 = "FFFF84";
    } else
    if (abril > 99) {
        color4 = "89FC63";
    }

    if (isNaN(mayo) == true || isFinite(mayo) == false) {
        color5 = "FF8A8A";
        mayo = 0;
    } else
    if (mayo < 0) {
        color5 = "0B0B61";
    } else
    if (mayo >= 0 && mayo <= 70) {
        color5 = "FF8A8A";
    } else
    if (mayo > 70 && mayo <= 99) {
        color5 = "FFFF84";
    } else
    if (mayo > 99) {
        color5 = "89FC63";
    }

    if (isNaN(junio) == true || isFinite(junio) == false) {
        color6 = "FF8A8A";
        junio = 0;
    } else
    if (junio < 0) {
        color6 = "0B0B61";
    } else
    if (junio >= 0 && junio <= 70) {
        color6 = "FF8A8A";
    } else
    if (junio > 70 && junio <= 99) {
        color6 = "FFFF84";
    } else
    if (junio > 99) {
        color6 = "89FC63";
    }

    if (isNaN(julio) == true || isFinite(julio) == false) {
        color7 = "FF8A8A";
        julio = 0;
    } else
    if (julio < 0) {
        color7 = "0B0B61";
    } else
    if (julio >= 0 && julio <= 70) {
        color7 = "FF8A8A";
    } else
    if (julio > 70 && julio <= 99) {
        color7 = "FFFF84";
    } else
    if (julio > 99) {
        color7 = "89FC63";
    }

    if (isNaN(agosto) == true || isFinite(agosto) == false) {
        color8 = "FF8A8A";
        agosto = 0;
    } else
    if (agosto < 0) {
        color8 = "0B0B61";
    } else
    if (agosto >= 0 && agosto <= 70) {
        color8 = "FF8A8A";
    } else
    if (agosto > 70 && agosto <= 99) {
        color8 = "FFFF84";
    } else
    if (agosto > 99) {
        color8 = "89FC63";
    }

    if (isNaN(septiembre) == true || isFinite(septiembre) == false) {
        color9 = "FF8A8A";
        septiembre = 0;
    } else
    if (septiembre < 0) {
        color9 = "0B0B61";
    } else
    if (septiembre >= 0 && septiembre <= 70) {
        color9 = "FF8A8A";
    } else
    if (septiembre > 70 && septiembre <= 99) {
        color9 = "FFFF84";
    } else
    if (septiembre > 99) {
        color9 = "89FC63";
    }

    if (isNaN(octubre) == true || isFinite(octubre) == false) {
        color10 = "FF8A8A";
        octubre = 0;
    } else
    if (octubre < 0) {
        color10 = "0B0B61";
    } else
    if (octubre >= 0 && octubre <= 70) {
        color10 = "FF8A8A";
    } else
    if (octubre > 70 && octubre <= 99) {
        color10 = "FFFF84";
    } else
    if (octubre > 99) {
        color10 = "89FC63";
    }

    if (isNaN(noviembre) == true || isFinite(noviembre) == false) {
        color11 = "FF8A8A";
        noviembre = 0;
    } else
    if (noviembre < 0) {
        color11 = "0B0B61";
    } else
    if (noviembre >= 0 && noviembre <= 70) {
        color11 = "FF8A8A";
    } else
    if (noviembre > 70 && noviembre <= 99) {
        color11 = "FFFF84";
    } else
    if (noviembre > 99) {
        color11 = "89FC63";
    }

    if (isNaN(diciembre) == true || isFinite(diciembre) == false) {
        color12 = "FF8A8A";
        diciembre = 0;
    } else
    if (diciembre < 0) {
        color12 = "0B0B61";
    } else
    if (diciembre >= 0 && diciembre <= 70) {
        color12 = "FF8A8A";
    } else
    if (diciembre > 70 && diciembre <= 99) {
        color12 = "FFFF84";
    } else
    if (diciembre > 99) {
        color12 = "89FC63";
    }

    if (isNaN(total3) == true || isFinite(total3) == false) {
        color13 = "FF8A8A";
        total3 = 0;
    } else
    if (total3 >= 0 && total3 <= 70) {
        color13 = "FF8A8A";
    } else
    if (total3 > 70 && total3 <= 99) {
        color13 = "FFFF84";
    } else
    if (total3 > 99) {
        color13 = "89FC63";
    }

    ventas += "<div class=table-responsive>";
    ventas += "<table class=table>";
    ventas += "<thead>";
    ventas += "<tr class=info>";
    ventas += "<th></th>";
    ventas += "<th style=text-align:center;>Enero</th>";
    ventas += "<th style=text-align:center;>Febrero</th>";
    ventas += "<th style=text-align:center;>Marzo</th>";
    ventas += "<th style=text-align:center;>Abril</th>";
    ventas += "<th style=text-align:center;>Mayo</th>";
    ventas += "<th style=text-align:center;>Junio</th>";
    ventas += "<th style=text-align:center;>Julio</th>";
    ventas += "<th style=text-align:center;>Agosto</th>";
    ventas += "<th style=text-align:center;>Septiembre</th>";
    ventas += "<th style=text-align:center;>Octubre</th>";
    ventas += "<th style=text-align:center;>Noviembre</th>";
    ventas += "<th style=text-align:center;>Diciembre</th>";
    ventas += "<th style=text-align:center;>TOTAL</th>";
    ventas += "</tr>";
    ventas += "</thead>";
    ventas += "<tbody>";
    ventas += "<tr class=warning>";
    ventas += "<th style=text-align:center;>Presupuesto ventas USD</th>";
    ventas += "<td style=text-align:center;>" + data[0].enero + "</td>";
    ventas += "<td style=text-align:center;>" + data[0].febrero + "</td>";
    ventas += "<td style=text-align:center;>" + data[0].marzo + "</td>";
    ventas += "<td style=text-align:center;>" + data[0].abril + "</td>";
    ventas += "<td style=text-align:center;>" + data[0].mayo + "</td>";
    ventas += "<td style=text-align:center;>" + data[0].junio + "</td>";
    ventas += "<td style=text-align:center;>" + data[0].julio + "</td>";
    ventas += "<td style=text-align:center;>" + data[0].agosto + "</td>";
    ventas += "<td style=text-align:center;>" + data[0].septiembre + "</td>";
    ventas += "<td style=text-align:center;>" + data[0].octubre + "</td>";
    ventas += "<td style=text-align:center;>" + data[0].noviembre + "</td>";
    ventas += "<td style=text-align:center;>" + data[0].diciembre + "</td>";
    ventas += "<th style=text-align:center;>" + total + "</th>";
    ventas += "</tr>";
    ventas += "<tr class=warning>";
    ventas += "<th style=text-align:center;>Ventas por mes USD</th>";
    ventas += "<td style=text-align:center;>" + data[1].enero + "</td>";
    ventas += "<td style=text-align:center;>" + data[1].febrero + "</td>";
    ventas += "<td style=text-align:center;>" + data[1].marzo + "</td>";
    ventas += "<td style=text-align:center;>" + data[1].abril + "</td>";
    ventas += "<td style=text-align:center;>" + data[1].mayo + "</td>";
    ventas += "<td style=text-align:center;>" + data[1].junio + "</td>";
    ventas += "<td style=text-align:center;>" + data[1].julio + "</td>";
    ventas += "<td style=text-align:center;>" + data[1].agosto + "</td>";
    ventas += "<td style=text-align:center;>" + data[1].septiembre + "</td>";
    ventas += "<td style=text-align:center;>" + data[1].octubre + "</td>";
    ventas += "<td style=text-align:center;>" + data[1].noviembre + "</td>";
    ventas += "<td style=text-align:center;>" + data[1].diciembre + "</td>";
    ventas += "<th style=text-align:center;>" + total2 + "</th>";
    ventas += "</tr>";
    ventas += "<tr class=>";
    ventas += "<th style=text-align:center;>Alcance (%)</th>";
    ventas += "<th bgcolor=" + color + " style=text-align:center;>" + Math.round(enero) + "%</th>";
    ventas += "<th bgcolor=" + color2 + " style=text-align:center;>" + Math.round(febrero) + "%</th>";
    ventas += "<th bgcolor=" + color3 + " style=text-align:center;>" + Math.round(marzo) + "%</th>";
    ventas += "<th bgcolor=" + color4 + " style=text-align:center;>" + Math.round(abril) + "%</th>";
    ventas += "<th bgcolor=" + color5 + " style=text-align:center;>" + Math.round(mayo) + "%</th>";
    ventas += "<th bgcolor=" + color6 + " style=text-align:center;>" + Math.round(junio) + "%</th>";
    ventas += "<th bgcolor=" + color7 + " style=text-align:center;>" + Math.round(julio) + "%</th>";
    ventas += "<th bgcolor=" + color8 + " style=text-align:center;>" + Math.round(agosto) + "%</th>";
    ventas += "<th bgcolor=" + color9 + " style=text-align:center;>" + Math.round(septiembre) + "%</th>";
    ventas += "<th bgcolor=" + color10 + " style=text-align:center;>" + Math.round(octubre) + "%</th>";
    ventas += "<th bgcolor=" + color11 + " style=text-align:center;>" + Math.round(noviembre) + "%</th>";
    ventas += "<th bgcolor=" + color12 + " style=text-align:center;>" + Math.round(diciembre) + "%</th>";
    ventas += "<th bgcolor=" + color13 + " style=text-align:center;>" + Math.round(total3) + "%</th>";
    ventas += "</tr>";
    ventas += "</tbody>";
    ventas += "</table>";
    ventas += "</div>";

    $("#ventas").html(ventas);



    Highcharts.chart('container', {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Ventas Durante el Año'
        },
        subtitle: {
            text: 'Nipro Medical Corporation'
        },
        xAxis: {
            categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        },
        yAxis: {
            title: {
                text: 'Dolares'
            },
            labels: {
                formatter: function () {
                    return this.value + '';
                }
            }
        },
        tooltip: {
            crosshairs: true,
            shared: true
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            }
        },
        series: [{
                name: 'Pronostico en ventas mensual USD',
                marker: {
                    symbol: 'square'
                },
                data: [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12]

            }, {
                name: 'Ventas por mes USD',
                marker: {
                    symbol: 'diamond'
                },
                data: [b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12]
            }]
    });

}

function ventas_cant() {

    var id_producto = getUrlVars()["producto"];
    var id_sub_producto = getUrlVars()["sub_producto"];

    $.ajax({
        url: 'php/controlador.php',
        data: {opcion: 8, dato: id_producto, dato2: id_sub_producto},
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            ventas_cant_producto(json);
        }
    });
}

function ventas_cant_producto(data) {

    var ventas_cant = "";
    var color = "";
    var color2 = "";
    var color3 = "";
    var color4 = "";
    var color5 = "";
    var color6 = "";
    var color7 = "";
    var color8 = "";
    var color9 = "";
    var color10 = "";
    var color11 = "";
    var color12 = "";
    var color13 = "";

    var a1 = parseInt(data[0].enero);
    var a2 = parseInt(data[0].febrero);
    var a3 = parseInt(data[0].marzo);
    var a4 = parseInt(data[0].abril);
    var a5 = parseInt(data[0].mayo);
    var a6 = parseInt(data[0].junio);
    var a7 = parseInt(data[0].julio);
    var a8 = parseInt(data[0].agosto);
    var a9 = parseInt(data[0].septiembre);
    var a10 = parseInt(data[0].octubre);
    var a11 = parseInt(data[0].noviembre);
    var a12 = parseInt(data[0].diciembre);

//    revisar fin de año
    var hoy = new Date();
//    var mm = hoy.getMonth();
    mm = 12;

    if (mm == 1) {
        var total = a1;
    } else
    if (mm == 2) {
        var total = a1 + a2;
    } else
    if (mm == 3) {
        var total = a1 + a2 + a3;
    } else
    if (mm == 4) {
        var total = a1 + a2 + a3 + a4;
    } else
    if (mm == 5) {
        var total = a1 + a2 + a3 + a4 + a5;
    } else
    if (mm == 6) {
        var total = a1 + a2 + a3 + a4 + a5 + a6;
    } else
    if (mm == 7) {
        var total = a1 + a2 + a3 + a4 + a5 + a6 + a7;
    } else
    if (mm == 8) {
        var total = a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8;
    } else
    if (mm == 9) {
        var total = a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8 + a9;
    } else
    if (mm == 10) {
        var total = a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8 + a9 + a10;
    } else
    if (mm == 11) {
        var total = a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8 + a9 + a10 + a11;
    } else
    if (mm == 12) {
        var total = a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8 + a9 + a10 + a11 + a12;
    }


    var b1 = parseInt(data[1].enero);
    var b2 = parseInt(data[1].febrero);
    var b3 = parseInt(data[1].marzo);
    var b4 = parseInt(data[1].abril);
    var b5 = parseInt(data[1].mayo);
    var b6 = parseInt(data[1].junio);
    var b7 = parseInt(data[1].julio);
    var b8 = parseInt(data[1].agosto);
    var b9 = parseInt(data[1].septiembre);
    var b10 = parseInt(data[1].octubre);
    var b11 = parseInt(data[1].noviembre);
    var b12 = parseInt(data[1].diciembre);

    if (mm == 1) {
        var total2 = b1;
    } else
    if (mm == 2) {
        var total2 = b1 + b2;
    } else
    if (mm == 3) {
        var total2 = b1 + b2 + b3;
    } else
    if (mm == 4) {
        var total2 = b1 + b2 + b3 + b4;
    } else
    if (mm == 5) {
        var total2 = b1 + b2 + b3 + b4 + b5;
    } else
    if (mm == 6) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6;
    } else
    if (mm == 7) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6 + b7;
    } else
    if (mm == 8) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6 + b7 + b8;
    } else
    if (mm == 9) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6 + b7 + b8 + b9;
    } else
    if (mm == 10) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6 + b7 + b8 + b9 + b10;
    } else
    if (mm == 11) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6 + b7 + b8 + b9 + b10 + b11;
    } else
    if (mm == 12) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6 + b7 + b8 + b9 + b10 + b11 + b12;
    }

    var enero = (parseInt(data[1].enero) * 100) / parseInt(data[0].enero);
    var febrero = (parseInt(data[1].febrero) * 100) / parseInt(data[0].febrero);
    var marzo = (parseInt(data[1].marzo) * 100) / parseInt(data[0].marzo);
    var abril = (parseInt(data[1].abril) * 100) / parseInt(data[0].abril);
    var mayo = (parseInt(data[1].mayo) * 100) / parseInt(data[0].mayo);
    var junio = (parseInt(data[1].junio) * 100) / parseInt(data[0].junio);
    var julio = (parseInt(data[1].julio) * 100) / parseInt(data[0].julio);
    var agosto = (parseInt(data[1].agosto) * 100) / parseInt(data[0].agosto);
    var septiembre = (parseInt(data[1].septiembre) * 100) / parseInt(data[0].septiembre);
    var octubre = (parseInt(data[1].octubre) * 100) / parseInt(data[0].octubre);
    var noviembre = (parseInt(data[1].noviembre) * 100) / parseInt(data[0].noviembre);
    var diciembre = (parseInt(data[1].diciembre) * 100) / parseInt(data[0].diciembre);
    var total3 = (parseInt(total2) * 100) / parseInt(total);

    if (isNaN(enero) == true || isFinite(enero) == false) {
        color = "FF8A8A";
        enero = 0;
    } else
    if (enero < 0) {
        color = "0B0B61";
    } else
    if (enero >= 0 && enero <= 70) {
        color = "FF8A8A";
    } else
    if (enero > 70 && enero <= 99) {
        color = "FFFF84";
    } else
    if (enero > 99) {
        color = "89FC63";
    }

    if (isNaN(febrero) == true || isFinite(febrero) == false) {
        color2 = "FF8A8A";
        febrero = 0;
    } else
    if (febrero < 0) {
        color2 = "0B0B61";
    } else
    if (febrero >= 0 && febrero <= 70) {
        color2 = "FF8A8A";
    } else
    if (febrero > 70 && febrero <= 99) {
        color2 = "FFFF84";
    } else
    if (febrero > 99) {
        color2 = "89FC63";
    }

    if (isNaN(marzo) == true || isFinite(marzo) == false) {
        color3 = "FF8A8A";
        marzo = 0;
    } else
    if (marzo < 0) {
        color3 = "0B0B61";
    } else
    if (marzo >= 0 && marzo <= 70) {
        color3 = "FF8A8A";
    } else
    if (marzo > 70 && marzo <= 99) {
        color3 = "FFFF84";
    } else
    if (marzo > 99) {
        color3 = "89FC63";
    }

    if (isNaN(abril) == true || isFinite(abril) == false) {
        color4 = "FF8A8A";
        abril = 0;
    } else
    if (abril < 0) {
        color4 = "0B0B61";
    } else
    if (abril >= 0 && abril <= 70) {
        color4 = "FF8A8A";
    } else
    if (abril > 70 && abril <= 99) {
        color4 = "FFFF84";
    } else
    if (abril > 99) {
        color4 = "89FC63";
    }

    if (isNaN(mayo) == true || isFinite(mayo) == false) {
        color5 = "FF8A8A";
        mayo = 0;
    } else
    if (mayo < 0) {
        color5 = "0B0B61";
    } else
    if (mayo >= 0 && mayo <= 70) {
        color5 = "FF8A8A";
    } else
    if (mayo > 70 && mayo <= 99) {
        color5 = "FFFF84";
    } else
    if (mayo > 99) {
        color5 = "89FC63";
    }

    if (isNaN(junio) == true || isFinite(junio) == false) {
        color6 = "FF8A8A";
        junio = 0;
    } else
    if (junio < 0) {
        color6 = "0B0B61";
    } else
    if (junio >= 0 && junio <= 70) {
        color6 = "FF8A8A";
    } else
    if (junio > 70 && junio <= 99) {
        color6 = "FFFF84";
    } else
    if (junio > 99) {
        color6 = "89FC63";
    }

    if (isNaN(julio) == true || isFinite(julio) == false) {
        color7 = "FF8A8A";
        julio = 0;
    } else
    if (julio < 0) {
        color7 = "0B0B61";
    } else
    if (julio >= 0 && julio <= 70) {
        color7 = "FF8A8A";
    } else
    if (julio > 70 && julio <= 99) {
        color7 = "FFFF84";
    } else
    if (julio > 99) {
        color7 = "89FC63";
    }

    if (isNaN(agosto) == true || isFinite(agosto) == false) {
        color8 = "FF8A8A";
        agosto = 0;
    } else
    if (agosto < 0) {
        color8 = "0B0B61";
    } else
    if (agosto >= 0 && agosto <= 70) {
        color8 = "FF8A8A";
    } else
    if (agosto > 70 && agosto <= 99) {
        color8 = "FFFF84";
    } else
    if (agosto > 99) {
        color8 = "89FC63";
    }

    if (isNaN(septiembre) == true || isFinite(septiembre) == false) {
        color9 = "FF8A8A";
        septiembre = 0;
    } else
    if (septiembre < 0) {
        color9 = "0B0B61";
    } else
    if (septiembre >= 0 && septiembre <= 70) {
        color9 = "FF8A8A";
    } else
    if (septiembre > 70 && septiembre <= 99) {
        color9 = "FFFF84";
    } else
    if (septiembre > 99) {
        color9 = "89FC63";
    }

    if (isNaN(octubre) == true || isFinite(octubre) == false) {
        color10 = "FF8A8A";
        octubre = 0;
    } else
    if (octubre < 0) {
        color10 = "0B0B61";
    } else
    if (octubre >= 0 && octubre <= 70) {
        color10 = "FF8A8A";
    } else
    if (octubre > 70 && octubre <= 99) {
        color10 = "FFFF84";
    } else
    if (octubre > 99) {
        color10 = "89FC63";
    }

    if (isNaN(noviembre) == true || isFinite(noviembre) == false) {
        color11 = "FF8A8A";
        noviembre = 0;
    } else
    if (noviembre < 0) {
        color11 = "0B0B61";
    } else
    if (noviembre >= 0 && noviembre <= 70) {
        color11 = "FF8A8A";
    } else
    if (noviembre > 70 && noviembre <= 99) {
        color11 = "FFFF84";
    } else
    if (noviembre > 99) {
        color11 = "89FC63";
    }

    if (isNaN(diciembre) == true || isFinite(diciembre) == false) {
        color12 = "FF8A8A";
        diciembre = 0;
    } else
    if (diciembre < 0) {
        color12 = "0B0B61";
    } else
    if (diciembre >= 0 && diciembre <= 70) {
        color12 = "FF8A8A";
    } else
    if (diciembre > 70 && diciembre <= 99) {
        color12 = "FFFF84";
    } else
    if (diciembre > 99) {
        color12 = "89FC63";
    }

    if (isNaN(total3) == true || isFinite(total3) == false) {
        color13 = "FF8A8A";
        total3 = 0;
    } else
    if (total3 >= 0 && total3 <= 70) {
        color13 = "FF8A8A";
    } else
    if (total3 > 70 && total3 <= 99) {
        color13 = "FFFF84";
    } else
    if (total3 > 99) {
        color13 = "89FC63";
    }

    ventas_cant += "<div class=table-responsive>";
    ventas_cant += "<table class=table>";
    ventas_cant += "<thead>";
    ventas_cant += "<tr class=info>";
    ventas_cant += "<th></th>";
    ventas_cant += "<th style=text-align:center;>Enero</th>";
    ventas_cant += "<th style=text-align:center;>Febrero</th>";
    ventas_cant += "<th style=text-align:center;>Marzo</th>";
    ventas_cant += "<th style=text-align:center;>Abril</th>";
    ventas_cant += "<th style=text-align:center;>Mayo</th>";
    ventas_cant += "<th style=text-align:center;>Junio</th>";
    ventas_cant += "<th style=text-align:center;>Julio</th>";
    ventas_cant += "<th style=text-align:center;>Agosto</th>";
    ventas_cant += "<th style=text-align:center;>Septiembre</th>";
    ventas_cant += "<th style=text-align:center;>Octubre</th>";
    ventas_cant += "<th style=text-align:center;>Noviembre</th>";
    ventas_cant += "<th style=text-align:center;>Diciembre</th>";
    ventas_cant += "<th style=text-align:center;>TOTAL</th>";
    ventas_cant += "</tr>";
    ventas_cant += "</thead>";
    ventas_cant += "<tbody>";
    ventas_cant += "<tr class=warning>";
    ventas_cant += "<th style=text-align:center;>Pronostico ventas cant</th>";
    ventas_cant += "<td style=text-align:center;>" + data[0].enero + "</td>";
    ventas_cant += "<td style=text-align:center;>" + data[0].febrero + "</td>";
    ventas_cant += "<td style=text-align:center;>" + data[0].marzo + "</td>";
    ventas_cant += "<td style=text-align:center;>" + data[0].abril + "</td>";
    ventas_cant += "<td style=text-align:center;>" + data[0].mayo + "</td>";
    ventas_cant += "<td style=text-align:center;>" + data[0].junio + "</td>";
    ventas_cant += "<td style=text-align:center;>" + data[0].julio + "</td>";
    ventas_cant += "<td style=text-align:center;>" + data[0].agosto + "</td>";
    ventas_cant += "<td style=text-align:center;>" + data[0].septiembre + "</td>";
    ventas_cant += "<td style=text-align:center;>" + data[0].octubre + "</td>";
    ventas_cant += "<td style=text-align:center;>" + data[0].noviembre + "</td>";
    ventas_cant += "<td style=text-align:center;>" + data[0].diciembre + "</td>";
    ventas_cant += "<th style=text-align:center;>" + total + "</th>";
    ventas_cant += "</tr>";
    ventas_cant += "<tr class=warning>";
    ventas_cant += "<th style=text-align:center;>Ventas por mes cant</th>";
    ventas_cant += "<td style=text-align:center;>" + data[1].enero + "</td>";
    ventas_cant += "<td style=text-align:center;>" + data[1].febrero + "</td>";
    ventas_cant += "<td style=text-align:center;>" + data[1].marzo + "</td>";
    ventas_cant += "<td style=text-align:center;>" + data[1].abril + "</td>";
    ventas_cant += "<td style=text-align:center;>" + data[1].mayo + "</td>";
    ventas_cant += "<td style=text-align:center;>" + data[1].junio + "</td>";
    ventas_cant += "<td style=text-align:center;>" + data[1].julio + "</td>";
    ventas_cant += "<td style=text-align:center;>" + data[1].agosto + "</td>";
    ventas_cant += "<td style=text-align:center;>" + data[1].septiembre + "</td>";
    ventas_cant += "<td style=text-align:center;>" + data[1].octubre + "</td>";
    ventas_cant += "<td style=text-align:center;>" + data[1].noviembre + "</td>";
    ventas_cant += "<td style=text-align:center;>" + data[1].diciembre + "</td>";
    ventas_cant += "<th style=text-align:center;>" + total2 + "</th>";
    ventas_cant += "</tr>";
    ventas_cant += "<tr class=>";
    ventas_cant += "<th style=text-align:center;>Alcance (%)</th>";
    ventas_cant += "<th bgcolor=" + color + " style=text-align:center;>" + Math.round(enero) + "%</th>";
    ventas_cant += "<th bgcolor=" + color2 + " style=text-align:center;>" + Math.round(febrero) + "%</th>";
    ventas_cant += "<th bgcolor=" + color3 + " style=text-align:center;>" + Math.round(marzo) + "%</th>";
    ventas_cant += "<th bgcolor=" + color4 + " style=text-align:center;>" + Math.round(abril) + "%</th>";
    ventas_cant += "<th bgcolor=" + color5 + " style=text-align:center;>" + Math.round(mayo) + "%</th>";
    ventas_cant += "<th bgcolor=" + color6 + " style=text-align:center;>" + Math.round(junio) + "%</th>";
    ventas_cant += "<th bgcolor=" + color7 + " style=text-align:center;>" + Math.round(julio) + "%</th>";
    ventas_cant += "<th bgcolor=" + color8 + " style=text-align:center;>" + Math.round(agosto) + "%</th>";
    ventas_cant += "<th bgcolor=" + color9 + " style=text-align:center;>" + Math.round(septiembre) + "%</th>";
    ventas_cant += "<th bgcolor=" + color10 + " style=text-align:center;>" + Math.round(octubre) + "%</th>";
    ventas_cant += "<th bgcolor=" + color11 + " style=text-align:center;>" + Math.round(noviembre) + "%</th>";
    ventas_cant += "<th bgcolor=" + color12 + " style=text-align:center;>" + Math.round(diciembre) + "%</th>";
    ventas_cant += "<th bgcolor=" + color13 + " style=text-align:center;>" + Math.round(total3) + "%</th>";
    ventas_cant += "</tr>";
    ventas_cant += "</tbody>";
    ventas_cant += "</table>";
    ventas_cant += "</div>";

    $("#ventas_cant").html(ventas_cant);

    Highcharts.chart('container_cant', {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Ventas Durante el Año'
        },
        subtitle: {
            text: 'Nipro Medical Corporation'
        },
        xAxis: {
            categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        },
        yAxis: {
            title: {
                text: 'Unidades'
            },
            labels: {
                formatter: function () {
                    return this.value + '';
                }
            }
        },
        tooltip: {
            crosshairs: true,
            shared: true
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            }
        },
        series: [{
                name: 'Pronostico en ventas mensual Unidades',
                marker: {
                    symbol: 'square'
                },
                data: [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12]

            }, {
                name: 'Ventas por mes Unidades',
                marker: {
                    symbol: 'diamond'
                },
                data: [b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12]
            }]
    });

}

function ventas_terri() {

    var id_producto = getUrlVars()["producto"];
    var id_sub_producto = getUrlVars()["sub_producto"];

    $.ajax({
        url: 'php/controlador.php',
        data: {opcion: 9, dato: id_producto, dato2: id_sub_producto},
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            ventas_terri_producto(json);
        }
    });
}

function ventas_terri_producto(data) {

    var ventas_terri = "";

    var a1 = parseInt(data[0].enero);
    var a2 = parseInt(data[0].febrero);
    var a3 = parseInt(data[0].marzo);
    var a4 = parseInt(data[0].abril);
    var a5 = parseInt(data[0].mayo);
    var a6 = parseInt(data[0].junio);
    var a7 = parseInt(data[0].julio);
    var a8 = parseInt(data[0].agosto);
    var a9 = parseInt(data[0].septiembre);
    var a10 = parseInt(data[0].octubre);
    var a11 = parseInt(data[0].noviembre);
    var a12 = parseInt(data[0].diciembre);

//     Solo por fin de año, después descomentar 
//    var hoy = new Date();
//    var mm = hoy.getMonth();
    var mm = 12;

    if (mm == 1) {
        var total = a1;
    } else
    if (mm == 2) {
        var total = a1 + a2;
    } else
    if (mm == 3) {
        var total = a1 + a2 + a3;
    } else
    if (mm == 4) {
        var total = a1 + a2 + a3 + a4;
    } else
    if (mm == 5) {
        var total = a1 + a2 + a3 + a4 + a5;
    } else
    if (mm == 6) {
        var total = a1 + a2 + a3 + a4 + a5 + a6;
    } else
    if (mm == 7) {
        var total = a1 + a2 + a3 + a4 + a5 + a6 + a7;
    } else
    if (mm == 8) {
        var total = a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8;
    } else
    if (mm == 9) {
        var total = a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8 + a9;
    } else
    if (mm == 10) {
        var total = a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8 + a9 + a10;
    } else
    if (mm == 11) {
        var total = a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8 + a9 + a10 + a11;
    } else
    if (mm == 12) {
        var total = a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8 + a9 + a10 + a11 + a12;
    }


    var b1 = parseInt(data[1].enero);
    var b2 = parseInt(data[1].febrero);
    var b3 = parseInt(data[1].marzo);
    var b4 = parseInt(data[1].abril);
    var b5 = parseInt(data[1].mayo);
    var b6 = parseInt(data[1].junio);
    var b7 = parseInt(data[1].julio);
    var b8 = parseInt(data[1].agosto);
    var b9 = parseInt(data[1].septiembre);
    var b10 = parseInt(data[1].octubre);
    var b11 = parseInt(data[1].noviembre);
    var b12 = parseInt(data[1].diciembre);

    if (mm == 1) {
        var total2 = b1;
    } else
    if (mm == 2) {
        var total2 = b1 + b2;
    } else
    if (mm == 3) {
        var total2 = b1 + b2 + b3;
    } else
    if (mm == 4) {
        var total2 = b1 + b2 + b3 + b4;
    } else
    if (mm == 5) {
        var total2 = b1 + b2 + b3 + b4 + b5;
    } else
    if (mm == 6) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6;
    } else
    if (mm == 7) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6 + b7;
    } else
    if (mm == 8) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6 + b7 + b8;
    } else
    if (mm == 9) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6 + b7 + b8 + b9;
    } else
    if (mm == 10) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6 + b7 + b8 + b9 + b10;
    } else
    if (mm == 11) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6 + b7 + b8 + b9 + b10 + b11;
    } else
    if (mm == 12) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6 + b7 + b8 + b9 + b10 + b11 + b12;
    }

    var c1 = parseInt(data[2].enero);
    var c2 = parseInt(data[2].febrero);
    var c3 = parseInt(data[2].marzo);
    var c4 = parseInt(data[2].abril);
    var c5 = parseInt(data[2].mayo);
    var c6 = parseInt(data[2].junio);
    var c7 = parseInt(data[2].julio);
    var c8 = parseInt(data[2].agosto);
    var c9 = parseInt(data[2].septiembre);
    var c10 = parseInt(data[2].octubre);
    var c11 = parseInt(data[2].noviembre);
    var c12 = parseInt(data[2].diciembre);

    if (mm == 1) {
        var total3 = c1;
    } else
    if (mm == 2) {
        var total3 = c1 + c2;
    } else
    if (mm == 3) {
        var total3 = c1 + c2 + c3;
    } else
    if (mm == 4) {
        var total3 = c1 + c2 + c3 + c4;
    } else
    if (mm == 5) {
        var total3 = c1 + c2 + c3 + c4 + c5;
    } else
    if (mm == 6) {
        var total3 = c1 + c2 + c3 + c4 + c5 + c6;
    } else
    if (mm == 7) {
        var total3 = c1 + c2 + c3 + c4 + c5 + c6 + c7;
    } else
    if (mm == 8) {
        var total3 = c1 + c2 + c3 + c4 + c5 + c6 + c7 + c8;
    } else
    if (mm == 9) {
        var total3 = c1 + c2 + c3 + c4 + c5 + c6 + c7 + c8 + c9;
    } else
    if (mm == 10) {
        var total3 = c1 + c2 + c3 + c4 + c5 + c6 + c7 + c8 + c9 + c10;
    } else
    if (mm == 11) {
        var total3 = c1 + c2 + c3 + c4 + c5 + c6 + c7 + c8 + c9 + c10 + c11;
    } else
    if (mm == 12) {
        var total3 = c1 + c2 + c3 + c4 + c5 + c6 + c7 + c8 + c9 + c10 + c11 + c12;
    }

    var d1 = parseInt(data[3].enero);
    var d2 = parseInt(data[3].febrero);
    var d3 = parseInt(data[3].marzo);
    var d4 = parseInt(data[3].abril);
    var d5 = parseInt(data[3].mayo);
    var d6 = parseInt(data[3].junio);
    var d7 = parseInt(data[3].julio);
    var d8 = parseInt(data[3].agosto);
    var d9 = parseInt(data[3].septiembre);
    var d10 = parseInt(data[3].octubre);
    var d11 = parseInt(data[3].noviembre);
    var d12 = parseInt(data[3].diciembre);

    if (mm == 1) {
        var total4 = d1;
    } else
    if (mm == 2) {
        var total4 = d1 + d2;
    } else
    if (mm == 3) {
        var total4 = d1 + d2 + d3;
    } else
    if (mm == 4) {
        var total4 = d1 + d2 + d3 + d4;
    } else
    if (mm == 5) {
        var total4 = d1 + d2 + d3 + d4 + d5;
    } else
    if (mm == 6) {
        var total4 = d1 + d2 + d3 + d4 + d5 + d6;
    } else
    if (mm == 7) {
        var total4 = d1 + d2 + d3 + d4 + d5 + d6 + d7;
    } else
    if (mm == 8) {
        var total4 = d1 + d2 + d3 + d4 + d5 + d6 + d7 + d8;
    } else
    if (mm == 9) {
        var total4 = d1 + d2 + d3 + d4 + d5 + d6 + d7 + d8 + d9;
    } else
    if (mm == 10) {
        var total4 = d1 + d2 + d3 + d4 + d5 + d6 + d7 + d8 + d9 + d10;
    } else
    if (mm == 11) {
        var total4 = d1 + d2 + d3 + d4 + d5 + d6 + d7 + d8 + d9 + d10 + d11;
    } else
    if (mm == 12) {
        var total4 = d1 + d2 + d3 + d4 + d5 + d6 + d7 + d8 + d9 + d10 + d11 + d12;
    }

    ventas_terri += "<div class=table-responsive>";
    ventas_terri += "<table class=table>";
    ventas_terri += "<thead>";
    ventas_terri += "<tr class=info>";
    ventas_terri += "<th></th>";
    ventas_terri += "<th style=text-align:center;>Enero</th>";
    ventas_terri += "<th style=text-align:center;>Febrero</th>";
    ventas_terri += "<th style=text-align:center;>Marzo</th>";
    ventas_terri += "<th style=text-align:center;>Abril</th>";
    ventas_terri += "<th style=text-align:center;>Mayo</th>";
    ventas_terri += "<th style=text-align:center;>Junio</th>";
    ventas_terri += "<th style=text-align:center;>Julio</th>";
    ventas_terri += "<th style=text-align:center;>Agosto</th>";
    ventas_terri += "<th style=text-align:center;>Septiembre</th>";
    ventas_terri += "<th style=text-align:center;>Octubre</th>";
    ventas_terri += "<th style=text-align:center;>Noviembre</th>";
    ventas_terri += "<th style=text-align:center;>Diciembre</th>";
    ventas_terri += "<th style=text-align:center;>TOTAL</th>";
    ventas_terri += "</tr>";
    ventas_terri += "</thead>";
    ventas_terri += "<tbody>";
    ventas_terri += "<tr class=warning>";
    ventas_terri += "<th style=text-align:center;>Sierra</th>";
    ventas_terri += "<td style=text-align:center;>" + data[0].enero + "</td>";
    ventas_terri += "<td style=text-align:center;>" + data[0].febrero + "</td>";
    ventas_terri += "<td style=text-align:center;>" + data[0].marzo + "</td>";
    ventas_terri += "<td style=text-align:center;>" + data[0].abril + "</td>";
    ventas_terri += "<td style=text-align:center;>" + data[0].mayo + "</td>";
    ventas_terri += "<td style=text-align:center;>" + data[0].junio + "</td>";
    ventas_terri += "<td style=text-align:center;>" + data[0].julio + "</td>";
    ventas_terri += "<td style=text-align:center;>" + data[0].agosto + "</td>";
    ventas_terri += "<td style=text-align:center;>" + data[0].septiembre + "</td>";
    ventas_terri += "<td style=text-align:center;>" + data[0].octubre + "</td>";
    ventas_terri += "<td style=text-align:center;>" + data[0].noviembre + "</td>";
    ventas_terri += "<td style=text-align:center;>" + data[0].diciembre + "</td>";
    ventas_terri += "<th style=text-align:center;>" + total + "</th>";
    ventas_terri += "</tr>";
    ventas_terri += "<tr class=warning>";
    ventas_terri += "<th style=text-align:center;>Costa</th>";
    ventas_terri += "<td style=text-align:center;>" + data[1].enero + "</td>";
    ventas_terri += "<td style=text-align:center;>" + data[1].febrero + "</td>";
    ventas_terri += "<td style=text-align:center;>" + data[1].marzo + "</td>";
    ventas_terri += "<td style=text-align:center;>" + data[1].abril + "</td>";
    ventas_terri += "<td style=text-align:center;>" + data[1].mayo + "</td>";
    ventas_terri += "<td style=text-align:center;>" + data[1].junio + "</td>";
    ventas_terri += "<td style=text-align:center;>" + data[1].julio + "</td>";
    ventas_terri += "<td style=text-align:center;>" + data[1].agosto + "</td>";
    ventas_terri += "<td style=text-align:center;>" + data[1].septiembre + "</td>";
    ventas_terri += "<td style=text-align:center;>" + data[1].octubre + "</td>";
    ventas_terri += "<td style=text-align:center;>" + data[1].noviembre + "</td>";
    ventas_terri += "<td style=text-align:center;>" + data[1].diciembre + "</td>";
    ventas_terri += "<th style=text-align:center;>" + total2 + "</th>";
    ventas_terri += "</tr>";
    ventas_terri += "<tr class=warning>";
    ventas_terri += "<th style=text-align:center;>Austro</th>";
    ventas_terri += "<td style=text-align:center;>" + data[2].enero + "</td>";
    ventas_terri += "<td style=text-align:center;>" + data[2].febrero + "</td>";
    ventas_terri += "<td style=text-align:center;>" + data[2].marzo + "</td>";
    ventas_terri += "<td style=text-align:center;>" + data[2].abril + "</td>";
    ventas_terri += "<td style=text-align:center;>" + data[2].mayo + "</td>";
    ventas_terri += "<td style=text-align:center;>" + data[2].junio + "</td>";
    ventas_terri += "<td style=text-align:center;>" + data[2].julio + "</td>";
    ventas_terri += "<td style=text-align:center;>" + data[2].agosto + "</td>";
    ventas_terri += "<td style=text-align:center;>" + data[2].septiembre + "</td>";
    ventas_terri += "<td style=text-align:center;>" + data[2].octubre + "</td>";
    ventas_terri += "<td style=text-align:center;>" + data[2].noviembre + "</td>";
    ventas_terri += "<td style=text-align:center;>" + data[2].diciembre + "</td>";
    ventas_terri += "<th style=text-align:center;>" + total3 + "</th>";
    ventas_terri += "</tr>";
    ventas_terri += "<tr class=warning>";
    ventas_terri += "<th style=text-align:center;>Manabi</th>";
    ventas_terri += "<td style=text-align:center;>" + data[3].enero + "</td>";
    ventas_terri += "<td style=text-align:center;>" + data[3].febrero + "</td>";
    ventas_terri += "<td style=text-align:center;>" + data[3].marzo + "</td>";
    ventas_terri += "<td style=text-align:center;>" + data[3].abril + "</td>";
    ventas_terri += "<td style=text-align:center;>" + data[3].mayo + "</td>";
    ventas_terri += "<td style=text-align:center;>" + data[3].junio + "</td>";
    ventas_terri += "<td style=text-align:center;>" + data[3].julio + "</td>";
    ventas_terri += "<td style=text-align:center;>" + data[3].agosto + "</td>";
    ventas_terri += "<td style=text-align:center;>" + data[3].septiembre + "</td>";
    ventas_terri += "<td style=text-align:center;>" + data[3].octubre + "</td>";
    ventas_terri += "<td style=text-align:center;>" + data[3].noviembre + "</td>";
    ventas_terri += "<td style=text-align:center;>" + data[3].diciembre + "</td>";
    ventas_terri += "<th style=text-align:center;>" + total4 + "</th>";
    ventas_terri += "</tr>";
    ventas_terri += "</tbody>";
    ventas_terri += "</table>";
    ventas_terri += "</div>";

    $("#ventas_terri").html(ventas_terri);

    Highcharts.chart('container_terri', {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Ventas Durante el Año'
        },
        subtitle: {
            text: 'Nipro Medical Corporation'
        },
        xAxis: {
            categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        },
        yAxis: {
            title: {
                text: 'Dolares'
            },
            labels: {
                formatter: function () {
                    return this.value + '';
                }
            }
        },
        tooltip: {
            crosshairs: true,
            shared: true
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            }
        },
        series: [{
                name: 'Sierra',
                marker: {
                    symbol: 'square'
                },
                data: [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12]

            }, {
                name: 'Costa',
                marker: {
                    symbol: 'diamond'
                },
                data: [b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12]
            }
            , {
                name: 'Austro',
                marker: {
                    symbol: 'diamond'
                },
                data: [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12]
            }
            , {
                name: 'Manabi',
                marker: {
                    symbol: 'diamond'
                },
                data: [d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12]
            }]
    });

}

function ventas_sierra() {

    var id_producto = getUrlVars()["producto"];
    var id_sub_producto = getUrlVars()["sub_producto"];

    $.ajax({
        url: 'php/controlador.php',
        data: {opcion: 10, dato: id_producto, dato2: id_sub_producto},
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            ventas_producto_sierra(json);
        }
    });
}

function ventas_producto_sierra(data) {

    var ventas_sierra = "";
    var color = "";
    var color2 = "";
    var color3 = "";
    var color4 = "";
    var color5 = "";
    var color6 = "";
    var color7 = "";
    var color8 = "";
    var color9 = "";
    var color10 = "";
    var color11 = "";
    var color12 = "";
    var color13 = "";

    var a1 = parseInt(data[0].enero);
    var a2 = parseInt(data[0].febrero);
    var a3 = parseInt(data[0].marzo);
    var a4 = parseInt(data[0].abril);
    var a5 = parseInt(data[0].mayo);
    var a6 = parseInt(data[0].junio);
    var a7 = parseInt(data[0].julio);
    var a8 = parseInt(data[0].agosto);
    var a9 = parseInt(data[0].septiembre);
    var a10 = parseInt(data[0].octubre);
    var a11 = parseInt(data[0].noviembre);
    var a12 = parseInt(data[0].diciembre);

//     Revisar fin de año 
    var hoy = new Date();
//    var mm = hoy.getMonth();
    mm = 12;

    if (mm == 1) {
        var total = a1;
    } else
    if (mm == 2) {
        var total = a1 + a2;
    } else
    if (mm == 3) {
        var total = a1 + a2 + a3;
    } else
    if (mm == 4) {
        var total = a1 + a2 + a3 + a4;
    } else
    if (mm == 5) {
        var total = a1 + a2 + a3 + a4 + a5;
    } else
    if (mm == 6) {
        var total = a1 + a2 + a3 + a4 + a5 + a6;
    } else
    if (mm == 7) {
        var total = a1 + a2 + a3 + a4 + a5 + a6 + a7;
    } else
    if (mm == 8) {
        var total = a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8;
    } else
    if (mm == 9) {
        var total = a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8 + a9;
    } else
    if (mm == 10) {
        var total = a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8 + a9 + a10;
    } else
    if (mm == 11) {
        var total = a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8 + a9 + a10 + a11;
    } else
    if (mm == 12) {
        var total = a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8 + a9 + a10 + a11 + a12;
    }


    var b1 = parseInt(data[1].enero);
    var b2 = parseInt(data[1].febrero);
    var b3 = parseInt(data[1].marzo);
    var b4 = parseInt(data[1].abril);
    var b5 = parseInt(data[1].mayo);
    var b6 = parseInt(data[1].junio);
    var b7 = parseInt(data[1].julio);
    var b8 = parseInt(data[1].agosto);
    var b9 = parseInt(data[1].septiembre);
    var b10 = parseInt(data[1].octubre);
    var b11 = parseInt(data[1].noviembre);
    var b12 = parseInt(data[1].diciembre);

    if (mm == 1) {
        var total2 = b1;
    } else
    if (mm == 2) {
        var total2 = b1 + b2;
    } else
    if (mm == 3) {
        var total2 = b1 + b2 + b3;
    } else
    if (mm == 4) {
        var total2 = b1 + b2 + b3 + b4;
    } else
    if (mm == 5) {
        var total2 = b1 + b2 + b3 + b4 + b5;
    } else
    if (mm == 6) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6;
    } else
    if (mm == 7) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6 + b7;
    } else
    if (mm == 8) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6 + b7 + b8;
    } else
    if (mm == 9) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6 + b7 + b8 + b9;
    } else
    if (mm == 10) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6 + b7 + b8 + b9 + b10;
    } else
    if (mm == 11) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6 + b7 + b8 + b9 + b10 + b11;
    } else
    if (mm == 12) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6 + b7 + b8 + b9 + b10 + b11 + b12;
    }

    var enero = (parseInt(data[1].enero) * 100) / parseInt(data[0].enero);
    var febrero = (parseInt(data[1].febrero) * 100) / parseInt(data[0].febrero);
    var marzo = (parseInt(data[1].marzo) * 100) / parseInt(data[0].marzo);
    var abril = (parseInt(data[1].abril) * 100) / parseInt(data[0].abril);
    var mayo = (parseInt(data[1].mayo) * 100) / parseInt(data[0].mayo);
    var junio = (parseInt(data[1].junio) * 100) / parseInt(data[0].junio);
    var julio = (parseInt(data[1].julio) * 100) / parseInt(data[0].julio);
    var agosto = (parseInt(data[1].agosto) * 100) / parseInt(data[0].agosto);
    var septiembre = (parseInt(data[1].septiembre) * 100) / parseInt(data[0].septiembre);
    var octubre = (parseInt(data[1].octubre) * 100) / parseInt(data[0].octubre);
    var noviembre = (parseInt(data[1].noviembre) * 100) / parseInt(data[0].noviembre);
    var diciembre = (parseInt(data[1].diciembre) * 100) / parseInt(data[0].diciembre);
    var total3 = (parseInt(total2) * 100) / parseInt(total);

    if (isNaN(enero) == true || isFinite(enero) == false) {
        color = "FF8A8A";
        enero = 0;
    } else
    if (enero < 0) {
        color = "0B0B61";
    } else
    if (enero >= 0 && enero <= 70) {
        color = "FF8A8A";
    } else
    if (enero > 70 && enero <= 99) {
        color = "FFFF84";
    } else
    if (enero > 99) {
        color = "89FC63";
    }

    if (isNaN(febrero) == true || isFinite(febrero) == false) {
        color2 = "FF8A8A";
        febrero = 0;
    } else
    if (febrero < 0) {
        color2 = "0B0B61";
    } else
    if (febrero >= 0 && febrero <= 70) {
        color2 = "FF8A8A";
    } else
    if (febrero > 70 && febrero <= 99) {
        color2 = "FFFF84";
    } else
    if (febrero > 99) {
        color2 = "89FC63";
    }

    if (isNaN(marzo) == true || isFinite(marzo) == false) {
        color3 = "FF8A8A";
        marzo = 0;
    } else
    if (marzo < 0) {
        color3 = "0B0B61";
    } else
    if (marzo >= 0 && marzo <= 70) {
        color3 = "FF8A8A";
    } else
    if (marzo > 70 && marzo <= 99) {
        color3 = "FFFF84";
    } else
    if (marzo > 99) {
        color3 = "89FC63";
    }

    if (isNaN(abril) == true || isFinite(abril) == false) {
        color4 = "FF8A8A";
        abril = 0;
    } else
    if (abril < 0) {
        color4 = "0B0B61";
    } else
    if (abril >= 0 && abril <= 70) {
        color4 = "FF8A8A";
    } else
    if (abril > 70 && abril <= 99) {
        color4 = "FFFF84";
    } else
    if (abril > 99) {
        color4 = "89FC63";
    }

    if (isNaN(mayo) == true || isFinite(mayo) == false) {
        color5 = "FF8A8A";
        mayo = 0;
    } else
    if (mayo < 0) {
        color5 = "0B0B61";
    } else
    if (mayo >= 0 && mayo <= 70) {
        color5 = "FF8A8A";
    } else
    if (mayo > 70 && mayo <= 99) {
        color5 = "FFFF84";
    } else
    if (mayo > 99) {
        color5 = "89FC63";
    }

    if (isNaN(junio) == true || isFinite(junio) == false) {
        color6 = "FF8A8A";
        junio = 0;
    } else
    if (junio < 0) {
        color6 = "0B0B61";
    } else
    if (junio >= 0 && junio <= 70) {
        color6 = "FF8A8A";
    } else
    if (junio > 70 && junio <= 99) {
        color6 = "FFFF84";
    } else
    if (junio > 99) {
        color6 = "89FC63";
    }

    if (isNaN(julio) == true || isFinite(julio) == false) {
        color7 = "FF8A8A";
        julio = 0;
    } else
    if (julio < 0) {
        color7 = "0B0B61";
    } else
    if (julio >= 0 && julio <= 70) {
        color7 = "FF8A8A";
    } else
    if (julio > 70 && julio <= 99) {
        color7 = "FFFF84";
    } else
    if (julio > 99) {
        color7 = "89FC63";
    }

    if (isNaN(agosto) == true || isFinite(agosto) == false) {
        color8 = "FF8A8A";
        agosto = 0;
    } else
    if (agosto < 0) {
        color8 = "0B0B61";
    } else
    if (agosto >= 0 && agosto <= 70) {
        color8 = "FF8A8A";
    } else
    if (agosto > 70 && agosto <= 99) {
        color8 = "FFFF84";
    } else
    if (agosto > 99) {
        color8 = "89FC63";
    }

    if (isNaN(septiembre) == true || isFinite(septiembre) == false) {
        color9 = "FF8A8A";
        septiembre = 0;
    } else
    if (septiembre < 0) {
        color9 = "0B0B61";
    } else
    if (septiembre >= 0 && septiembre <= 70) {
        color9 = "FF8A8A";
    } else
    if (septiembre > 70 && septiembre <= 99) {
        color9 = "FFFF84";
    } else
    if (septiembre > 99) {
        color9 = "89FC63";
    }

    if (isNaN(octubre) == true || isFinite(octubre) == false) {
        color10 = "FF8A8A";
        octubre = 0;
    } else
    if (octubre < 0) {
        color10 = "0B0B61";
    } else
    if (octubre >= 0 && octubre <= 70) {
        color10 = "FF8A8A";
    } else
    if (octubre > 70 && octubre <= 99) {
        color10 = "FFFF84";
    } else
    if (octubre > 99) {
        color10 = "89FC63";
    }

    if (isNaN(noviembre) == true || isFinite(noviembre) == false) {
        color11 = "FF8A8A";
        noviembre = 0;
    } else
    if (noviembre < 0) {
        color11 = "0B0B61";
    } else
    if (noviembre >= 0 && noviembre <= 70) {
        color11 = "FF8A8A";
    } else
    if (noviembre > 70 && noviembre <= 99) {
        color11 = "FFFF84";
    } else
    if (noviembre > 99) {
        color11 = "89FC63";
    }

    if (isNaN(diciembre) == true || isFinite(diciembre) == false) {
        color12 = "FF8A8A";
        diciembre = 0;
    } else
    if (diciembre < 0) {
        color12 = "0B0B61";
    } else
    if (diciembre >= 0 && diciembre <= 70) {
        color12 = "FF8A8A";
    } else
    if (diciembre > 70 && diciembre <= 99) {
        color12 = "FFFF84";
    } else
    if (diciembre > 99) {
        color12 = "89FC63";
    }

    if (isNaN(total3) == true || isFinite(total3) == false) {
        color13 = "FF8A8A";
        total3 = 0;
    } else
    if (total3 >= 0 && total3 <= 70) {
        color13 = "FF8A8A";
    } else
    if (total3 > 70 && total3 <= 99) {
        color13 = "FFFF84";
    } else
    if (total3 > 99) {
        color13 = "89FC63";
    }

    ventas_sierra += "<div class=table-responsive>";
    ventas_sierra += "<table class=table>";
    ventas_sierra += "<thead>";
    ventas_sierra += "<tr class=info>";
    ventas_sierra += "<th style=text-align:center;>Ventas Sierra</th>";
    ventas_sierra += "<th style=text-align:center;>Enero</th>";
    ventas_sierra += "<th style=text-align:center;>Febrero</th>";
    ventas_sierra += "<th style=text-align:center;>Marzo</th>";
    ventas_sierra += "<th style=text-align:center;>Abril</th>";
    ventas_sierra += "<th style=text-align:center;>Mayo</th>";
    ventas_sierra += "<th style=text-align:center;>Junio</th>";
    ventas_sierra += "<th style=text-align:center;>Julio</th>";
    ventas_sierra += "<th style=text-align:center;>Agosto</th>";
    ventas_sierra += "<th style=text-align:center;>Septiembre</th>";
    ventas_sierra += "<th style=text-align:center;>Octubre</th>";
    ventas_sierra += "<th style=text-align:center;>Noviembre</th>";
    ventas_sierra += "<th style=text-align:center;>Diciembre</th>";
    ventas_sierra += "<th style=text-align:center;>TOTAL</th>";
    ventas_sierra += "</tr>";
    ventas_sierra += "</thead>";
    ventas_sierra += "<tbody>";
    ventas_sierra += "<tr class=warning>";
    ventas_sierra += "<th style=text-align:center;>Presupuesto Ventas USD</th>";
    ventas_sierra += "<td style=text-align:center;>" + data[0].enero + "</td>";
    ventas_sierra += "<td style=text-align:center;>" + data[0].febrero + "</td>";
    ventas_sierra += "<td style=text-align:center;>" + data[0].marzo + "</td>";
    ventas_sierra += "<td style=text-align:center;>" + data[0].abril + "</td>";
    ventas_sierra += "<td style=text-align:center;>" + data[0].mayo + "</td>";
    ventas_sierra += "<td style=text-align:center;>" + data[0].junio + "</td>";
    ventas_sierra += "<td style=text-align:center;>" + data[0].julio + "</td>";
    ventas_sierra += "<td style=text-align:center;>" + data[0].agosto + "</td>";
    ventas_sierra += "<td style=text-align:center;>" + data[0].septiembre + "</td>";
    ventas_sierra += "<td style=text-align:center;>" + data[0].octubre + "</td>";
    ventas_sierra += "<td style=text-align:center;>" + data[0].noviembre + "</td>";
    ventas_sierra += "<td style=text-align:center;>" + data[0].diciembre + "</td>";
    ventas_sierra += "<th style=text-align:center;>" + total + "</th>";
    ventas_sierra += "</tr>";
    ventas_sierra += "<tr class=warning>";
    ventas_sierra += "<th style=text-align:center;>Ventas por mes USD</th>";
    ventas_sierra += "<td style=text-align:center;>" + data[1].enero + "</td>";
    ventas_sierra += "<td style=text-align:center;>" + data[1].febrero + "</td>";
    ventas_sierra += "<td style=text-align:center;>" + data[1].marzo + "</td>";
    ventas_sierra += "<td style=text-align:center;>" + data[1].abril + "</td>";
    ventas_sierra += "<td style=text-align:center;>" + data[1].mayo + "</td>";
    ventas_sierra += "<td style=text-align:center;>" + data[1].junio + "</td>";
    ventas_sierra += "<td style=text-align:center;>" + data[1].julio + "</td>";
    ventas_sierra += "<td style=text-align:center;>" + data[1].agosto + "</td>";
    ventas_sierra += "<td style=text-align:center;>" + data[1].septiembre + "</td>";
    ventas_sierra += "<td style=text-align:center;>" + data[1].octubre + "</td>";
    ventas_sierra += "<td style=text-align:center;>" + data[1].noviembre + "</td>";
    ventas_sierra += "<td style=text-align:center;>" + data[1].diciembre + "</td>";
    ventas_sierra += "<th style=text-align:center;>" + total2 + "</th>";
    ventas_sierra += "</tr>";
    ventas_sierra += "<tr class=>";
    ventas_sierra += "<th style=text-align:center;>Alcance (%)</th>";
    ventas_sierra += "<th bgcolor=" + color + " style=text-align:center;>" + Math.round(enero) + "%</th>";
    ventas_sierra += "<th bgcolor=" + color2 + " style=text-align:center;>" + Math.round(febrero) + "%</th>";
    ventas_sierra += "<th bgcolor=" + color3 + " style=text-align:center;>" + Math.round(marzo) + "%</th>";
    ventas_sierra += "<th bgcolor=" + color4 + " style=text-align:center;>" + Math.round(abril) + "%</th>";
    ventas_sierra += "<th bgcolor=" + color5 + " style=text-align:center;>" + Math.round(mayo) + "%</th>";
    ventas_sierra += "<th bgcolor=" + color6 + " style=text-align:center;>" + Math.round(junio) + "%</th>";
    ventas_sierra += "<th bgcolor=" + color7 + " style=text-align:center;>" + Math.round(julio) + "%</th>";
    ventas_sierra += "<th bgcolor=" + color8 + " style=text-align:center;>" + Math.round(agosto) + "%</th>";
    ventas_sierra += "<th bgcolor=" + color9 + " style=text-align:center;>" + Math.round(septiembre) + "%</th>";
    ventas_sierra += "<th bgcolor=" + color10 + " style=text-align:center;>" + Math.round(octubre) + "%</th>";
    ventas_sierra += "<th bgcolor=" + color11 + " style=text-align:center;>" + Math.round(noviembre) + "%</th>";
    ventas_sierra += "<th bgcolor=" + color12 + " style=text-align:center;>" + Math.round(diciembre) + "%</th>";
    ventas_sierra += "<th bgcolor=" + color13 + " style=text-align:center;>" + Math.round(total3) + "%</th>";
    ventas_sierra += "</tr>";
    ventas_sierra += "</tbody>";
    ventas_sierra += "</table>";
    ventas_sierra += "</div>";

    $("#ventas_sierra").html(ventas_sierra);
    $("#ventas_sierra2").html(ventas_sierra);



    Highcharts.chart('container_sierra', {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Ventas Durante el Año en la Sierra'
        },
        subtitle: {
            text: 'Nipro Medical Corporation'
        },
        xAxis: {
            categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        },
        yAxis: {
            title: {
                text: 'Dolares'
            },
            labels: {
                formatter: function () {
                    return this.value + '';
                }
            }
        },
        tooltip: {
            crosshairs: true,
            shared: true
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            }
        },
        series: [{
                name: 'Pronostico en ventas mensual USD',
                marker: {
                    symbol: 'square'
                },
                data: [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12]

            }, {
                name: 'Ventas por mes USD',
                marker: {
                    symbol: 'diamond'
                },
                data: [b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12]
            }]
    });

}

function ventas_costa() {

    var id_producto = getUrlVars()["producto"];
    var id_sub_producto = getUrlVars()["sub_producto"];

    $.ajax({
        url: 'php/controlador.php',
        data: {opcion: 11, dato: id_producto, dato2: id_sub_producto},
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            ventas_producto_costa(json);
        }
    });
}

function ventas_producto_costa(data) {

    var ventas_costa = "";
    var color = "";
    var color2 = "";
    var color3 = "";
    var color4 = "";
    var color5 = "";
    var color6 = "";
    var color7 = "";
    var color8 = "";
    var color9 = "";
    var color10 = "";
    var color11 = "";
    var color12 = "";
    var color13 = "";

    var a1 = parseInt(data[0].enero);
    var a2 = parseInt(data[0].febrero);
    var a3 = parseInt(data[0].marzo);
    var a4 = parseInt(data[0].abril);
    var a5 = parseInt(data[0].mayo);
    var a6 = parseInt(data[0].junio);
    var a7 = parseInt(data[0].julio);
    var a8 = parseInt(data[0].agosto);
    var a9 = parseInt(data[0].septiembre);
    var a10 = parseInt(data[0].octubre);
    var a11 = parseInt(data[0].noviembre);
    var a12 = parseInt(data[0].diciembre);

//     revisar fin de año

    var hoy = new Date();
//    var mm = hoy.getMonth();
    mm = 12;

    if (mm == 1) {
        var total = a1;
    } else
    if (mm == 2) {
        var total = a1 + a2;
    } else
    if (mm == 3) {
        var total = a1 + a2 + a3;
    } else
    if (mm == 4) {
        var total = a1 + a2 + a3 + a4;
    } else
    if (mm == 5) {
        var total = a1 + a2 + a3 + a4 + a5;
    } else
    if (mm == 6) {
        var total = a1 + a2 + a3 + a4 + a5 + a6;
    } else
    if (mm == 7) {
        var total = a1 + a2 + a3 + a4 + a5 + a6 + a7;
    } else
    if (mm == 8) {
        var total = a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8;
    } else
    if (mm == 9) {
        var total = a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8 + a9;
    } else
    if (mm == 10) {
        var total = a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8 + a9 + a10;
    } else
    if (mm == 11) {
        var total = a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8 + a9 + a10 + a11;
    } else
    if (mm == 12) {
        var total = a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8 + a9 + a10 + a11 + a12;
    }


    var b1 = parseInt(data[1].enero);
    var b2 = parseInt(data[1].febrero);
    var b3 = parseInt(data[1].marzo);
    var b4 = parseInt(data[1].abril);
    var b5 = parseInt(data[1].mayo);
    var b6 = parseInt(data[1].junio);
    var b7 = parseInt(data[1].julio);
    var b8 = parseInt(data[1].agosto);
    var b9 = parseInt(data[1].septiembre);
    var b10 = parseInt(data[1].octubre);
    var b11 = parseInt(data[1].noviembre);
    var b12 = parseInt(data[1].diciembre);

    if (mm == 1) {
        var total2 = b1;
    } else
    if (mm == 2) {
        var total2 = b1 + b2;
    } else
    if (mm == 3) {
        var total2 = b1 + b2 + b3;
    } else
    if (mm == 4) {
        var total2 = b1 + b2 + b3 + b4;
    } else
    if (mm == 5) {
        var total2 = b1 + b2 + b3 + b4 + b5;
    } else
    if (mm == 6) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6;
    } else
    if (mm == 7) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6 + b7;
    } else
    if (mm == 8) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6 + b7 + b8;
    } else
    if (mm == 9) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6 + b7 + b8 + b9;
    } else
    if (mm == 10) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6 + b7 + b8 + b9 + b10;
    } else
    if (mm == 11) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6 + b7 + b8 + b9 + b10 + b11;
    } else
    if (mm == 12) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6 + b7 + b8 + b9 + b10 + b11 + b12;
    }


    var enero = (parseInt(data[1].enero) * 100) / parseInt(data[0].enero);
    var febrero = (parseInt(data[1].febrero) * 100) / parseInt(data[0].febrero);
    var marzo = (parseInt(data[1].marzo) * 100) / parseInt(data[0].marzo);
    var abril = (parseInt(data[1].abril) * 100) / parseInt(data[0].abril);
    var mayo = (parseInt(data[1].mayo) * 100) / parseInt(data[0].mayo);
    var junio = (parseInt(data[1].junio) * 100) / parseInt(data[0].junio);
    var julio = (parseInt(data[1].julio) * 100) / parseInt(data[0].julio);
    var agosto = (parseInt(data[1].agosto) * 100) / parseInt(data[0].agosto);
    var septiembre = (parseInt(data[1].septiembre) * 100) / parseInt(data[0].septiembre);
    var octubre = (parseInt(data[1].octubre) * 100) / parseInt(data[0].octubre);
    var noviembre = (parseInt(data[1].noviembre) * 100) / parseInt(data[0].noviembre);
    var diciembre = (parseInt(data[1].diciembre) * 100) / parseInt(data[0].diciembre);
    var total3 = (parseInt(total2) * 100) / parseInt(total);

    if (isNaN(enero) == true || isFinite(enero) == false) {
        color = "FF8A8A";
        enero = 0;
    } else
    if (enero < 0) {
        color = "0B0B61";
    } else
    if (enero >= 0 && enero <= 70) {
        color = "FF8A8A";
    } else
    if (enero > 70 && enero <= 99) {
        color = "FFFF84";
    } else
    if (enero > 99) {
        color = "89FC63";
    }

    if (isNaN(febrero) == true || isFinite(febrero) == false) {
        color2 = "FF8A8A";
        febrero = 0;
    } else
    if (febrero < 0) {
        color2 = "0B0B61";
    } else
    if (febrero >= 0 && febrero <= 70) {
        color2 = "FF8A8A";
    } else
    if (febrero > 70 && febrero <= 99) {
        color2 = "FFFF84";
    } else
    if (febrero > 99) {
        color2 = "89FC63";
    }

    if (isNaN(marzo) == true || isFinite(marzo) == false) {
        color3 = "FF8A8A";
        marzo = 0;
    } else
    if (marzo < 0) {
        color3 = "0B0B61";
    } else
    if (marzo >= 0 && marzo <= 70) {
        color3 = "FF8A8A";
    } else
    if (marzo > 70 && marzo <= 99) {
        color3 = "FFFF84";
    } else
    if (marzo > 99) {
        color3 = "89FC63";
    }

    if (isNaN(abril) == true || isFinite(abril) == false) {
        color4 = "FF8A8A";
        abril = 0;
    } else
    if (abril < 0) {
        color4 = "0B0B61";
    } else
    if (abril >= 0 && abril <= 70) {
        color4 = "FF8A8A";
    } else
    if (abril > 70 && abril <= 99) {
        color4 = "FFFF84";
    } else
    if (abril > 99) {
        color4 = "89FC63";
    }

    if (isNaN(mayo) == true || isFinite(mayo) == false) {
        color5 = "FF8A8A";
        mayo = 0;
    } else
    if (mayo < 0) {
        color5 = "0B0B61";
    } else
    if (mayo >= 0 && mayo <= 70) {
        color5 = "FF8A8A";
    } else
    if (mayo > 70 && mayo <= 99) {
        color5 = "FFFF84";
    } else
    if (mayo > 99) {
        color5 = "89FC63";
    }

    if (isNaN(junio) == true || isFinite(junio) == false) {
        color6 = "FF8A8A";
        junio = 0;
    } else
    if (junio < 0) {
        color6 = "0B0B61";
    } else
    if (junio >= 0 && junio <= 70) {
        color6 = "FF8A8A";
    } else
    if (junio > 70 && junio <= 99) {
        color6 = "FFFF84";
    } else
    if (junio > 99) {
        color6 = "89FC63";
    }

    if (isNaN(julio) == true || isFinite(julio) == false) {
        color7 = "FF8A8A";
        julio = 0;
    } else
    if (julio < 0) {
        color7 = "0B0B61";
    } else
    if (julio >= 0 && julio <= 70) {
        color7 = "FF8A8A";
    } else
    if (julio > 70 && julio <= 99) {
        color7 = "FFFF84";
    } else
    if (julio > 99) {
        color7 = "89FC63";
    }

    if (isNaN(agosto) == true || isFinite(agosto) == false) {
        color8 = "FF8A8A";
        agosto = 0;
    } else
    if (agosto < 0) {
        color8 = "0B0B61";
    } else
    if (agosto >= 0 && agosto <= 70) {
        color8 = "FF8A8A";
    } else
    if (agosto > 70 && agosto <= 99) {
        color8 = "FFFF84";
    } else
    if (agosto > 99) {
        color8 = "89FC63";
    }

    if (isNaN(septiembre) == true || isFinite(septiembre) == false) {
        color9 = "FF8A8A";
        septiembre = 0;
    } else
    if (septiembre < 0) {
        color9 = "0B0B61";
    } else
    if (septiembre >= 0 && septiembre <= 70) {
        color9 = "FF8A8A";
    } else
    if (septiembre > 70 && septiembre <= 99) {
        color9 = "FFFF84";
    } else
    if (septiembre > 99) {
        color9 = "89FC63";
    }

    if (isNaN(octubre) == true || isFinite(octubre) == false) {
        color10 = "FF8A8A";
        octubre = 0;
    } else
    if (octubre < 0) {
        color10 = "0B0B61";
    } else
    if (octubre >= 0 && octubre <= 70) {
        color10 = "FF8A8A";
    } else
    if (octubre > 70 && octubre <= 99) {
        color10 = "FFFF84";
    } else
    if (octubre > 99) {
        color10 = "89FC63";
    }

    if (isNaN(noviembre) == true || isFinite(noviembre) == false) {
        color11 = "FF8A8A";
        noviembre = 0;
    } else
    if (noviembre < 0) {
        color11 = "0B0B61";
    } else
    if (noviembre >= 0 && noviembre <= 70) {
        color11 = "FF8A8A";
    } else
    if (noviembre > 70 && noviembre <= 99) {
        color11 = "FFFF84";
    } else
    if (noviembre > 99) {
        color11 = "89FC63";
    }

    if (isNaN(diciembre) == true || isFinite(diciembre) == false) {
        color12 = "FF8A8A";
        diciembre = 0;
    } else
    if (diciembre < 0) {
        color12 = "0B0B61";
    } else
    if (diciembre >= 0 && diciembre <= 70) {
        color12 = "FF8A8A";
    } else
    if (diciembre > 70 && diciembre <= 99) {
        color12 = "FFFF84";
    } else
    if (diciembre > 99) {
        color12 = "89FC63";
    }

    if (isNaN(total3) == true || isFinite(total3) == false) {
        color13 = "FF8A8A";
        total3 = 0;
    } else
    if (total3 >= 0 && total3 <= 70) {
        color13 = "FF8A8A";
    } else
    if (total3 > 70 && total3 <= 99) {
        color13 = "FFFF84";
    } else
    if (total3 > 99) {
        color13 = "89FC63";
    }

    ventas_costa += "<div class=table-responsive>";
    ventas_costa += "<table class=table>";
    ventas_costa += "<thead>";
    ventas_costa += "<tr class=info>";
    ventas_costa += "<th style=text-align:center;>Ventas Costa</th>";
    ventas_costa += "<th style=text-align:center;>Enero</th>";
    ventas_costa += "<th style=text-align:center;>Febrero</th>";
    ventas_costa += "<th style=text-align:center;>Marzo</th>";
    ventas_costa += "<th style=text-align:center;>Abril</th>";
    ventas_costa += "<th style=text-align:center;>Mayo</th>";
    ventas_costa += "<th style=text-align:center;>Junio</th>";
    ventas_costa += "<th style=text-align:center;>Julio</th>";
    ventas_costa += "<th style=text-align:center;>Agosto</th>";
    ventas_costa += "<th style=text-align:center;>Septiembre</th>";
    ventas_costa += "<th style=text-align:center;>Octubre</th>";
    ventas_costa += "<th style=text-align:center;>Noviembre</th>";
    ventas_costa += "<th style=text-align:center;>Diciembre</th>";
    ventas_costa += "<th style=text-align:center;>TOTAL</th>";
    ventas_costa += "</tr>";
    ventas_costa += "</thead>";
    ventas_costa += "<tbody>";
    ventas_costa += "<tr class=warning>";
    ventas_costa += "<th style=text-align:center;>Presupuesto Ventas USD</th>";
    ventas_costa += "<td style=text-align:center;>" + data[0].enero + "</td>";
    ventas_costa += "<td style=text-align:center;>" + data[0].febrero + "</td>";
    ventas_costa += "<td style=text-align:center;>" + data[0].marzo + "</td>";
    ventas_costa += "<td style=text-align:center;>" + data[0].abril + "</td>";
    ventas_costa += "<td style=text-align:center;>" + data[0].mayo + "</td>";
    ventas_costa += "<td style=text-align:center;>" + data[0].junio + "</td>";
    ventas_costa += "<td style=text-align:center;>" + data[0].julio + "</td>";
    ventas_costa += "<td style=text-align:center;>" + data[0].agosto + "</td>";
    ventas_costa += "<td style=text-align:center;>" + data[0].septiembre + "</td>";
    ventas_costa += "<td style=text-align:center;>" + data[0].octubre + "</td>";
    ventas_costa += "<td style=text-align:center;>" + data[0].noviembre + "</td>";
    ventas_costa += "<td style=text-align:center;>" + data[0].diciembre + "</td>";
    ventas_costa += "<th style=text-align:center;>" + total + "</th>";
    ventas_costa += "</tr>";
    ventas_costa += "<tr class=warning>";
    ventas_costa += "<th style=text-align:center;>Ventas por mes USD</th>";
    ventas_costa += "<td style=text-align:center;>" + data[1].enero + "</td>";
    ventas_costa += "<td style=text-align:center;>" + data[1].febrero + "</td>";
    ventas_costa += "<td style=text-align:center;>" + data[1].marzo + "</td>";
    ventas_costa += "<td style=text-align:center;>" + data[1].abril + "</td>";
    ventas_costa += "<td style=text-align:center;>" + data[1].mayo + "</td>";
    ventas_costa += "<td style=text-align:center;>" + data[1].junio + "</td>";
    ventas_costa += "<td style=text-align:center;>" + data[1].julio + "</td>";
    ventas_costa += "<td style=text-align:center;>" + data[1].agosto + "</td>";
    ventas_costa += "<td style=text-align:center;>" + data[1].septiembre + "</td>";
    ventas_costa += "<td style=text-align:center;>" + data[1].octubre + "</td>";
    ventas_costa += "<td style=text-align:center;>" + data[1].noviembre + "</td>";
    ventas_costa += "<td style=text-align:center;>" + data[1].diciembre + "</td>";
    ventas_costa += "<th style=text-align:center;>" + total2 + "</th>";
    ventas_costa += "</tr>";
    ventas_costa += "<tr class=>";
    ventas_costa += "<th style=text-align:center;>Alcance (%)</th>";
    ventas_costa += "<th bgcolor=" + color + " style=text-align:center;>" + Math.round(enero) + "%</th>";
    ventas_costa += "<th bgcolor=" + color2 + " style=text-align:center;>" + Math.round(febrero) + "%</th>";
    ventas_costa += "<th bgcolor=" + color3 + " style=text-align:center;>" + Math.round(marzo) + "%</th>";
    ventas_costa += "<th bgcolor=" + color4 + " style=text-align:center;>" + Math.round(abril) + "%</th>";
    ventas_costa += "<th bgcolor=" + color5 + " style=text-align:center;>" + Math.round(mayo) + "%</th>";
    ventas_costa += "<th bgcolor=" + color6 + " style=text-align:center;>" + Math.round(junio) + "%</th>";
    ventas_costa += "<th bgcolor=" + color7 + " style=text-align:center;>" + Math.round(julio) + "%</th>";
    ventas_costa += "<th bgcolor=" + color8 + " style=text-align:center;>" + Math.round(agosto) + "%</th>";
    ventas_costa += "<th bgcolor=" + color9 + " style=text-align:center;>" + Math.round(septiembre) + "%</th>";
    ventas_costa += "<th bgcolor=" + color10 + " style=text-align:center;>" + Math.round(octubre) + "%</th>";
    ventas_costa += "<th bgcolor=" + color11 + " style=text-align:center;>" + Math.round(noviembre) + "%</th>";
    ventas_costa += "<th bgcolor=" + color12 + " style=text-align:center;>" + Math.round(diciembre) + "%</th>";
    ventas_costa += "<th bgcolor=" + color13 + " style=text-align:center;>" + Math.round(total3) + "%</th>";
    ventas_costa += "</tr>";
    ventas_costa += "</tbody>";
    ventas_costa += "</table>";
    ventas_costa += "</div>";

    $("#ventas_costa").html(ventas_costa);
    $("#ventas_costa2").html(ventas_costa);



    Highcharts.chart('container_costa', {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Ventas Durante el Año en la Costa'
        },
        subtitle: {
            text: 'Nipro Medical Corporation'
        },
        xAxis: {
            categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        },
        yAxis: {
            title: {
                text: 'Dolares'
            },
            labels: {
                formatter: function () {
                    return this.value + '';
                }
            }
        },
        tooltip: {
            crosshairs: true,
            shared: true
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            }
        },
        series: [{
                name: 'Pronostico en ventas mensual USD',
                marker: {
                    symbol: 'square'
                },
                data: [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12]

            }, {
                name: 'Ventas por mes USD',
                marker: {
                    symbol: 'diamond'
                },
                data: [b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12]
            }]
    });

}

function ventas_austro() {

    var id_producto = getUrlVars()["producto"];
    var id_sub_producto = getUrlVars()["sub_producto"];

    $.ajax({
        url: 'php/controlador.php',
        data: {opcion: 12, dato: id_producto, dato2: id_sub_producto},
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            ventas_producto_austro(json);
        }
    });
}

function ventas_producto_austro(data) {

    var ventas_austro = "";
    var color = "";
    var color2 = "";
    var color3 = "";
    var color4 = "";
    var color5 = "";
    var color6 = "";
    var color7 = "";
    var color8 = "";
    var color9 = "";
    var color10 = "";
    var color11 = "";
    var color12 = "";
    var color13 = "";

    var a1 = parseInt(data[0].enero);
    var a2 = parseInt(data[0].febrero);
    var a3 = parseInt(data[0].marzo);
    var a4 = parseInt(data[0].abril);
    var a5 = parseInt(data[0].mayo);
    var a6 = parseInt(data[0].junio);
    var a7 = parseInt(data[0].julio);
    var a8 = parseInt(data[0].agosto);
    var a9 = parseInt(data[0].septiembre);
    var a10 = parseInt(data[0].octubre);
    var a11 = parseInt(data[0].noviembre);
    var a12 = parseInt(data[0].diciembre);

//     Revisar fin de año 
    var hoy = new Date();
//    var mm = hoy.getMonth();
    mm = 12;

    if (mm == 1) {
        var total = a1;
    } else
    if (mm == 2) {
        var total = a1 + a2;
    } else
    if (mm == 3) {
        var total = a1 + a2 + a3;
    } else
    if (mm == 4) {
        var total = a1 + a2 + a3 + a4;
    } else
    if (mm == 5) {
        var total = a1 + a2 + a3 + a4 + a5;
    } else
    if (mm == 6) {
        var total = a1 + a2 + a3 + a4 + a5 + a6;
    } else
    if (mm == 7) {
        var total = a1 + a2 + a3 + a4 + a5 + a6 + a7;
    } else
    if (mm == 8) {
        var total = a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8;
    } else
    if (mm == 9) {
        var total = a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8 + a9;
    } else
    if (mm == 10) {
        var total = a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8 + a9 + a10;
    } else
    if (mm == 11) {
        var total = a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8 + a9 + a10 + a11;
    } else
    if (mm == 12) {
        var total = a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8 + a9 + a10 + a11 + a12;
    }


    var b1 = parseInt(data[1].enero);
    var b2 = parseInt(data[1].febrero);
    var b3 = parseInt(data[1].marzo);
    var b4 = parseInt(data[1].abril);
    var b5 = parseInt(data[1].mayo);
    var b6 = parseInt(data[1].junio);
    var b7 = parseInt(data[1].julio);
    var b8 = parseInt(data[1].agosto);
    var b9 = parseInt(data[1].septiembre);
    var b10 = parseInt(data[1].octubre);
    var b11 = parseInt(data[1].noviembre);
    var b12 = parseInt(data[1].diciembre);

    if (mm == 1) {
        var total2 = b1;
    } else
    if (mm == 2) {
        var total2 = b1 + b2;
    } else
    if (mm == 3) {
        var total2 = b1 + b2 + b3;
    } else
    if (mm == 4) {
        var total2 = b1 + b2 + b3 + b4;
    } else
    if (mm == 5) {
        var total2 = b1 + b2 + b3 + b4 + b5;
    } else
    if (mm == 6) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6;
    } else
    if (mm == 7) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6 + b7;
    } else
    if (mm == 8) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6 + b7 + b8;
    } else
    if (mm == 9) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6 + b7 + b8 + b9;
    } else
    if (mm == 10) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6 + b7 + b8 + b9 + b10;
    } else
    if (mm == 11) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6 + b7 + b8 + b9 + b10 + b11;
    } else
    if (mm == 12) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6 + b7 + b8 + b9 + b10 + b11 + b12;
    }

    var enero = (parseInt(data[1].enero) * 100) / parseInt(data[0].enero);
    var febrero = (parseInt(data[1].febrero) * 100) / parseInt(data[0].febrero);
    var marzo = (parseInt(data[1].marzo) * 100) / parseInt(data[0].marzo);
    var abril = (parseInt(data[1].abril) * 100) / parseInt(data[0].abril);
    var mayo = (parseInt(data[1].mayo) * 100) / parseInt(data[0].mayo);
    var junio = (parseInt(data[1].junio) * 100) / parseInt(data[0].junio);
    var julio = (parseInt(data[1].julio) * 100) / parseInt(data[0].julio);
    var agosto = (parseInt(data[1].agosto) * 100) / parseInt(data[0].agosto);
    var septiembre = (parseInt(data[1].septiembre) * 100) / parseInt(data[0].septiembre);
    var octubre = (parseInt(data[1].octubre) * 100) / parseInt(data[0].octubre);
    var noviembre = (parseInt(data[1].noviembre) * 100) / parseInt(data[0].noviembre);
    var diciembre = (parseInt(data[1].diciembre) * 100) / parseInt(data[0].diciembre);
    var total3 = (parseInt(total2) * 100) / parseInt(total);

    if (isNaN(enero) == true || isFinite(enero) == false) {
        color = "FF8A8A";
        enero = 0;
    } else
    if (enero < 0) {
        color = "0B0B61";
    } else
    if (enero >= 0 && enero <= 70) {
        color = "FF8A8A";
    } else
    if (enero > 70 && enero <= 99) {
        color = "FFFF84";
    } else
    if (enero > 99) {
        color = "89FC63";
    }

    if (isNaN(febrero) == true || isFinite(febrero) == false) {
        color2 = "FF8A8A";
        febrero = 0;
    } else
    if (febrero < 0) {
        color2 = "0B0B61";
    } else
    if (febrero >= 0 && febrero <= 70) {
        color2 = "FF8A8A";
    } else
    if (febrero > 70 && febrero <= 99) {
        color2 = "FFFF84";
    } else
    if (febrero > 99) {
        color2 = "89FC63";
    }

    if (isNaN(marzo) == true || isFinite(marzo) == false) {
        color3 = "FF8A8A";
        marzo = 0;
    } else
    if (marzo < 0) {
        color3 = "0B0B61";
    } else
    if (marzo >= 0 && marzo <= 70) {
        color3 = "FF8A8A";
    } else
    if (marzo > 70 && marzo <= 99) {
        color3 = "FFFF84";
    } else
    if (marzo > 99) {
        color3 = "89FC63";
    }

    if (isNaN(abril) == true || isFinite(abril) == false) {
        color4 = "FF8A8A";
        abril = 0;
    } else
    if (abril < 0) {
        color4 = "0B0B61";
    } else
    if (abril >= 0 && abril <= 70) {
        color4 = "FF8A8A";
    } else
    if (abril > 70 && abril <= 99) {
        color4 = "FFFF84";
    } else
    if (abril > 99) {
        color4 = "89FC63";
    }

    if (isNaN(mayo) == true || isFinite(mayo) == false) {
        color5 = "FF8A8A";
        mayo = 0;
    } else
    if (mayo < 0) {
        color5 = "0B0B61";
    } else
    if (mayo >= 0 && mayo <= 70) {
        color5 = "FF8A8A";
    } else
    if (mayo > 70 && mayo <= 99) {
        color5 = "FFFF84";
    } else
    if (mayo > 99) {
        color5 = "89FC63";
    }

    if (isNaN(junio) == true || isFinite(junio) == false) {
        color6 = "FF8A8A";
        junio = 0;
    } else
    if (junio < 0) {
        color6 = "0B0B61";
    } else
    if (junio >= 0 && junio <= 70) {
        color6 = "FF8A8A";
    } else
    if (junio > 70 && junio <= 99) {
        color6 = "FFFF84";
    } else
    if (junio > 99) {
        color6 = "89FC63";
    }

    if (isNaN(julio) == true || isFinite(julio) == false) {
        color7 = "FF8A8A";
        julio = 0;
    } else
    if (julio < 0) {
        color7 = "0B0B61";
    } else
    if (julio >= 0 && julio <= 70) {
        color7 = "FF8A8A";
    } else
    if (julio > 70 && julio <= 99) {
        color7 = "FFFF84";
    } else
    if (julio > 99) {
        color7 = "89FC63";
    }

    if (isNaN(agosto) == true || isFinite(agosto) == false) {
        color8 = "FF8A8A";
        agosto = 0;
    } else
    if (agosto < 0) {
        color8 = "0B0B61";
    } else
    if (agosto >= 0 && agosto <= 70) {
        color8 = "FF8A8A";
    } else
    if (agosto > 70 && agosto <= 99) {
        color8 = "FFFF84";
    } else
    if (agosto > 99) {
        color8 = "89FC63";
    }

    if (isNaN(septiembre) == true || isFinite(septiembre) == false) {
        color9 = "FF8A8A";
        septiembre = 0;
    } else
    if (septiembre < 0) {
        color9 = "0B0B61";
    } else
    if (septiembre >= 0 && septiembre <= 70) {
        color9 = "FF8A8A";
    } else
    if (septiembre > 70 && septiembre <= 99) {
        color9 = "FFFF84";
    } else
    if (septiembre > 99) {
        color9 = "89FC63";
    }

    if (isNaN(octubre) == true || isFinite(octubre) == false) {
        color10 = "FF8A8A";
        octubre = 0;
    } else
    if (octubre < 0) {
        color10 = "0B0B61";
    } else
    if (octubre >= 0 && octubre <= 70) {
        color10 = "FF8A8A";
    } else
    if (octubre > 70 && octubre <= 99) {
        color10 = "FFFF84";
    } else
    if (octubre > 99) {
        color10 = "89FC63";
    }

    if (isNaN(noviembre) == true || isFinite(noviembre) == false) {
        color11 = "FF8A8A";
        noviembre = 0;
    } else
    if (noviembre < 0) {
        color11 = "0B0B61";
    } else
    if (noviembre >= 0 && noviembre <= 70) {
        color11 = "FF8A8A";
    } else
    if (noviembre > 70 && noviembre <= 99) {
        color11 = "FFFF84";
    } else
    if (noviembre > 99) {
        color11 = "89FC63";
    }

    if (isNaN(diciembre) == true || isFinite(diciembre) == false) {
        color12 = "FF8A8A";
        diciembre = 0;
    } else
    if (diciembre < 0) {
        color12 = "0B0B61";
    } else
    if (diciembre >= 0 && diciembre <= 70) {
        color12 = "FF8A8A";
    } else
    if (diciembre > 70 && diciembre <= 99) {
        color12 = "FFFF84";
    } else
    if (diciembre > 99) {
        color12 = "89FC63";
    }

    if (isNaN(total3) == true || isFinite(total3) == false) {
        color13 = "FF8A8A";
        total3 = 0;
    } else
    if (total3 >= 0 && total3 <= 70) {
        color13 = "FF8A8A";
    } else
    if (total3 > 70 && total3 <= 99) {
        color13 = "FFFF84";
    } else
    if (total3 > 99) {
        color13 = "89FC63";
    }

    ventas_austro += "<div class=table-responsive>";
    ventas_austro += "<table class=table>";
    ventas_austro += "<thead>";
    ventas_austro += "<tr class=info>";
    ventas_austro += "<th style=text-align:center;>Ventas Austro</th>";
    ventas_austro += "<th style=text-align:center;>Enero</th>";
    ventas_austro += "<th style=text-align:center;>Febrero</th>";
    ventas_austro += "<th style=text-align:center;>Marzo</th>";
    ventas_austro += "<th style=text-align:center;>Abril</th>";
    ventas_austro += "<th style=text-align:center;>Mayo</th>";
    ventas_austro += "<th style=text-align:center;>Junio</th>";
    ventas_austro += "<th style=text-align:center;>Julio</th>";
    ventas_austro += "<th style=text-align:center;>Agosto</th>";
    ventas_austro += "<th style=text-align:center;>Septiembre</th>";
    ventas_austro += "<th style=text-align:center;>Octubre</th>";
    ventas_austro += "<th style=text-align:center;>Noviembre</th>";
    ventas_austro += "<th style=text-align:center;>Diciembre</th>";
    ventas_austro += "<th style=text-align:center;>TOTAL</th>";
    ventas_austro += "</tr>";
    ventas_austro += "</thead>";
    ventas_austro += "<tbody>";
    ventas_austro += "<tr class=warning>";
    ventas_austro += "<th style=text-align:center;>Presupuesto Ventas USD</th>";
    ventas_austro += "<td style=text-align:center;>" + data[0].enero + "</td>";
    ventas_austro += "<td style=text-align:center;>" + data[0].febrero + "</td>";
    ventas_austro += "<td style=text-align:center;>" + data[0].marzo + "</td>";
    ventas_austro += "<td style=text-align:center;>" + data[0].abril + "</td>";
    ventas_austro += "<td style=text-align:center;>" + data[0].mayo + "</td>";
    ventas_austro += "<td style=text-align:center;>" + data[0].junio + "</td>";
    ventas_austro += "<td style=text-align:center;>" + data[0].julio + "</td>";
    ventas_austro += "<td style=text-align:center;>" + data[0].agosto + "</td>";
    ventas_austro += "<td style=text-align:center;>" + data[0].septiembre + "</td>";
    ventas_austro += "<td style=text-align:center;>" + data[0].octubre + "</td>";
    ventas_austro += "<td style=text-align:center;>" + data[0].noviembre + "</td>";
    ventas_austro += "<td style=text-align:center;>" + data[0].diciembre + "</td>";
    ventas_austro += "<th style=text-align:center;>" + total + "</th>";
    ventas_austro += "</tr>";
    ventas_austro += "<tr class=warning>";
    ventas_austro += "<th style=text-align:center;>Ventas por mes USD</th>";
    ventas_austro += "<td style=text-align:center;>" + data[1].enero + "</td>";
    ventas_austro += "<td style=text-align:center;>" + data[1].febrero + "</td>";
    ventas_austro += "<td style=text-align:center;>" + data[1].marzo + "</td>";
    ventas_austro += "<td style=text-align:center;>" + data[1].abril + "</td>";
    ventas_austro += "<td style=text-align:center;>" + data[1].mayo + "</td>";
    ventas_austro += "<td style=text-align:center;>" + data[1].junio + "</td>";
    ventas_austro += "<td style=text-align:center;>" + data[1].julio + "</td>";
    ventas_austro += "<td style=text-align:center;>" + data[1].agosto + "</td>";
    ventas_austro += "<td style=text-align:center;>" + data[1].septiembre + "</td>";
    ventas_austro += "<td style=text-align:center;>" + data[1].octubre + "</td>";
    ventas_austro += "<td style=text-align:center;>" + data[1].noviembre + "</td>";
    ventas_austro += "<td style=text-align:center;>" + data[1].diciembre + "</td>";
    ventas_austro += "<th style=text-align:center;>" + total2 + "</th>";
    ventas_austro += "</tr>";
    ventas_austro += "<tr class=>";
    ventas_austro += "<th style=text-align:center;>Alcance (%)</th>";
    ventas_austro += "<th bgcolor=" + color + " style=text-align:center;>" + Math.round(enero) + "%</th>";
    ventas_austro += "<th bgcolor=" + color2 + " style=text-align:center;>" + Math.round(febrero) + "%</th>";
    ventas_austro += "<th bgcolor=" + color3 + " style=text-align:center;>" + Math.round(marzo) + "%</th>";
    ventas_austro += "<th bgcolor=" + color4 + " style=text-align:center;>" + Math.round(abril) + "%</th>";
    ventas_austro += "<th bgcolor=" + color5 + " style=text-align:center;>" + Math.round(mayo) + "%</th>";
    ventas_austro += "<th bgcolor=" + color6 + " style=text-align:center;>" + Math.round(junio) + "%</th>";
    ventas_austro += "<th bgcolor=" + color7 + " style=text-align:center;>" + Math.round(julio) + "%</th>";
    ventas_austro += "<th bgcolor=" + color8 + " style=text-align:center;>" + Math.round(agosto) + "%</th>";
    ventas_austro += "<th bgcolor=" + color9 + " style=text-align:center;>" + Math.round(septiembre) + "%</th>";
    ventas_austro += "<th bgcolor=" + color10 + " style=text-align:center;>" + Math.round(octubre) + "%</th>";
    ventas_austro += "<th bgcolor=" + color11 + " style=text-align:center;>" + Math.round(noviembre) + "%</th>";
    ventas_austro += "<th bgcolor=" + color12 + " style=text-align:center;>" + Math.round(diciembre) + "%</th>";
    ventas_austro += "<th bgcolor=" + color13 + " style=text-align:center;>" + Math.round(total3) + "%</th>";
    ventas_austro += "</tr>";
    ventas_austro += "</tbody>";
    ventas_austro += "</table>";
    ventas_austro += "</div>";

    $("#ventas_austro").html(ventas_austro);
    $("#ventas_austro2").html(ventas_austro);



    Highcharts.chart('container_austro', {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Ventas Durante el Año en el Austro'
        },
        subtitle: {
            text: 'Nipro Medical Corporation'
        },
        xAxis: {
            categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        },
        yAxis: {
            title: {
                text: 'Dolares'
            },
            labels: {
                formatter: function () {
                    return this.value + '';
                }
            }
        },
        tooltip: {
            crosshairs: true,
            shared: true
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            }
        },
        series: [{
                name: 'Pronostico en ventas mensual USD',
                marker: {
                    symbol: 'square'
                },
                data: [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12]

            }, {
                name: 'Ventas por mes USD',
                marker: {
                    symbol: 'diamond'
                },
                data: [b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12]
            }]
    });

}

function ventas_manabi() {

    var id_producto = getUrlVars()["producto"];
    var id_sub_producto = getUrlVars()["sub_producto"];

    $.ajax({
        url: 'php/controlador.php',
        data: {opcion: 13, dato: id_producto, dato2: id_sub_producto},
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            ventas_producto_manabi(json);
        }
    });
}

function ventas_producto_manabi(data) {

    var ventas_manabi = "";
    var color = "";
    var color2 = "";
    var color3 = "";
    var color4 = "";
    var color5 = "";
    var color6 = "";
    var color7 = "";
    var color8 = "";
    var color9 = "";
    var color10 = "";
    var color11 = "";
    var color12 = "";
    var color13 = "";

    var a1 = parseInt(data[0].enero);
    var a2 = parseInt(data[0].febrero);
    var a3 = parseInt(data[0].marzo);
    var a4 = parseInt(data[0].abril);
    var a5 = parseInt(data[0].mayo);
    var a6 = parseInt(data[0].junio);
    var a7 = parseInt(data[0].julio);
    var a8 = parseInt(data[0].agosto);
    var a9 = parseInt(data[0].septiembre);
    var a10 = parseInt(data[0].octubre);
    var a11 = parseInt(data[0].noviembre);
    var a12 = parseInt(data[0].diciembre);

//     Revisar fin de año
    var hoy = new Date();
//    var mm = hoy.getMonth();
    mm = 12;

    if (mm == 1) {
        var total = a1;
    } else
    if (mm == 2) {
        var total = a1 + a2;
    } else
    if (mm == 3) {
        var total = a1 + a2 + a3;
    } else
    if (mm == 4) {
        var total = a1 + a2 + a3 + a4;
    } else
    if (mm == 5) {
        var total = a1 + a2 + a3 + a4 + a5;
    } else
    if (mm == 6) {
        var total = a1 + a2 + a3 + a4 + a5 + a6;
    } else
    if (mm == 7) {
        var total = a1 + a2 + a3 + a4 + a5 + a6 + a7;
    } else
    if (mm == 8) {
        var total = a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8;
    } else
    if (mm == 9) {
        var total = a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8 + a9;
    } else
    if (mm == 10) {
        var total = a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8 + a9 + a10;
    } else
    if (mm == 11) {
        var total = a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8 + a9 + a10 + a11;
    } else
    if (mm == 12) {
        var total = a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8 + a9 + a10 + a11 + a12;
    }


    var b1 = parseInt(data[1].enero);
    var b2 = parseInt(data[1].febrero);
    var b3 = parseInt(data[1].marzo);
    var b4 = parseInt(data[1].abril);
    var b5 = parseInt(data[1].mayo);
    var b6 = parseInt(data[1].junio);
    var b7 = parseInt(data[1].julio);
    var b8 = parseInt(data[1].agosto);
    var b9 = parseInt(data[1].septiembre);
    var b10 = parseInt(data[1].octubre);
    var b11 = parseInt(data[1].noviembre);
    var b12 = parseInt(data[1].diciembre);

    if (mm == 1) {
        var total2 = b1;
    } else
    if (mm == 2) {
        var total2 = b1 + b2;
    } else
    if (mm == 3) {
        var total2 = b1 + b2 + b3;
    } else
    if (mm == 4) {
        var total2 = b1 + b2 + b3 + b4;
    } else
    if (mm == 5) {
        var total2 = b1 + b2 + b3 + b4 + b5;
    } else
    if (mm == 6) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6;
    } else
    if (mm == 7) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6 + b7;
    } else
    if (mm == 8) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6 + b7 + b8;
    } else
    if (mm == 9) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6 + b7 + b8 + b9;
    } else
    if (mm == 10) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6 + b7 + b8 + b9 + b10;
    } else
    if (mm == 11) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6 + b7 + b8 + b9 + b10 + b11;
    } else
    if (mm == 12) {
        var total2 = b1 + b2 + b3 + b4 + b5 + b6 + b7 + b8 + b9 + b10 + b11 + b12;
    }

    var enero = (parseInt(data[1].enero) * 100) / parseInt(data[0].enero);
    var febrero = (parseInt(data[1].febrero) * 100) / parseInt(data[0].febrero);
    var marzo = (parseInt(data[1].marzo) * 100) / parseInt(data[0].marzo);
    var abril = (parseInt(data[1].abril) * 100) / parseInt(data[0].abril);
    var mayo = (parseInt(data[1].mayo) * 100) / parseInt(data[0].mayo);
    var junio = (parseInt(data[1].junio) * 100) / parseInt(data[0].junio);
    var julio = (parseInt(data[1].julio) * 100) / parseInt(data[0].julio);
    var agosto = (parseInt(data[1].agosto) * 100) / parseInt(data[0].agosto);
    var septiembre = (parseInt(data[1].septiembre) * 100) / parseInt(data[0].septiembre);
    var octubre = (parseInt(data[1].octubre) * 100) / parseInt(data[0].octubre);
    var noviembre = (parseInt(data[1].noviembre) * 100) / parseInt(data[0].noviembre);
    var diciembre = (parseInt(data[1].diciembre) * 100) / parseInt(data[0].diciembre);
    var total3 = (parseInt(total2) * 100) / parseInt(total);

    if (isNaN(enero) == true || isFinite(enero) == false) {
        color = "FF8A8A";
        enero = 0;
    } else
    if (enero < 0) {
        color = "0B0B61";
    } else
    if (enero >= 0 && enero <= 70) {
        color = "FF8A8A";
    } else
    if (enero > 70 && enero <= 99) {
        color = "FFFF84";
    } else
    if (enero > 99) {
        color = "89FC63";
    }

    if (isNaN(febrero) == true || isFinite(febrero) == false) {
        color2 = "FF8A8A";
        febrero = 0;
    } else
    if (febrero < 0) {
        color2 = "0B0B61";
    } else
    if (febrero >= 0 && febrero <= 70) {
        color2 = "FF8A8A";
    } else
    if (febrero > 70 && febrero <= 99) {
        color2 = "FFFF84";
    } else
    if (febrero > 99) {
        color2 = "89FC63";
    }

    if (isNaN(marzo) == true || isFinite(marzo) == false) {
        color3 = "FF8A8A";
        marzo = 0;
    } else
    if (marzo < 0) {
        color3 = "0B0B61";
    } else
    if (marzo >= 0 && marzo <= 70) {
        color3 = "FF8A8A";
    } else
    if (marzo > 70 && marzo <= 99) {
        color3 = "FFFF84";
    } else
    if (marzo > 99) {
        color3 = "89FC63";
    }

    if (isNaN(abril) == true || isFinite(abril) == false) {
        color4 = "FF8A8A";
        abril = 0;
    } else
    if (abril < 0) {
        color4 = "0B0B61";
    } else
    if (abril >= 0 && abril <= 70) {
        color4 = "FF8A8A";
    } else
    if (abril > 70 && abril <= 99) {
        color4 = "FFFF84";
    } else
    if (abril > 99) {
        color4 = "89FC63";
    }

    if (isNaN(mayo) == true || isFinite(mayo) == false) {
        color5 = "FF8A8A";
        mayo = 0;
    } else
    if (mayo < 0) {
        color5 = "0B0B61";
    } else
    if (mayo >= 0 && mayo <= 70) {
        color5 = "FF8A8A";
    } else
    if (mayo > 70 && mayo <= 99) {
        color5 = "FFFF84";
    } else
    if (mayo > 99) {
        color5 = "89FC63";
    }

    if (isNaN(junio) == true || isFinite(junio) == false) {
        color6 = "FF8A8A";
        junio = 0;
    } else
    if (junio < 0) {
        color6 = "0B0B61";
    } else
    if (junio >= 0 && junio <= 70) {
        color6 = "FF8A8A";
    } else
    if (junio > 70 && junio <= 99) {
        color6 = "FFFF84";
    } else
    if (junio > 99) {
        color6 = "89FC63";
    }

    if (isNaN(julio) == true || isFinite(julio) == false) {
        color7 = "FF8A8A";
        julio = 0;
    } else
    if (julio < 0) {
        color7 = "0B0B61";
    } else
    if (julio >= 0 && julio <= 70) {
        color7 = "FF8A8A";
    } else
    if (julio > 70 && julio <= 99) {
        color7 = "FFFF84";
    } else
    if (julio > 99) {
        color7 = "89FC63";
    }

    if (isNaN(agosto) == true || isFinite(agosto) == false) {
        color8 = "FF8A8A";
        agosto = 0;
    } else
    if (agosto < 0) {
        color8 = "0B0B61";
    } else
    if (agosto >= 0 && agosto <= 70) {
        color8 = "FF8A8A";
    } else
    if (agosto > 70 && agosto <= 99) {
        color8 = "FFFF84";
    } else
    if (agosto > 99) {
        color8 = "89FC63";
    }

    if (isNaN(septiembre) == true || isFinite(septiembre) == false) {
        color9 = "FF8A8A";
        septiembre = 0;
    } else
    if (septiembre < 0) {
        color9 = "0B0B61";
    } else
    if (septiembre >= 0 && septiembre <= 70) {
        color9 = "FF8A8A";
    } else
    if (septiembre > 70 && septiembre <= 99) {
        color9 = "FFFF84";
    } else
    if (septiembre > 99) {
        color9 = "89FC63";
    }

    if (isNaN(octubre) == true || isFinite(octubre) == false) {
        color10 = "FF8A8A";
        octubre = 0;
    } else
    if (octubre < 0) {
        color10 = "0B0B61";
    } else
    if (octubre >= 0 && octubre <= 70) {
        color10 = "FF8A8A";
    } else
    if (octubre > 70 && octubre <= 99) {
        color10 = "FFFF84";
    } else
    if (octubre > 99) {
        color10 = "89FC63";
    }

    if (isNaN(noviembre) == true || isFinite(noviembre) == false) {
        color11 = "FF8A8A";
        noviembre = 0;
    } else
    if (noviembre < 0) {
        color11 = "0B0B61";
    } else
    if (noviembre >= 0 && noviembre <= 70) {
        color11 = "FF8A8A";
    } else
    if (noviembre > 70 && noviembre <= 99) {
        color11 = "FFFF84";
    } else
    if (noviembre > 99) {
        color11 = "89FC63";
    }

    if (isNaN(diciembre) == true || isFinite(diciembre) == false) {
        color12 = "FF8A8A";
        diciembre = 0;
    } else
    if (diciembre < 0) {
        color12 = "0B0B61";
    } else
    if (diciembre >= 0 && diciembre <= 70) {
        color12 = "FF8A8A";
    } else
    if (diciembre > 70 && diciembre <= 99) {
        color12 = "FFFF84";
    } else
    if (diciembre > 99) {
        color12 = "89FC63";
    }

    if (isNaN(total3) == true || isFinite(total3) == false) {
        color13 = "FF8A8A";
        total3 = 0;
    } else
    if (total3 >= 0 && total3 <= 70) {
        color13 = "FF8A8A";
    } else
    if (total3 > 70 && total3 <= 99) {
        color13 = "FFFF84";
    } else
    if (total3 > 99) {
        color13 = "89FC63";
    }

    ventas_manabi += "<div class=table-responsive>";
    ventas_manabi += "<table class=table>";
    ventas_manabi += "<thead>";
    ventas_manabi += "<tr class=info>";
    ventas_manabi += "<th style=text-align:center;>Ventas Manabí</th>";
    ventas_manabi += "<th style=text-align:center;>Enero</th>";
    ventas_manabi += "<th style=text-align:center;>Febrero</th>";
    ventas_manabi += "<th style=text-align:center;>Marzo</th>";
    ventas_manabi += "<th style=text-align:center;>Abril</th>";
    ventas_manabi += "<th style=text-align:center;>Mayo</th>";
    ventas_manabi += "<th style=text-align:center;>Junio</th>";
    ventas_manabi += "<th style=text-align:center;>Julio</th>";
    ventas_manabi += "<th style=text-align:center;>Agosto</th>";
    ventas_manabi += "<th style=text-align:center;>Septiembre</th>";
    ventas_manabi += "<th style=text-align:center;>Octubre</th>";
    ventas_manabi += "<th style=text-align:center;>Noviembre</th>";
    ventas_manabi += "<th style=text-align:center;>Diciembre</th>";
    ventas_manabi += "<th style=text-align:center;>TOTAL</th>";
    ventas_manabi += "</tr>";
    ventas_manabi += "</thead>";
    ventas_manabi += "<tbody>";
    ventas_manabi += "<tr class=warning>";
    ventas_manabi += "<th style=text-align:center;>Presupuesto Ventas USD</th>";
    ventas_manabi += "<td style=text-align:center;>" + data[0].enero + "</td>";
    ventas_manabi += "<td style=text-align:center;>" + data[0].febrero + "</td>";
    ventas_manabi += "<td style=text-align:center;>" + data[0].marzo + "</td>";
    ventas_manabi += "<td style=text-align:center;>" + data[0].abril + "</td>";
    ventas_manabi += "<td style=text-align:center;>" + data[0].mayo + "</td>";
    ventas_manabi += "<td style=text-align:center;>" + data[0].junio + "</td>";
    ventas_manabi += "<td style=text-align:center;>" + data[0].julio + "</td>";
    ventas_manabi += "<td style=text-align:center;>" + data[0].agosto + "</td>";
    ventas_manabi += "<td style=text-align:center;>" + data[0].septiembre + "</td>";
    ventas_manabi += "<td style=text-align:center;>" + data[0].octubre + "</td>";
    ventas_manabi += "<td style=text-align:center;>" + data[0].noviembre + "</td>";
    ventas_manabi += "<td style=text-align:center;>" + data[0].diciembre + "</td>";
    ventas_manabi += "<th style=text-align:center;>" + total + "</th>";
    ventas_manabi += "</tr>";
    ventas_manabi += "<tr class=warning>";
    ventas_manabi += "<th style=text-align:center;>Ventas por mes USD</th>";
    ventas_manabi += "<td style=text-align:center;>" + data[1].enero + "</td>";
    ventas_manabi += "<td style=text-align:center;>" + data[1].febrero + "</td>";
    ventas_manabi += "<td style=text-align:center;>" + data[1].marzo + "</td>";
    ventas_manabi += "<td style=text-align:center;>" + data[1].abril + "</td>";
    ventas_manabi += "<td style=text-align:center;>" + data[1].mayo + "</td>";
    ventas_manabi += "<td style=text-align:center;>" + data[1].junio + "</td>";
    ventas_manabi += "<td style=text-align:center;>" + data[1].julio + "</td>";
    ventas_manabi += "<td style=text-align:center;>" + data[1].agosto + "</td>";
    ventas_manabi += "<td style=text-align:center;>" + data[1].septiembre + "</td>";
    ventas_manabi += "<td style=text-align:center;>" + data[1].octubre + "</td>";
    ventas_manabi += "<td style=text-align:center;>" + data[1].noviembre + "</td>";
    ventas_manabi += "<td style=text-align:center;>" + data[1].diciembre + "</td>";
    ventas_manabi += "<th style=text-align:center;>" + total2 + "</th>";
    ventas_manabi += "</tr>";
    ventas_manabi += "<tr class=>";
    ventas_manabi += "<th style=text-align:center;>Alcance (%)</th>";
    ventas_manabi += "<th bgcolor=" + color + " style=text-align:center;>" + Math.round(enero) + "%</th>";
    ventas_manabi += "<th bgcolor=" + color2 + " style=text-align:center;>" + Math.round(febrero) + "%</th>";
    ventas_manabi += "<th bgcolor=" + color3 + " style=text-align:center;>" + Math.round(marzo) + "%</th>";
    ventas_manabi += "<th bgcolor=" + color4 + " style=text-align:center;>" + Math.round(abril) + "%</th>";
    ventas_manabi += "<th bgcolor=" + color5 + " style=text-align:center;>" + Math.round(mayo) + "%</th>";
    ventas_manabi += "<th bgcolor=" + color6 + " style=text-align:center;>" + Math.round(junio) + "%</th>";
    ventas_manabi += "<th bgcolor=" + color7 + " style=text-align:center;>" + Math.round(julio) + "%</th>";
    ventas_manabi += "<th bgcolor=" + color8 + " style=text-align:center;>" + Math.round(agosto) + "%</th>";
    ventas_manabi += "<th bgcolor=" + color9 + " style=text-align:center;>" + Math.round(septiembre) + "%</th>";
    ventas_manabi += "<th bgcolor=" + color10 + " style=text-align:center;>" + Math.round(octubre) + "%</th>";
    ventas_manabi += "<th bgcolor=" + color11 + " style=text-align:center;>" + Math.round(noviembre) + "%</th>";
    ventas_manabi += "<th bgcolor=" + color12 + " style=text-align:center;>" + Math.round(diciembre) + "%</th>";
    ventas_manabi += "<th bgcolor=" + color13 + " style=text-align:center;>" + Math.round(total3) + "%</th>";
    ventas_manabi += "</tr>";
    ventas_manabi += "</tbody>";
    ventas_manabi += "</table>";
    ventas_manabi += "</div>";

    $("#ventas_manabi").html(ventas_manabi);
    $("#ventas_manabi2").html(ventas_manabi);



    Highcharts.chart('container_manabi', {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Ventas Durante el Año en Manabí'
        },
        subtitle: {
            text: 'Nipro Medical Corporation'
        },
        xAxis: {
            categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        },
        yAxis: {
            title: {
                text: 'Dolares'
            },
            labels: {
                formatter: function () {
                    return this.value + '';
                }
            }
        },
        tooltip: {
            crosshairs: true,
            shared: true
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            }
        },
        series: [{
                name: 'Pronostico en ventas mensual USD',
                marker: {
                    symbol: 'square'
                },
                data: [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12]

            }, {
                name: 'Ventas por mes USD',
                marker: {
                    symbol: 'diamond'
                },
                data: [b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12]
            }]
    });

}

function indicadores() {

    $.ajax({
        url: 'php/controlador.php',
        data: {opcion: 15},
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            resumen_productos(json);
        }
    });
}

function resumen_productos(data) {

    var producto_renal = "";
    var producto_hospitalaria = "";
    var producto_diagnostica = "";
    var producto_endovascular = "";
    var producto_diabetes = "";
    var producto_cardiopulmonar = "";
    var celda = "";

    producto_renal += "<div class=table-responsive>";
    producto_renal += "<table class=table>";
    producto_renal += "<thead>";
    producto_renal += "<tr bgcolor=#DBF0F7>";
    producto_renal += "<th style=text-align:center;>Nombre Producto</th>";
    producto_renal += "<th style=text-align:center;>Presupuesto</th>";
    producto_renal += "<th style=text-align:center;>Ventas YTD</th>";
    producto_renal += "<th style=text-align:center;>Porcentaje</th>";
    producto_renal += "</tr>";
    producto_renal += "</thead>";
    producto_renal += "<tbody>";

    producto_hospitalaria += "<div class=table-responsive>";
    producto_hospitalaria += "<table class=table>";
    producto_hospitalaria += "<thead>";
    producto_hospitalaria += "<tr bgcolor=#DBF0F7>";
    producto_hospitalaria += "<th style=text-align:center;>Nombre Producto</th>";
    producto_hospitalaria += "<th style=text-align:center;>Presupuesto</th>";
    producto_hospitalaria += "<th style=text-align:center;>Ventas YTD</th>";
    producto_hospitalaria += "<th style=text-align:center;>Porcentaje</th>";
    producto_hospitalaria += "</tr>";
    producto_hospitalaria += "</thead>";
    producto_hospitalaria += "<tbody>";

    producto_diagnostica += "<div class=table-responsive>";
    producto_diagnostica += "<table class=table>";
    producto_diagnostica += "<thead>";
    producto_diagnostica += "<tr bgcolor=#DBF0F7>";
    producto_diagnostica += "<th style=text-align:center;>Nombre Producto</th>";
    producto_diagnostica += "<th style=text-align:center;>Presupuesto</th>";
    producto_diagnostica += "<th style=text-align:center;>Ventas YTD</th>";
    producto_diagnostica += "<th style=text-align:center;>Porcentaje</th>";
    producto_diagnostica += "</tr>";
    producto_diagnostica += "</thead>";
    producto_diagnostica += "<tbody>";

    producto_endovascular += "<div class=table-responsive>";
    producto_endovascular += "<table class=table>";
    producto_endovascular += "<thead>";
    producto_endovascular += "<tr bgcolor=#DBF0F7>";
    producto_endovascular += "<th style=text-align:center;>Nombre Producto</th>";
    producto_endovascular += "<th style=text-align:center;>Presupuesto</th>";
    producto_endovascular += "<th style=text-align:center;>Ventas YTD</th>";
    producto_endovascular += "<th style=text-align:center;>Porcentaje</th>";
    producto_endovascular += "</tr>";
    producto_endovascular += "</thead>";
    producto_endovascular += "<tbody>";

    producto_diabetes += "<div class=table-responsive>";
    producto_diabetes += "<table class=table>";
    producto_diabetes += "<thead>";
    producto_diabetes += "<tr bgcolor=#DBF0F7>";
    producto_diabetes += "<th style=text-align:center;>Nombre Producto</th>";
    producto_diabetes += "<th style=text-align:center;>Presupuesto</th>";
    producto_diabetes += "<th style=text-align:center;>Ventas YTD</th>";
    producto_diabetes += "<th style=text-align:center;>Porcentaje</th>";
    producto_diabetes += "</tr>";
    producto_diabetes += "</thead>";
    producto_diabetes += "<tbody>";

    producto_cardiopulmonar += "<div class=table-responsive>";
    producto_cardiopulmonar += "<table class=table>";
    producto_cardiopulmonar += "<thead>";
    producto_cardiopulmonar += "<tr bgcolor=#DBF0F7>";
    producto_cardiopulmonar += "<th style=text-align:center;>Nombre Producto</th>";
    producto_cardiopulmonar += "<th style=text-align:center;>Presupuesto</th>";
    producto_cardiopulmonar += "<th style=text-align:center;>Ventas YTD</th>";
    producto_cardiopulmonar += "<th style=text-align:center;>Porcentaje</th>";
    producto_cardiopulmonar += "</tr>";
    producto_cardiopulmonar += "</thead>";
    producto_cardiopulmonar += "<tbody>";

    for (i = 0; i < data.length; i++) {
        if (data[i].id_linea == 1) {

            producto_renal += "<tr bgcolor=EFF9FC>";
            producto_renal += "<td style=text-align:center;>" + data[i].nombre_producto + "</td>";
            producto_renal += "<td style=text-align:center;>" + data[i].presupuesto + "</td>";
            producto_renal += "<td style=text-align:center;>" + data[i].total + "</td>";
            var renal_porcentaje = (parseInt(data[i].total) * 100) / parseInt(data[i].presupuesto);

            if (isNaN(renal_porcentaje) == true || isFinite(renal_porcentaje) == false) {
                celda = "FF8A8A";
                renal_porcentaje = 0;
            } else
            if (renal_porcentaje >= 0 && renal_porcentaje <= 70) {
                celda = "FF8A8A";
            } else
            if (renal_porcentaje > 70 && renal_porcentaje <= 99) {
                celda = "FFFF84";
            } else
            if (renal_porcentaje > 99) {
                celda = "D1FFB3";
            }

            var porce1 = Math.round(renal_porcentaje);
            producto_renal += "<td bgcolor=" + celda + ">";
            producto_renal += "<div class=progress>";
            if (porce1 > 100) {
                producto_renal += "<div class=progress-bar progress-bar-warning progress-bar-striped style=width:" + 100 + "% >" + Math.round(renal_porcentaje) + "%</div>";
            } else {
                producto_renal += "<div class=progress-bar progress-bar-warning progress-bar-striped style=width:" + Math.round(renal_porcentaje) + "% >" + Math.round(renal_porcentaje) + "%</div>";
            }
            producto_renal += "</div>";
            producto_renal += "</td>";
            producto_renal += "</tr>";


        } else
        if (data[i].id_linea == 2) {

            producto_hospitalaria += "<tr bgcolor=EFF9FC>";
            producto_hospitalaria += "<td style=text-align:center;>" + data[i].nombre_producto + "</td>";
            producto_hospitalaria += "<td style=text-align:center;>" + data[i].presupuesto + "</td>";
            producto_hospitalaria += "<td style=text-align:center;>" + data[i].total + "</td>";
            var hospitalaria_porcentaje = (parseInt(data[i].total) * 100) / parseInt(data[i].presupuesto);

            if (isNaN(hospitalaria_porcentaje) == true || isFinite(hospitalaria_porcentaje) == false) {
                celda = "FF8A8A";
                hospitalaria_porcentaje = 0;
            } else
            if (hospitalaria_porcentaje >= 0 && hospitalaria_porcentaje <= 70) {
                celda = "FF8A8A";
            } else
            if (hospitalaria_porcentaje > 70 && hospitalaria_porcentaje <= 99) {
                celda = "FFFF84";
            } else
            if (hospitalaria_porcentaje > 99) {
                celda = "D1FFB3";
            }

            var porce2 = Math.round(hospitalaria_porcentaje);
            producto_hospitalaria += "<td bgcolor=" + celda + ">";
            producto_hospitalaria += "<div class=progress>";
            if (porce2 > 100) {
                producto_hospitalaria += "<div class=progress-bar progress-bar-warning progress-bar-striped style=width:" + 100 + "% >" + Math.round(hospitalaria_porcentaje) + "%</div>";
            } else {
                producto_hospitalaria += "<div class=progress-bar progress-bar-warning progress-bar-striped style=width:" + Math.round(hospitalaria_porcentaje) + "% >" + Math.round(hospitalaria_porcentaje) + "%</div>";
            }
            producto_hospitalaria += "</div>";
            producto_hospitalaria += "</td>";
            producto_hospitalaria += "</tr>";

        } else
        if (data[i].id_linea == 3) {

            producto_diagnostica += "<tr bgcolor=EFF9FC>";
            producto_diagnostica += "<td style=text-align:center;>" + data[i].nombre_producto + "</td>";
            producto_diagnostica += "<td style=text-align:center;>" + data[i].presupuesto + "</td>";
            producto_diagnostica += "<td style=text-align:center;>" + data[i].total + "</td>";

            var diagnostica_porcentaje = (parseInt(data[i].total) * 100) / parseInt(data[i].presupuesto);

            if (isNaN(diagnostica_porcentaje) == true || isFinite(diagnostica_porcentaje) == false) {
                celda = "FF8A8A";
                diagnostica_porcentaje = 0;
            } else
            if (diagnostica_porcentaje >= 0 && diagnostica_porcentaje <= 70) {
                celda = "FF8A8A";
            } else
            if (diagnostica_porcentaje > 70 && diagnostica_porcentaje <= 99) {
                celda = "FFFF84";
            } else
            if (diagnostica_porcentaje > 99) {
                celda = "D1FFB3";
            }

            var porce3 = Math.round(diagnostica_porcentaje);
            producto_diagnostica += "<td bgcolor=" + celda + ">";
            producto_diagnostica += "<div class=progress>";
            if (porce3 > 100) {
                producto_diagnostica += "<div class=progress-bar progress-bar-warning progress-bar-striped style=width:" + 100 + "% >" + Math.round(diagnostica_porcentaje) + "%</div>";
            } else {
                producto_diagnostica += "<div class=progress-bar progress-bar-warning progress-bar-striped style=width:" + Math.round(diagnostica_porcentaje) + "% >" + Math.round(diagnostica_porcentaje) + "%</div>";
            }
            producto_diagnostica += "</div>";
            producto_diagnostica += "</td>";
            producto_diagnostica += "</tr>";

        } else
        if (data[i].id_linea == 4) {

            producto_endovascular += "<tr bgcolor=EFF9FC>";
            producto_endovascular += "<td style=text-align:center;>" + data[i].nombre_producto + "</td>";
            producto_endovascular += "<td style=text-align:center;>" + data[i].presupuesto + "</td>";
            producto_endovascular += "<td style=text-align:center;>" + data[i].total + "</td>";
            var edovascular_porcentaje = (parseInt(data[i].total) * 100) / parseInt(data[i].presupuesto);

            if (isNaN(edovascular_porcentaje) == true || isFinite(edovascular_porcentaje) == false) {
                celda = "FF8A8A";
                edovascular_porcentaje = 0;
            } else
            if (edovascular_porcentaje >= 0 && edovascular_porcentaje <= 70) {
                celda = "FF8A8A";
            } else
            if (edovascular_porcentaje > 70 && edovascular_porcentaje <= 99) {
                celda = "FFFF84";
            } else
            if (edovascular_porcentaje > 99) {
                celda = "D1FFB3";
            }

            var porce4 = Math.round(edovascular_porcentaje);
            producto_endovascular += "<td bgcolor=" + celda + ">";
            producto_endovascular += "<div class=progress>";
            if (porce4 > 100) {
                producto_endovascular += "<div class=progress-bar progress-bar-warning progress-bar-striped style=width:" + 100 + "% >" + Math.round(edovascular_porcentaje) + "%</div>";
            } else {
                producto_endovascular += "<div class=progress-bar progress-bar-warning progress-bar-striped style=width:" + Math.round(edovascular_porcentaje) + "% >" + Math.round(edovascular_porcentaje) + "%</div>";
            }
            producto_endovascular += "</div>";
            producto_endovascular += "</td>";
            producto_endovascular += "</tr>";

        } else
        if (data[i].id_linea == 5) {

            producto_diabetes += "<tr bgcolor=EFF9FC>";
            producto_diabetes += "<td style=text-align:center;>" + data[i].nombre_producto + "</td>";
            producto_diabetes += "<td style=text-align:center;>" + data[i].presupuesto + "</td>";
            producto_diabetes += "<td style=text-align:center;>" + data[i].total + "</td>";
            var diabetes_porcentaje = (parseInt(data[i].total) * 100) / parseInt(data[i].presupuesto);

            if (isNaN(diabetes_porcentaje) == true || isFinite(diabetes_porcentaje) == false) {
                celda = "FF8A8A";
                diabetes_porcentaje = 0;
            } else
            if (diabetes_porcentaje >= 0 && diabetes_porcentaje <= 70) {
                celda = "FF8A8A";
            } else
            if (diabetes_porcentaje > 70 && diabetes_porcentaje <= 99) {
                celda = "FFFF84";
            } else
            if (diabetes_porcentaje > 99) {
                celda = "D1FFB3";
            }

            var porce5 = Math.round(diabetes_porcentaje);
            producto_diabetes += "<td bgcolor=" + celda + ">";
            producto_diabetes += "<div class=progress>";
            if (porce5 > 100) {
                producto_diabetes += "<div class=progress-bar progress-bar-warning progress-bar-striped style=width:" + 100 + "% >" + Math.round(diabetes_porcentaje) + "%</div>";
            } else {
                producto_diabetes += "<div class=progress-bar progress-bar-warning progress-bar-striped style=width:" + Math.round(diabetes_porcentaje) + "% >" + Math.round(diabetes_porcentaje) + "%</div>";
            }
            producto_diabetes += "</div>";
            producto_diabetes += "</td>";
            producto_diabetes += "</tr>";

        } else
        if (data[i].id_linea == 6) {

            producto_cardiopulmonar += "<tr bgcolor=EFF9FC>";
            producto_cardiopulmonar += "<td style=text-align:center;>" + data[i].nombre_producto + "</td>";
            producto_cardiopulmonar += "<td style=text-align:center;>" + data[i].presupuesto + "</td>";
            producto_cardiopulmonar += "<td style=text-align:center;>" + data[i].total + "</td>";
            var cardiopulmonar_porcentaje = (parseInt(data[i].total) * 100) / parseInt(data[i].presupuesto);

            if (isNaN(cardiopulmonar_porcentaje) == true || isFinite(cardiopulmonar_porcentaje) == false) {
                celda = "FF8A8A";
                cardiopulmonar_porcentaje = 0;
            } else
            if (cardiopulmonar_porcentaje >= 0 && cardiopulmonar_porcentaje <= 70) {
                celda = "FF8A8A";
            } else
            if (cardiopulmonar_porcentaje > 70 && cardiopulmonar_porcentaje <= 99) {
                celda = "FFFF84";
            } else
            if (cardiopulmonar_porcentaje > 99) {
                celda = "D1FFB3";
            }

            var porce6 = Math.round(cardiopulmonar_porcentaje);
            producto_cardiopulmonar += "<td bgcolor=" + celda + ">";
            producto_cardiopulmonar += "<div class=progress>";
            if (porce6 > 100) {
                producto_cardiopulmonar += "<div class=progress-bar progress-bar-warning progress-bar-striped style=width:" + 100 + "% >" + Math.round(cardiopulmonar_porcentaje) + "%</div>";
            } else {
                producto_cardiopulmonar += "<div class=progress-bar progress-bar-warning progress-bar-striped style=width:" + Math.round(cardiopulmonar_porcentaje) + "% >" + Math.round(cardiopulmonar_porcentaje) + "%</div>";
            }
            producto_cardiopulmonar += "</div>";
            producto_cardiopulmonar += "</td>";
            producto_cardiopulmonar += "</tr>";

        }
    }
    producto_renal += "</tbody>";
    producto_renal += "</table>";
    producto_renal += "</div>";

    producto_hospitalaria += "</tbody>";
    producto_hospitalaria += "</table>";
    producto_hospitalaria += "</div>";

    producto_diagnostica += "</tbody>";
    producto_diagnostica += "</table>";
    producto_diagnostica += "</div>";

    producto_endovascular += "</tbody>";
    producto_endovascular += "</table>";
    producto_endovascular += "</div>";

    producto_diabetes += "</tbody>";
    producto_diabetes += "</table>";
    producto_diabetes += "</div>";

    producto_cardiopulmonar += "</tbody>";
    producto_cardiopulmonar += "</table>";
    producto_cardiopulmonar += "</div>";

    $("#producto_renal").html(producto_renal);
    $("#producto_hospitalaria").html(producto_hospitalaria);
    $("#producto_diagnostica").html(producto_diagnostica);
    $("#producto_endovascular").html(producto_endovascular);
    $("#producto_diabetes").html(producto_diabetes);
    $("#producto_cardiopulmonar").html(producto_cardiopulmonar);


}

function cambiar_clave() {

    var nickname = $("#nombre_usuario").val();
    var c_nueva = $("#c_nueva").val();
    var c_nueva_2 = $("#c_nueva_2").val();


    if (c_nueva === c_nueva_2) {

        $.ajax({
            url: 'php/controlador.php',
            data: {opcion: 20, dato: nickname, dato2: c_nueva, dato3: c_nueva_2},
            type: 'GET',
            dataType: 'json',
            error: function (xhr, status) {
                swal({
                    title: 'GRACIAS',
                    text: "Su contraseña se actualizó correctamente",
                    type: 'success',
                    showCancelButton: false,
                    confirmButtonText: 'OK'
                }).then(function () {
                    location.href = "";
                })
            },
        });

    } else
        swal(
                'ERROR',
                'Las contraseñas nuevas no coinciden',
                'error'
                )

}




