<?php
require __DIR__ . '/vendor/autoload.php';

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$mysqli = new mysqli("localhost", "root", "", "EGS");
if (mysqli_connect_errno()) {
    	printf("Connect failed: %s\n", mysqli_connect_error());
	exit();
}

$dates = array();
$teams = array();
$rows = array();

function defaultList(){
	$data = $GLOBALS['mysqli']->Query("
		Select m.id, m.begin_at, m.winner,
		t.id as t1_id, t.acronym as t1_acronym, t.image_url as t1_image_url,
		u.id as t2_id, u.acronym as t2_acronym, u.image_url as t2_image_url,
		b.bet_money, v.acronym as bet_acronym
		From bet_order b
		Inner Join matches m On m.id = b.bet_matche_id
		Inner Join teams t On m.team1_id=t.id
		Inner Join teams u On m.team2_id=u.id
		Inner Join teams v On b.bet_team_id=v.id
		Order By m.begin_at"
		);
	while ($row = $data->fetch_assoc()) {
		$time_token = preg_split( "/T|\./", $row['begin_at'] );
		$time = $time_token[0] . " " . $time_token[1];
		// echo var_dump($row);
		$newrow = array(
			'id' => $row['id'],
			'time' => $time,
			'tournament' => "LMS",
			'winner' => $row['winner'],
			'team1_id' => $row['t1_id'],
			'team1_img' => $row['t1_image_url'],
			'team1_acronym' => $row['t1_acronym'],
			'ODDS1' => "1",
			'team2_id' => $row['t2_id'],
			'team2_img' => $row['t2_image_url'],
			'team2_acronym' => $row['t2_acronym'], 
			'ODDS2' => "1",
			'money' => $row['bet_money'],
			'bet_team' => $row['bet_acronym']
		);
		/*add dates to dates array*/
		$GLOBALS['dates'][] = $time_token[0];
	
		/*add team to teams array*/
		$GLOBALS['teams'][] = $row['t1_acronym'];
		$GLOBALS['teams'][] = $row['t2_acronym'];
	
		/*add newrow to rows array*/
		$GLOBALS['rows'][] = $newrow;
	}
	/*remove duplicate values*/
	$GLOBALS['dates'] = array_unique($GLOBALS['dates']);
	$GLOBALS['teams'] = array_unique($GLOBALS['teams']);
}

defaultList();

// echo var_dump($rows);
$tpl = new Smarty();
$tpl->assign("rows", $rows);
$tpl->assign("dates", $dates);
$tpl->assign("teams", $teams);
$tpl->display("history.tpl");
$mysqli->close();
?>