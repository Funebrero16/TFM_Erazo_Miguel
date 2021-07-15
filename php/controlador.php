<?php

$opcion = $_GET['opcion'];

switch ($opcion) {
    case "1":
        return get_datos();
        break;
    case "2":
        $id_linea = $_GET['dato'];
        return leer_datos($id_linea);
        break;
    case "3":
        $id_producto = $_GET['dato'];
        $id_sub_producto = $_GET['dato2'];
        return info_producto($id_producto, $id_sub_producto);
        break;
    case "4":
        $id_producto = $_GET['dato'];
        $id_sub_producto = $_GET['dato2'];
        return importacion_producto($id_producto, $id_sub_producto);
        break;
    case "5":
        $id_producto = $_GET['dato'];
        $id_sub_producto = $_GET['dato2'];
        return stock_producto($id_producto, $id_sub_producto);
        break;
    case "6":
        $id_producto = $_GET['dato'];
        $id_sub_producto = $_GET['dato2'];
        return forecast_producto($id_producto, $id_sub_producto);
        break;
    case "7":
        $id_producto = $_GET['dato'];
        $id_sub_producto = $_GET['dato2'];
        return ventas_producto($id_producto, $id_sub_producto);
        break;
    case "8":
        $id_producto = $_GET['dato'];
        $id_sub_producto = $_GET['dato2'];
        return ventas_cant_producto($id_producto, $id_sub_producto);
        break;
    case "9":
        $id_producto = $_GET['dato'];
        $id_sub_producto = $_GET['dato2'];
        return ventas_terri_producto($id_producto, $id_sub_producto);
        break;
    case "10":
        $id_producto = $_GET['dato'];
        $id_sub_producto = $_GET['dato2'];
        return ventas_sierra_producto($id_producto, $id_sub_producto);
        break;
    case "11":
        $id_producto = $_GET['dato'];
        $id_sub_producto = $_GET['dato2'];
        return ventas_costa_producto($id_producto, $id_sub_producto);
        break;
    case "12":
        $id_producto = $_GET['dato'];
        $id_sub_producto = $_GET['dato2'];
        return ventas_austro_producto($id_producto, $id_sub_producto);
        break;
    case "13":
        $id_producto = $_GET['dato'];
        $id_sub_producto = $_GET['dato2'];
        return ventas_manabi_producto($id_producto, $id_sub_producto);
        break;
    case "14":
        $id_producto = $_GET['dato'];
        return sub_productos($id_producto);
        break;
    case "15":
        return resumen_productos();
        break;
    case "16":
        return resumen_ventas_productos();
        break;
    case "17":
        $ventas = $_GET['dato3'];
        $presupuesto = $_GET['dato4'];
        $id_producto = $_GET['dato'];
        $id_sub_producto = $_GET['dato2'];
        return actualizar_ventas($ventas, $presupuesto, $id_producto, $id_sub_producto);
        break;
    case "18":
        $opcion = $_GET['dato'];
        return generar_reporte($opcion);
        break;
    case "19":
        $nickname = $_GET['dato'];
        return verificar_datos($nickname);
        break;
    case "20":
        $nickname = $_GET['dato'];
        $c_nueva = $_GET['dato2'];
        $c_nueva_2 = $_GET['dato3'];
        return cambiar_clave($nickname, $c_nueva, $c_nueva_2);
        break;
    default:
        echo "opcion no valida";
}

function get_datos() {
    include 'database.php';
    $pdo = Database::connect();
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = 'SELECT * FROM tb_lineas';
    $statement = $pdo->prepare($sql);
    $statement->execute();
    $results = $statement->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($results);
    Database::disconnect();
    echo $json;
}

function leer_datos($id_linea) {
    include 'database.php';
    $pdo = Database::connect();
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "SELECT * FROM tb_productos_nuevos where id_linea = ?";
    $q = $pdo->prepare($sql);
    $q->execute(array($id_linea));
    $data = $q->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($data);
    Database::disconnect();
    echo $json;
}

function info_producto($id_producto, $id_sub_producto) {
    include 'database.php';
    $pdo = Database::connect();
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "SELECT * FROM tb_info_general where id_producto = ? and id_sub_producto = ?";
    $q = $pdo->prepare($sql);
    $q->execute(array($id_producto, $id_sub_producto));
    $data = $q->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($data);
    Database::disconnect();
    echo $json;
}

