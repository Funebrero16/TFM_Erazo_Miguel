jQuery(document).on('submit', '#formlg', function (event) {

    event.preventDefault();

    jQuery.ajax({
        url: 'login.php',
        type: 'POST',
        dataType: 'json',
        data: $(this).serialize(),
        beforeSend: function () {

        }
    })
            .done(function (respuesta) {
                console.log(respuesta);
                if (!respuesta.error) {
                    if (respuesta.tipo == 'administrador') {
                        var loading = "";
                        loading += "<button type='submit' class='btn btn-info'>Cargando <i class='glyphicon glyphicon-refresh'></i></button>";
                        $("#loading").html(loading);
                        swal({
                            title: 'La herramienta esta actualizada al cierre del año 2020',
                            text: "",
                            type: 'info',
                            showCancelButton: false,
                            confirmButtonText: 'OK'
                        }).then(function () {
                            location.href = 'administrador.php';
                        })

                    } else
                    if (respuesta.tipo == 'usuario') {
                        var loading = "";
                        loading += "<button type='submit' class='btn btn-info'>Cargando <i class='glyphicon glyphicon-refresh'></i></button>";
                        $("#loading").html(loading);
                        swal({
                            title: 'La herramienta esta actualizada al cierre del año 2020',
                            text: "",
                            type: 'info',
                            showCancelButton: false,
                            confirmButtonText: 'OK'
                        }).then(function () {
                            location.href = 'usuario.php';
                        })

                    }

                } else {

                    var loading = "";
                    loading += "<button type='submit' class='btn btn-info'>Cargando <i class='glyphicon glyphicon-refresh'></i></button>";
                    $("#loading").html(loading);

                    setTimeout(function () {
                        var loading = "";
                        loading += "<button type='submit' class='btn btn-info'>Iniciar Sesión <i class='glyphicon glyphicon-user'></i></button>";
                        $("#loading").html(loading);
                        swal(
                                'ERROR',
                                'Revise la contraeña o el nombre de usuario',
                                'error'
                                )
                    }, 300);

                }
            })
            .fail(function (resp) {
                console.log(resp.responseText);
            })
            .always(function () {
                console.log("complete");
            });
});