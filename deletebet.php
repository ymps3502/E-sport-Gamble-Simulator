<?php
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$mysqli = new mysqli("localhost", "root", "", "EGS");
if (mysqli_connect_errno()) {
    echo mysqli_connect_error();
}

function delete_bet($fb_id, $bet_matche_id){
	global $mysqli;
	if($stmt = $mysqli->prepare("DELETE FROM bet_order WHERE fb_id=? AND bet_matche_id=?")){
		$stmt->bind_param("ii", $fb_id, $bet_matche_id);
		$stmt->execute();
	}
	else{	
		echo "delete error";
	}
	$stmt->close();
	echo "取消下注成功";
}

$fb_id = $_POST['fb_id'];
$bet_matche_id = $_POST['bet_matche_id'];
delete_bet($fb_id, $bet_matche_id);
?>