function importacion_producto($id_producto, $id_sub_producto) {
    include 'database.php';
    $pdo = Database::connect();
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "SELECT * FROM tb_importacion where id_producto = ? and id_sub_producto = ?";
    $q = $pdo->prepare($sql);
    $q->execute(array($id_producto, $id_sub_producto));
    $data = $q->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($data);
    Database::disconnect();
    echo $json;
}

function stock_producto($id_producto, $id_sub_producto) {
    include 'database.php';
    $pdo = Database::connect();
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "SELECT * FROM tb_stock where id_producto = ? and id_sub_producto = ?";
    $q = $pdo->prepare($sql);
    $q->execute(array($id_producto, $id_sub_producto));
    $data = $q->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($data);
    Database::disconnect();
    echo $json;
}

function forecast_producto($id_producto, $id_sub_producto) {
    include 'database.php';
    $pdo = Database::connect();
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "SELECT * FROM tb_forecast where id_producto = ? and id_sub_producto = ?";
    $q = $pdo->prepare($sql);
    $q->execute(array($id_producto, $id_sub_producto));
    $data = $q->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($data);
    Database::disconnect();
    echo $json;
}

function ventas_producto($id_producto, $id_sub_producto) {
    include 'database.php';
    $pdo = Database::connect();
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "SELECT * FROM tb_ventas where id_producto = ? and id_sub_producto = ?";
    $q = $pdo->prepare($sql);
    $q->execute(array($id_producto, $id_sub_producto));
    $data = $q->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($data);
    Database::disconnect();
    echo $json;
}

function ventas_cant_producto($id_producto, $id_sub_producto) {
    include 'database.php';
    $pdo = Database::connect();
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "SELECT * FROM tb_ventas_cant where id_producto = ? and id_sub_producto = ?";
    $q = $pdo->prepare($sql);
    $q->execute(array($id_producto, $id_sub_producto));
    $data = $q->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($data);
    Database::disconnect();
    echo $json;
}

function ventas_terri_producto($id_producto, $id_sub_producto) {
    include 'database.php';
    $pdo = Database::connect();
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "SELECT * FROM tb_ventas_terri where id_producto = ? and id_sub_producto = ?";
    $q = $pdo->prepare($sql);
    $q->execute(array($id_producto, $id_sub_producto));
    $data = $q->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($data);
    Database::disconnect();
    echo $json;
}

function ventas_sierra_producto($id_producto, $id_sub_producto) {
    include 'database.php';
    $pdo = Database::connect();
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "SELECT * FROM tb_ventas_sierra where id_producto = ? and id_sub_producto = ?";
    $q = $pdo->prepare($sql);
    $q->execute(array($id_producto, $id_sub_producto));
    $data = $q->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($data);
    Database::disconnect();
    echo $json;
}

function ventas_costa_producto($id_producto, $id_sub_producto) {
    include 'database.php';
    $pdo = Database::connect();
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "SELECT * FROM tb_ventas_costa where id_producto = ? and id_sub_producto = ?";
    $q = $pdo->prepare($sql);
    $q->execute(array($id_producto, $id_sub_producto));
    $data = $q->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($data);
    Database::disconnect();
    echo $json;
}

function ventas_austro_producto($id_producto, $id_sub_producto) {
    include 'database.php';
    $pdo = Database::connect();
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "SELECT * FROM tb_ventas_austro where id_producto = ? and id_sub_producto = ?";
    $q = $pdo->prepare($sql);
    $q->execute(array($id_producto, $id_sub_producto));
    $data = $q->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($data);
    Database::disconnect();
    echo $json;
}

function ventas_manabi_producto($id_producto, $id_sub_producto) {
    include 'database.php';
    $pdo = Database::connect();
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "SELECT * FROM tb_ventas_manabi where id_producto = ? and id_sub_producto = ?";
    $q = $pdo->prepare($sql);
    $q->execute(array($id_producto, $id_sub_producto));
    $data = $q->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($data);
    Database::disconnect();
    echo $json;
}

