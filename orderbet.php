<?php
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$mysqli = new mysqli("localhost", "root", "", "EGS");
if (mysqli_connect_errno()) {
    echo mysqli_connect_error();
}

function duplicate_bet($fb_id, $bet_id){
	global $mysqli;
	if($stmt = $mysqli->prepare("SELECT fb_id FROM bet_order WHERE fb_id=? AND bet_matche_id=?")){
		$stmt->bind_param("ii", $fb_id, $bet_id);
		$stmt->execute();
		$stmt->store_result();
		$count = $stmt->num_rows;
	}
	$stmt->close();
	if($count > 0){
		return true;
	}
	else{
		return false;
	}
}

function add_bet($fb_id, $fb_name, $bet_id, $bet_team_id, $bet_money){
	global $mysqli;
	if($stmt = $mysqli->prepare("INSERT INTO bet_order (fb_id, fb_name, bet_matche_id, bet_team_id, bet_money) VALUES (?,?,?,?,?)")){
		$stmt->bind_param("isiii", $fb_id, $fb_name, $bet_id, $bet_team_id, $bet_money);
		$stmt->execute();
	}
	$stmt->close();
}



$fb_name = $_POST['fb_name'];
$fb_id = $_POST['fb_id'];
$bet_matche_id = $_POST['bet_matche_id'];
$bet_money = $_POST['bet_money'];
$bet_team_id = $_POST['bet_team_id'];
//check fb table
if(duplicate_bet($fb_id, $bet_matche_id)){
	echo "你已經下注過了!";
}
else{
	add_bet($fb_id, $fb_name, $bet_matche_id, $bet_team_id, $bet_money);
	echo "下注成功!";
}
?>