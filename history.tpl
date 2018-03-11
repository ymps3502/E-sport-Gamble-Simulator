<!DOCTYPE html>
<html lang="tw">

<head>
    <meta http-equiv="Content-Language" content="zh-tw" />
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui" />
    <title>History-EGS</title>
    <link href="css/public.css" rel="stylesheet" type="text/css" />
    <link href="css/history.css" rel="stylesheet" type="text/css" />
    <script src="js/jquery_v1.10.2/jquery-1.10.2.min.js" language="javascript" type="text/javascript"></script>
    <script src="js/public.js" language="javascript" type="text/javascript"></script>
</head>

<body lang="zh-tw" onload="onLoadBody()">
    <header id="header">
        <div class="content">
            <div class="title">EGS</div>
            <div class="info">
                <div class="logout">logout</div>
                <div class="history"><a href="hello.php">history</a></div>
                <div class="user">user</div>
                <div class="login">login</div>
            </div>
        </div>
    </header>
    <div id="content">
        <form class="filters">
            <div class="date">
                日期
                <select name="date" id="filters_date">
                    <option value="">不限</option>
                    {foreach $dates as $date}
                    <option value="{$date}">{$date}</option>
                    {/foreach}
                </select>
            </div>
            <div class="event">
                場次
                <select name="event" id="filters_event">
                    <option value="">不限</option>
                    <option value="LMS">LMS</option>
                </select>
            </div>
            <div class="team">
                隊伍
                <select name="team" id="filters_team">
                    <option value="">不限</option>
                    {foreach $teams as $team}
                    <option value="{$team}">{$team}</option>
                    {/foreach}
                </select>
            </div>
            <input type="submit" name="" value="篩選">
        </form>
        <div class="table">
            <table id="egs_table">
                <tr class="thead">
                    <th class="th_date">日期</th>
                    <th class="th_event">場次</th>
                    <th class="th_player">隊伍</th>
                    <th class="th_odds">賠率</th>
                    <th class="th_player">隊伍</th>
                    <th class="th_odds">賠率</th>
                    <th class="th_money">下注金額</th>
                </tr>
                {foreach $rows as $row}
                <tr class="tdata">
                    <td>{$row.time}</td>
                    <td>{$row.tournament}</td>
                    <td style="display: none;">{$row.team1_id}</td>
                    <td style="display: none;">{$row.team1_img}</td>
                    <td>{$row.team1_acronym}</td>
                    <td>{$row.ODDS1}</td>
                    <td style="display: none;">{$row.team2_id}</td>
                    <td style="display: none;">{$row.team2_img}</td>
                    <td>{$row.team2_acronym}</td>
                    <td>{$row.ODDS2}</td>
                    <td style="display: none;">{$row.id}</td>
                    <td>{$row.money}</td>
                    <td style="display: none;">{$row.bet_team}</td>
                </tr>
                {/foreach}
            </table>
        </div>
        <div id="popup1" class="overlay">
            <div class="popup">
                <div class="row1">
                    <div class="time"></div>
                    <div class="event">LMS</div>
                    <a href="" class="close">&times;</a>
                </div>
                <div class="row2">
                    <div class="player1">
                        <img src="">
                        <div class="team1">name</div>
                        <a href="javascript:void(0)" class="odds1" data-name="a" data-team_id="">1.06</a>
                    </div>
                    <div class="vs">vs</div>
                    <div class="player2">
                        <img src="">
                        <div class="team2">name</div>
                        <a href="javascript:void(0)" class="odds2" data-name="b" data-team_id="">2.79</a>
                    </div>
                </div>
                <hr>
                <div class="row3">
                    <div class="bet"></div>
                    <div class="money">
                        <input type="number" name="money" min="100" id="bet-money"> $
                    </div>
                    <button id="btn-change" data-id="" data-money="" data-select_team="">更改</button>
                    <button id="btn-cancel">取消下注</button>
                </div>
            </div>
        </div>
    </div>
</body>

</html>
<script>
function onLoadBody() {
    document.getElementById('bet-money').readOnly = true;
}
</script>
