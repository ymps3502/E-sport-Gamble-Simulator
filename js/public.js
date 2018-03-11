$(document).ready(function() {
    window.fbAsyncInit = function() {
        FB.init({
            appId: '1926512984300847',
            cookie: true,
            xfbml: true,
            version: 'v2.8'
        });
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                FB.api('/me', function(response) {
                    loginState(response);
                });
            }
        });
    };
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    function loginState(response) {
        $(".history").css("display", "inline-block");
        $(".user").css("display", "inline-block");
        $(".user").text(response.name);
        $(".logout").css("display", "inline-block");
        $(".login").css("display", "none");
    }

    $(".title").click(function() {
        location.assign("http://localhost/EGS/");
    });

    $(".login").click(function() {
        FB.login(function(response) {
            if (response.authResponse) {
                FB.api('/me', function(response) {
                    loginState(response);
                });
            }
        }, { scope: 'public_profile' });
    });

    $('.logout').click(function() {
        FB.logout(function(response) {});
        $(".history").css("display", "none");
        $(".user").css("display", "none");
        $(".logout").css("display", "none");
        $(".login").css("display", "inline-block");
    });

    $('.tdata').on('click', function() {
        $(this).find("td").each(function(index) {
            switch (index) {
                case 0:
                    $(".time").text($(this).text());
                    break;
                case 1:
                    $(".event").text($(this).text());
                    break;
                case 2:
                    $(".odds1").data('team_id', $(this).text());
                    break;
                case 3:
                    $(".player1").children("img").attr("src", $(this).text());
                    break;
                case 4:
                    $(".team1").text($(this).text());
                    $(".odds1").data('name', $(this).text());
                    break;
                case 5:
                    $(".odds1").text($(this).text());
                    break;
                case 6:
                    $(".odds2").data('team_id', $(this).text());
                    break;
                case 7:
                    $(".player2").children("img").attr("src", $(this).text());
                    break;
                case 8:
                    $(".team2").text($(this).text());
                    $(".odds2").data('name', $(this).text());
                    break;
                case 9:
                    $(".odds2").text($(this).text());
                    break;
                case 10:
                    if ($("#btn-bet")) {
                        $("#btn-bet").data('id', $(this).text());
                    }
                    if ($("#btn-change")) {
                        $("#btn-change").data('id', $(this).text());
                    }
                    break;
                case 11:
                    $("#bet-money").attr('value', $(this).text());
                    break;
                case 12:
                    $(".bet").text($(this).text());
                    break;
            }
        });
        window.location.href = "#popup1";
    });

    var l;
    var readonly;
    $('.odds1').on('click', function() {
        readonly = document.getElementById('bet-money').readOnly;
        if (readonly) {
            return;
        }
        if (l != null) {
            l.css("background-color", "grey");
            l.css("color", "white");
        }
        $(this).css("background-color", "lightgrey");
        $(this).css("color", "black");
        $(".bet").text($(this).data("name"));
        $("#btn-bet").data('select_team', $(this).data("team_id"));
        if ($("#btn-change")) {
            $("#btn-change").data('select_team', $(this).data("team_id"));
        }
        l = $(this);
    });
    $('.odds2').on('click', function() {
        readonly = document.getElementById('bet-money').readOnly;
        if (readonly) {
            return;
        }
        if (l != null) {
            l.css("background-color", "grey");
            l.css("color", "white");
        }
        $(this).css("background-color", "lightgrey");
        $(this).css("color", "black");
        $(".bet").text($(this).data("name"));
        $("#btn-bet").data('select_team', $(this).data("team_id"));
        if ($("#btn-change")) {
            $("#btn-change").data('select_team', $(this).data("team_id"));
        }
        l = $(this);
    });

    var d, e, t;
    d = "";
    e = "";
    t = "";
    $("#filters_date").change(function() {
        d = $(this).val();
    });
    $("#filters_event").change(function() {
        e = $(this).val();
    });
    $("#filters_team").change(function() {
        t = $(this).val();
    });

    $('.filters').on('submit', function() {
        // Declare variables 
        var input, filter, table, tr, td, i;
        table = document.getElementById("egs_table");
        tr = table.getElementsByClassName("tdata");

        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td");
            if (td) {
                if (td[0].innerHTML.indexOf(d) > -1 && td[1].innerHTML.indexOf(e) > -1 && (td[4].innerHTML.indexOf(t) > -1 || td[8].innerHTML.indexOf(t) > -1)) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
        return false;
    });

    $("#bet-money").change(function() {
        $("#btn-bet").data('money', $(this).val());
        if ($("#btn-change")) {
            $("#btn-change").data('money', $(this).val());
        }
    });
    $('#btn-bet').click(function() {
        id = $(this).data("id");
        team_id = $(this).data("select_team");
        money = $(this).data("money");
        if (id === '' || team_id === '' || money === '') {
            alert("請選擇下注隊伍與下注金額");
            return;
        }
        if (id) {
            FB.getLoginStatus(function(response) {
                if (response.status === 'connected') {
                    bet(id, team_id, money);
                } else {
                    FB.login(function(response) {
                        if (response.authResponse) {
                            loginState();
                            bet(id, team_id, money);
                        }
                    }, { scope: 'public_profile' });
                }
            });
        }
    });

    $("#btn-change").click(function() {
        if ($(this).text() == '確認更改') {
            // send data
            id = $(this).data("id");
            team_id = $(this).data("select_team");
            money = $(this).data("money");
            if (id === '' || team_id === '' || money === '') {
                alert("請選擇下注隊伍與下注金額");
                return;
            }
            if (id) {
                FB.getLoginStatus(function(response) {
                    if (response.status === 'connected') {
                        changebet(id, team_id, money);
                    } else {
                        FB.login(function(response) {
                            if (response.authResponse) {
                                loginState();
                                changebet(id, team_id, money);
                            }
                        }, {
                            scope: 'public_profile'
                        });
                    }
                });
            }
        }
        document.getElementById('bet-money').readOnly = false;
        $(this).text("確認更改");
    });

    $("#btn-cancel").click(function() {
        if (confirm('是否要取消下注?')) {
            id = $("#btn-change").data("id");
            if (id === '') {
                alert("fucking error");
                return;
            }
            if (id) {
                FB.getLoginStatus(function(response) {
                    if (response.status === 'connected') {
                        deletebet(id);
                    } else {
                        FB.login(function(response) {
                            if (response.authResponse) {
                                loginState();
                                deletebet(id);
                            }
                        }, {
                            scope: 'public_profile'
                        });
                    }
                });
            }
        } else {
            return;
        }
    });

    function bet(matche_id, team_id, money) {
        FB.api('/me', function(response) {
            $.ajax({
                    method: 'POST',
                    url: 'orderbet.php',
                    data: { bet_matche_id: matche_id, fb_name: response.name, fb_id: response.id, bet_team_id: team_id, bet_money: money }
                })
                .done(function(result) {
                    alert(result);
                    location.assign("http://localhost/EGS/");
                })
                .fail(function() {
                    alert('伺服器連線失敗，請稍後再試!');
                    location.assign("http://localhost/EGS/");
                });
        });
    }

    function changebet(matche_id, team_id, money) {
        FB.api('/me', function(response) {
            $.ajax({
                    method: 'POST',
                    url: 'changebet.php',
                    data: { bet_matche_id: matche_id, fb_name: response.name, fb_id: response.id, bet_team_id: team_id, bet_money: money }
                })
                .done(function(result) {
                    alert(result);
                    location.assign("http://localhost/EGS/history.php");
                })
                .fail(function() {
                    alert('伺服器連線失敗，請稍後再試!');
                    location.assign("http://localhost/EGS/history.php");
                });
        });
    }

    function deletebet(matche_id) {
        FB.api('/me', function(response) {
            $.ajax({
                    method: 'POST',
                    url: 'deletebet.php',
                    data: { bet_matche_id: matche_id, fb_id: response.id}
                })
                .done(function(result) {
                    alert(result);
                    location.assign("http://localhost/EGS/history.php");
                })
                .fail(function() {
                    alert('伺服器連線失敗，請稍後再試!');
                    location.assign("http://localhost/EGS/history.php");
                });
        });
    }
});
