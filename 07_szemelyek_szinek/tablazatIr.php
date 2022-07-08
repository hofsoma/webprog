<?php 
    print("<table border='1'><tr><th onclick='tablazat(1)'>Név</th><th>Életkor</th><th>Hallgató</th><th>Dolgozik</th><th>Nem</th></tr>");
    
    $conn = new mysqli("localhost", "root", "", "07_orai");
    if ($conn->connect_error)
        die("Nem sikerült az adatbázishoz kapcsolódni!");

    $sorrend = "";
    if($_GET["fordit"])
        $sorrend = "ASC";
    else
        $sorrend = "DESC";

    $sql = "SELECT * FROM emberek ORDER BY nev " . $sorrend;
    $result = $conn->query($sql);

    while($row = $result->fetch_assoc()){
        print('<tr bgcolor="'.$row["szin"].'"><td>'.$row["nev"].'</td><td>'.$row["kor"].'</td><td>'.$row["hallgato"].'</td><td>'.$row["dolgozik"].'</td><td>'.$row["nem"].'</td><td>
        <button onclick="torol('.$row["id"].')">Töröl</button>
        </td></tr>');
        
    }
        
    $conn->close();

    print("</table>");
?>