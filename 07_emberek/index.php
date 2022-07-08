<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>pls</title>

    <style>
        *{
            margin: 5px auto 5px auto;
            padding-left: 5px;
            padding-right: 5px;
        }
    </style>

</head>
<body>
    <div id="alap">
        <table id="tablazat">
            <tr>
                <th>Név</th>
                <th>Születési idő</th>
                <th>Foglalkozás</th>
                <th>Havi kereslet</th>
                <th>Szig.Szám</th>
            </tr>
        </table>
    </div>
    <button onclick="kiirForm()">Új rekord</button>
    <div id="urlapHelye"></div>
    <button onclick="kiirTablazat()">Kiir táblázat</button>
    
    <?php
        if(isset($_POST["feltoltUjRekord"]) === true){
            $conn = new mysqli("localhost", "root", "", "07_hf_redo");
            
            if ($conn->connect_error) {
                die("Nem sikerült az adatbázishoz kapcsolódni!");
            }
            
            $sql = "INSERT INTO emberek (nev, szul_ido, foglalkozas, havi_fizu, szemelyi_szam) VALUES ('" . $_POST["nev"] . "', '" . $_POST["szul_ido"] . "', '" . $_POST["foglalkozas"] . "', '" . $_POST["havi_fizu"] . "', '" . $_POST["szemelyi_szam"] . "')";
            
            $conn->query($sql);
            $conn->close();

            header("Location: index.php");
        }
    ?>

    <script>
        function kiirForm(){
            var str = '<form action="index.php" method="post">' + 
            '<label>Név:</label><input type="text" name="nev"><br> ' +
            '<label>Születési idő:</label><input type="date" name="szul_ido"><br>' +
            '<label>Foglalkozás:</label><input type="text" name="foglalkozas"><br>' +
            '<label>Havi kereset:</label><input type="text" name="havi_fizu"><br>' +
            '<label>Szig.Szám:</label><input type="text" name="szemelyi_szam"><br>' + 
            '<input type="submit" name="feltoltUjRekord" value="Feltöltés"></form>'

            document.getElementById("urlapHelye").innerHTML = str;
        }

        function kiirTablazat(){
            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function(){
                if (this.readyState == 4 && this.status == 200) {
                    document.getElementById("tablazat").innerHTML = this.responseText;
                }
            };
            xhttp.open("get", "kiir.php", true);
            xhttp.send();
        }

        function torol(_id){
            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function(){
                if (this.readyState == 4 && this.status == 200) {
                    kiirTablazat();
                }
            };
            var str = "modosit.php?type=torol&id=" + _id;
            xhttp.open("get", str, true);
            xhttp.send();
        }

        function modosit(_id){
            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function(){
                if (this.readyState == 4 && this.status == 200) {
                    document.getElementById("tablazat").innerHTML = this.responseText;
                }
            };
            var str = "modosit.php?type=modosit&id=" + _id;
            xhttp.open("get", str, true);
            xhttp.send();
        }

        function update(_id){
            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function(){
                if (this.readyState == 4 && this.status == 200) {
                    kiirTablazat();
                }
            };
            var nev = document.getElementById("nev").value;
            var szul_ido = document.getElementById("szul_ido").value;
            var foglalkozas = document.getElementById("foglalkozas").value;
            var havi_fizu = document.getElementById("havi_fizu").value;
            var szemelyi_szam = document.getElementById("szemelyi_szam").value;
            var str = "modosit.php?type=modosit_final&id=" + _id + "&nev=" + nev + "&szul_ido=" + szul_ido + "foglalkozas=" + foglalkozas + "&havi_fizu=" + havi_fizu + "&szemelyi_szam=" + szemelyi_szam;
            xhttp.open("get", str, true);
            xhttp.send();
        }

    </script>
</body>
</html>