function sub_productos($id_producto) {
    include 'database.php';
    $pdo = Database::connect();
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "SELECT * FROM tb_sub_productos_nuevos where id_producto = ?";
    $q = $pdo->prepare($sql);
    $q->execute(array($id_producto));
    $data = $q->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($data);
    Database::disconnect();
    echo $json;
}

function resumen_productos() {
    include 'database.php';
    $pdo = Database::connect();
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "SELECT * FROM tb_sub_productos_nuevos ORDER by id_linea, id_producto ASC";
    $q = $pdo->prepare($sql);
    $q->execute(array());
    $data = $q->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($data);
    Database::disconnect();
    echo $json;
}

function resumen_ventas_productos() {
    include 'database.php';
    $pdo2 = Database::connect();
    $pdo2->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql2 = "SELECT * FROM tb_ventas";
    $q2 = $pdo2->prepare($sql2);
    $q2->execute(array());
    $data2 = $q2->fetchAll(PDO::FETCH_ASSOC);
    $json2 = json_encode($data2);
    Database::disconnect();
    echo $json2;
}

function actualizar_ventas($ventas, $presupuesto, $id_producto, $id_sub_producto) {
    include 'database.php';
    $pdo = Database::connect();
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "UPDATE `tb_sub_productos_nuevos` SET `presupuesto` = ?, `total` = ? WHERE `id_producto` = ? and `id_sub_producto` = ?";
    $q = $pdo->prepare($sql);
    $q->execute(array($ventas, $presupuesto, $id_producto, $id_sub_producto));
    Database::disconnect();
}

