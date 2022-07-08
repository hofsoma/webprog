<?php
    $conn = new mysqli("localhost", "root", "", "07_hf_redo");
                    
    if ($conn->connect_error) {
        die("Nem sikerült az adatbázishoz kapcsolódni!");
    }

    $sql = "SELECT * FROM emberek";
    $result = $conn->query($sql);
    $str = '<tr><th>Név</th><th>Születési idő</th><th>Foglalkozás</th><th>Havi kereslet</th><th>Szig.Szám</th></tr>';

    while ($row = $result->fetch_assoc()) {
        $str .= '<tr><td>' . $row["nev"] . '</td><td>' . $row["szul_ido"] . '</td><td>' . $row["foglalkozas"] . '</td><td>' . $row["havi_fizu"] . '</td><td>' . $row["szemelyi_szam"] . '</td><td><button name="modosit" onclick="modosit('.$row["id"].')">Módosít</button></td><td><button name="torol" onclick="torol('.$row["id"].')">Töröl</button></td></tr>';
    }
    echo $str;
    $conn->close();

?>