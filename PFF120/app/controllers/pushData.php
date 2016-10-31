<?php
	$data = json_decode(file_get_contents("php://input"));
	include('config.php');
	$db = new DB();

	$sql = "INSERT INTO `estudiante`(`Nombre`,`Rut`,`Email`,`Password`,`Rol`,`Tipo`)VALUES('$data->nombre','$data->rut'
	,'$data->email','$data->password','$data->rol','$data->tipo')";
	$data = $db->qryFire($sql);
	echo json_encode($data);

?>