<?php

require_once './php/dbconfig.php';

class USER {

    private $conn;

    public function __construct() {
        $database = new Database();
        $db = $database->dbConnection();
        $this->conn = $db;
    }

    public function runQuery($sql) {
        $stmt = $this->conn->prepare($sql);
        return $stmt;
    }

    function send_mail($email, $message, $subject) {

        require_once('mailer/class.phpmailer.php');


        $mail = new PHPMailer;

        $mail->Host = "localhost";
        $mail->From = "miguelerazonipro@gmail.com";
        $mail->FromName = "Productos Nuevos";
        $mail->Subject = $subject;
        $mail->addAddress($email, "Administrador");
        $mail->MsgHTML($message);
        $mail->send();
    }

}
