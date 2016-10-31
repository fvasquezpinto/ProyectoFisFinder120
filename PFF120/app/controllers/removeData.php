<?php

	$data = json_decode(file_get_contents("php://input"));

	$host = "localhost";
	$user = "root";
	$pass = "";
	$db = "fisfinder120";

	$con = new mysqli($host, $user, $pass, $db);

	if($con->connection_error) {
		die("DB connection failed:" . $con->connection_error);
	}

	$sql = "DELETE FROM `estudiante` WHERE `rut` = $data->rut";

	$qry = $con->query($sql);

	$sql = "SELECT * FROM `estudiante` ORDER BY `rut` DESC";

	$qry = $con->query($sql);

	$data = array();

	if($qry->num_rows > 0) {
		while($row = $qry->fetch_object()) {
			$data[] = $row;
		}
	} else {
		$data[] = null;
	}

	$con->close();

	echo json_encode($data);
?>