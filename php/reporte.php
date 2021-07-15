<?php

include 'database.php';
$pdo = Database::connect();
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$sql = "SELECT * FROM reporte_usuario";
$q = $pdo->prepare($sql);
$q->execute(array());
$data = $q->fetchAll(PDO::FETCH_ASSOC);
$json = json_encode($data);
Database::disconnect();

$result = json_decode($json, true);

//Se agregan los datos de los alumnos
// 
//foreach ($result as $reporte) {
//    echo($reporte["usuario"]);
//    echo("  ".$reporte["tipo_usuario"]);
//    echo("  ".$reporte["fecha"]);
//    echo "<br>";
//}


/** Se agrega la libreria PHPExcel */
require_once '../lib/PHPExcel/PHPExcel.php';

// Se crea el objeto PHPExcel
$objPHPExcel = new PHPExcel();


$tituloReporte = "REPORTE DE USUARIOS";
$titulosColumnas = array('Nombre', 'Tipo de Usuario', 'Fecha');

// Se combinan las celdas A1 hasta D1, para colocar ahí el titulo del reporte
$objPHPExcel->setActiveSheetIndex(0)
        ->mergeCells('A1:C1');

// Se agregan los titulos del reporte
$objPHPExcel->setActiveSheetIndex(0)
        ->setCellValue('A1', $tituloReporte) // Titulo del reporte
        ->setCellValue('A3', $titulosColumnas[0])  //Titulo de las columnas
        ->setCellValue('B3', $titulosColumnas[1])
        ->setCellValue('C3', $titulosColumnas[2]);



$i = 4; //Numero de fila donde se va a comenzar a rellenar
while ($i < 5) {
    foreach ($result as $reporte) {
        $objPHPExcel->setActiveSheetIndex(0)
                ->setCellValue('A' . $i, $reporte["usuario"])
                ->setCellValue('B' . $i, $reporte["tipo_usuario"])
                ->setCellValue('C' . $i, $reporte["fecha"]);
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


$objPHPExcel->getActiveSheet()->getStyle('A1:C1')->applyFromArray($estiloTituloReporte);
$objPHPExcel->getActiveSheet()->getStyle('A3:C3')->applyFromArray($estiloTituloColumnas);
$objPHPExcel->getActiveSheet()->setSharedStyle($estiloInformacion, "A4:C" . ($i - 1));

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

$fecha = date("d-m-Y");

$filename = 'Reporte ' . $fecha . '.xlsx';
$objWriter->save('../Reportes/' . $filename);

header("location: ../Reportes/Reporte $fecha.xlsx"); 

?>