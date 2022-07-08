<?php 
    $conn = new mysqli("localhost", "root", "", "07_orai");
    if ($conn->connect_error) {
        die("Nem sikerült az adatbázishoz kapcsolódni!");
    }
    $sql = "DELETE FROM emberek WHERE id=".$_GET["id"];
    $conn->query($sql);
    $conn->close();
?>