function generar_reporte($opcion) {
    include 'database.php';
    $pdo = Database::connect();
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    if ($opcion == 'mes_actual') {
        $sql = "select * from reporte_usuario where month(fecha)=month(NOW()) ORDER BY `id` DESC";
    } else
    if ($opcion == 'mes_anterior') {
        $sql = "select * from reporte_usuario where month(fecha)=month(NOW())-1 ORDER BY `id` DESC";
    } else
    if ($opcion == '3meses') {
        $sql = "select * from reporte_usuario where month(fecha)=month(NOW())-3 UNION
                select * from reporte_usuario where month(fecha)=month(NOW())-2 UNION
                select * from reporte_usuario where month(fecha)=month(NOW())-1  ORDER BY `id` DESC";
    } else
    if ($opcion == '6meses') {
        $sql = "select * from reporte_usuario where month(fecha)=month(NOW())-6 UNION
                select * from reporte_usuario where month(fecha)=month(NOW())-5 UNION
                select * from reporte_usuario where month(fecha)=month(NOW())-4 UNION
                select * from reporte_usuario where month(fecha)=month(NOW())-3 UNION
                select * from reporte_usuario where month(fecha)=month(NOW())-2 UNION
                select * from reporte_usuario where month(fecha)=month(NOW())-1  ORDER BY `id` DESC";
    } else
    if ($opcion == 'ano_actual') {
        $sql = "select * from reporte_usuario where YEAR(fecha)=YEAR(NOW())  ORDER BY `id` DESC";
    } else
    if ($opcion == 'historico') {
        $sql = "select * from reporte_usuario  ORDER BY `id` DESC";
    }

    $q = $pdo->prepare($sql);
    $q->execute(array());
    $data = $q->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($data);
    Database::disconnect();

    $result = json_decode($json, true);

    /** Se agrega la libreria PHPExcel */
    require_once '../lib/PHPExcel/PHPExcel.php';

// Se crea el objeto PHPExcel
    $objPHPExcel = new PHPExcel();

    $tituloReporte = "REPORTE DE USUARIOS";
    $titulosColumnas = array('Nombre', 'Tipo de Usuario', 'Fecha', 'Hora');

// Se combinan las celdas A1 hasta D1, para colocar ahí el titulo del reporte
    $objPHPExcel->setActiveSheetIndex(0)
            ->mergeCells('A1:D1');

// Se agregan los titulos del reporte
    $objPHPExcel->setActiveSheetIndex(0)
            ->setCellValue('A1', $tituloReporte) // Titulo del reporte
            ->setCellValue('A3', $titulosColumnas[0])  //Titulo de las columnas
            ->setCellValue('B3', $titulosColumnas[1])
            ->setCellValue('C3', $titulosColumnas[2])
            ->setCellValue('D3', $titulosColumnas[3]);



    $i = 4; //Numero de fila donde se va a comenzar a rellenar
    while ($i < 5) {
        foreach ($result as $reporte) {
            $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue('A' . $i, $reporte["usuario"])
                    ->setCellValue('B' . $i, $reporte["tipo_usuario"])
                    ->setCellValue('C' . $i, $reporte["fecha"])
                    ->setCellValue('D' . $i, $reporte["hora"]);
            $i++;
        }
    }

    $estiloTituloReporte = array(
        'font' => array(
            'name' => 'Time New Roman',
            'bold' => true,
            'italic' => false,
            'strike' => false,
            'size' => 16,
            'color' => array(
                'rgb' => '2874A6'
            )
        ),
        'alignment' => array(
            'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
            'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
            'rotation' => 0,
            'wrap' => TRUE
        )
    );

    $estiloTituloColumnas = array(
        'font' => array(
            'name' => 'Time New Roman',
            'bold' => true,
            'color' => array(
                'rgb' => 'ffffff'
            )
        ),
        'fill' => array(
            'type' => PHPExcel_Style_Fill::FILL_GRADIENT_LINEAR,
            'rotation' => 90,
            'startcolor' => array(
                'rgb' => '0D47A1'
            ),
            'endcolor' => array(
                'argb' => 'FF431a5d'
            )
        ),
        'borders' => array(
            'top' => array(
                'style' => PHPExcel_Style_Border::BORDER_MEDIUM,
                'color' => array(
                    'rgb' => '143860'
                )
            ),
            'bottom' => array(
                'style' => PHPExcel_Style_Border::BORDER_MEDIUM,
                'color' => array(
                    'rgb' => '143860'
                )
            )
        ),
        'alignment' => array(
            'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
            'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
            'wrap' => TRUE
        )
    );

    $estiloInformacion = new PHPExcel_Style();
    $estiloInformacion->applyFromArray(array(
        'font' => array(
            'name' => 'Time New Roman',
            'color' => array(
                'rgb' => '000000'
            )
        ),
        'alignment' => array(
            'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
            'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
            'wrap' => TRUE
        ),
        'borders' => array(
            'allborders' => array(
                'style' => PHPExcel_Style_Border::BORDER_THIN,
                'color' => array('rgb' => '000000'
                )
            )
        )
    ));

    $objPHPExcel->getActiveSheet()->getStyle('A1:D1')->applyFromArray($estiloTituloReporte);
    $objPHPExcel->getActiveSheet()->getStyle('A3:D3')->applyFromArray($estiloTituloColumnas);
    $objPHPExcel->getActiveSheet()->setSharedStyle($estiloInformacion, "A4:D" . ($i - 1));

    for ($i = 'A'; $i <= 'D'; $i++) {
        $objPHPExcel->setActiveSheetIndex(0)->getColumnDimension($i)->setAutoSize(TRUE);
    }

// Se asigna el nombre a la hoja
    $objPHPExcel->getActiveSheet()->setTitle('Reporte');

// Se activa la hoja para que sea la que se muestre cuando el archivo se abre
    $objPHPExcel->setActiveSheetIndex(0);

// Inmovilizar paneles
//$objPHPExcel->getActiveSheet(0)->freezePane('A4');
    $objPHPExcel->getActiveSheet(0)->freezePaneByColumnAndRow(0, 4);

    $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');

//    $fecha = date("d-m-Y");
//    $filename = 'Reporte-' . $fecha . '.xlsx';

    $filename = 'Reporte.xlsx';

    $objWriter->save('../Reportes/' . $filename);
}

function verificar_datos($nickname) {

    include 'database.php';
    $pdo = Database::connect();
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT * FROM usuarios where usuario = ?";
    $q = $pdo->prepare($sql);
    $q->execute(array($nickname));
    $data = $q->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($data);
    Database::disconnect();
    echo $json;
    
}

function cambiar_clave($nickname, $c_nueva, $c_nueva_2) {

    include 'database.php';
    $pdo = Database::connect();
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "UPDATE `usuarios` SET `password` = ? WHERE `usuario` = ?";
    $q = $pdo->prepare($sql);
    $q->execute(array($c_nueva, $nickname));
    $data = $q->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($data);
    Database::disconnect();
    echo $json;
    
}
