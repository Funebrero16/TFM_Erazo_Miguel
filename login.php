<?php

if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {

    include './php/database.php';

    session_start();

    $usuario = $_POST['usuariolg'];
    $pass = $_POST['passlg'];

    $pdo = Database::connect();
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "select * FROM usuarios WHERE usuario = ? AND password = ?";

    if ($q = $pdo->prepare($sql)) {

        $q->execute(array($usuario, $pass));
        $data = $q->fetchAll(PDO::FETCH_ASSOC);
        $json = json_encode($data);
        $array = json_decode($json);


        if (count($array) >= 1) {

            $_SESSION['usuario'] = $array[0]->nombre;
            $_SESSION['tipo_usuario'] = $array[0]->tipo_usuario;
            $_SESSION['nickname'] = $array[0]->usuario;

            echo json_encode(array('error' => false, 'tipo' => $array[0]->tipo_usuario));

            $fecha = date("Y-m-d");
            $hora = date("H:i:s"); 
            $pdo = Database::connect();
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $sql = "INSERT INTO reporte_usuario (usuario, tipo_usuario, fecha, hora) values(?, ?, ?,?)";
            $q = $pdo->prepare($sql);
            $q->execute(array($_SESSION['usuario'], $_SESSION['tipo_usuario'], $fecha, $hora));
            Database::disconnect();
            
            
            
           

        } else {
            echo json_encode(array('error' => true));
        }
    }
}

Database::disconnect();
?>
