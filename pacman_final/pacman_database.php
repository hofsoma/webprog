<?php
    $type = $_GET["type"];
    if($type === "update"){
        $name = $_GET["name"];
        $points = $_GET["points"];

        $conn = new mysqli("localhost", "root", "", "beadando");
        if ($conn->connect_error) {
            die("Nem sikerült az adatbázishoz kapcsolódni!");
        }
        $sql = "INSERT INTO `leaderboard`(`name`, `points`) VALUES ('".$name."', '".$points."')";
        $conn->query($sql);
        $conn->close();
    }
    else if($type === "show"){
        $conn = new mysqli("localhost", "root", "", "beadando");

        if ($conn->connect_error) {
            die("Nem sikerült az adatbázishoz kapcsolódni!");
        }

        $sql = "SELECT * FROM `leaderboard` ORDER BY `points` DESC";
        $result = $conn->query($sql) or die($conn->error);

        $str = '<table><tr><th>Név</th><th>Pontszám</th></tr>';
        $i = 0;
        while ($row = $result->fetch_assoc()) {
            if($i < 10){
                $str .= '<tr><td>' . $row["name"] . '</td><td>' . $row["points"] . '</td></tr>';
                $i++;
            }
        }
        $str .= "</table>";
        echo $str;
        $conn->close();
    }
?>