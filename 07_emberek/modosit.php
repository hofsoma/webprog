<?php
    if($_GET["type"] === "torol"){

    $conn = new mysqli("localhost", "root", "", "07_hf_redo");
    if ($conn->connect_error) {
        die("Nem sikerült az adatbázishoz kapcsolódni!");
    }
    $sql = "DELETE FROM emberek WHERE id=".$_GET["id"];
    $conn->query($sql);
    $conn->close();

    header("Location: index.php");

    }else if($_GET["type"] === "modosit"){
        $id = $_GET["id"];

        $conn = new mysqli("localhost", "root", "", "07_hf_redo");
        
        if ($conn->connect_error) {
            die("Nem sikerült az adatbázishoz kapcsolódni!");
        }

        

        $sql = "SELECT * FROM emberek";
        $result = $conn->query($sql);
        $str = '<tr><th>Név</th><th>Születési idő</th><th>Foglalkozás</th><th>Havi kereslet</th><th>Szig.Szám</th></tr>';

        while ($row = $result->fetch_assoc()) {
            if($row["id"] === $_GET["id"]){
                    $str .= '<tr><td><input id="nev" value="' . $row["nev"] . '"></td><td><input type="date" id="szul_ido" value="' . $row["szul_ido"] . '"></td><td><input id="foglalkozas" value="' . $row["foglalkozas"] . '"></td><td><input type="number" id="havi_fizu" value="' . $row["havi_fizu"] . '"></td><td><input id="szemelyi_szam" value="' . $row["szemelyi_szam"] . '"></td><td><button onclick="update('.$row["id"].')">Módosit!</button></td></tr>';
            }else{
                $str .= '<tr><td>' . $row["nev"] . '</td><td>' . $row["szul_ido"] . '</td><td>' . $row["foglalkozas"] . '</td><td>' . $row["havi_fizu"] . '</td><td>' . $row["szemelyi_szam"] . '</td><td><button name="modosit" onclick="modosit('.$row["id"].')">Módosít</button></td><td><button name="torol" onclick="torol('.$row["id"].')">Töröl</button></td></tr>';
            }
        }
        
        echo $str;
        $conn->close();

    }else if($_GET["type"] === "modosit_final"){
        $conn = new mysqli("localhost", "root", "", "07_hf_redo");

        if ($conn->connect_error) {
            die("Nem sikerült az adatbázishoz kapcsolódni!");
        }
        
        $sql = "UPDATE emberek SET nev = , szul_ido = , foglalkozas = , havi_fizu = , szemelyi_szam =  WHERE id=".$_GET["id"];

        $sql = "UPDATE `emberek` SET `nev` = '".$_GET['nev']."', `szul_ido` = '".$_GET['szul_ido']."', `foglalkozas` = '".$_GET['foglalkozas']."', `havi_fizu` = '".$_GET['havi_fizu']."', `szemelyi_szam` = '".$_GET['szemelyi_szam']."' WHERE `id` = ".$_GET['id'];

        $conn->query($sql);
        $conn->close();

        header("Location: index.php");
    }
 
?>