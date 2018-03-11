<?php
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$mysqli = new mysqli("localhost", "root", "", "EGS");
if (mysqli_connect_errno()) {
    echo mysqli_connect_error();
}

function change_bet($fb_id, $bet_matche_id, $bet_team_id, $bet_money){
	global $mysqli;
	if($stmt = $mysqli->prepare("UPDATE bet_order SET bet_team_id=?, bet_money=? WHERE fb_id=? AND bet_matche_id=?")){
		$stmt->bind_param("iiii", $bet_team_id, $bet_money, $fb_id, $bet_matche_id);
		$stmt->execute();
	}
	else{	
		echo "更改下注失敗";
	}
	$stmt->close();
	echo "更改下注成功";
}



$fb_name = $_POST['fb_name'];
$fb_id = $_POST['fb_id'];
$bet_matche_id = $_POST['bet_matche_id'];
$bet_money = $_POST['bet_money'];
$bet_team_id = $_POST['bet_team_id'];
change_bet($fb_id, $bet_matche_id, $bet_team_id, $bet_money);
?>