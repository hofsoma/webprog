<html lang="hu">

<head>
    <meta charset="utf-8">
    <script>

        function torol(id){
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                   tablazat(0);
                }
            };
            xhttp.open("GET", "torol.php?id=" + id, true);
            xhttp.send();
        }

        sorrend = 0;
        function tablazat(szam) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                   document.getElementById("tablazat").innerHTML = this.responseText;
                }
            };
            if(szam) sorrend += szam;
            sorrend = sorrend % 2;

            xhttp.open("GET", "tablazatIr.php?fordit=" + sorrend, true);
            xhttp.send();
        }
    </script>
</head>

<body>
    <form action="szemelyek.php" method="post">
        <label>Szín neve:</label>
        <input name="szinNev">
        <br>
        <input name="szinAdd" type="submit" value="Hozzáad">
    </form>

    <?php
    if (isset($_POST["szinAdd"])) {
        $conn = new mysqli("localhost", "root", "", "07_orai");
        if ($conn->connect_error) {
            die("Nem sikerült az adatbázishoz kapcsolódni!");
        }
        $sql = "INSERT INTO szinek (szin) VALUES ('" . $_POST["szinNev"] . "')";
        $conn->query($sql);
        $conn->close();
        
        header("Location: szemelyek.php");
        /**^~~~ ez megoldja, hogy refresh-re ne legyen minden ujra elkuldve */
    }
    ?>

    <form action="szemelyek.php" method="post">
        <fieldset>
            <legend>Személy adatai</legend>
            <label>Név:</label>
            <input name="nev"><br>
            <label>Életkor</label>
            <input type="number" name="kor"><br>
            <label>Hallgató</label> <input type="checkbox" name="hallgato">
            <label>Dolgozik</label> <input type="checkbox" name="dolgozik"><br>
            <label>Nő</label>
            <input type="radio" name="nem" value="N">
            <label>Férfi</label>
            <input type="radio" name="nem" value="F"><br>
            <label>A rekord megjelítéséhez használt háttérszín</label>
            <select name="szin">
                <!-- ide rakja a php a szinek tablabol az optionoket -->
                <?php
                $conn = new mysqli("localhost", "root", "", "07_orai");
                if ($conn->connect_error) {
                    die("Nem sikerült az adatbázishoz kapcsolódni!");
                }
                $sql = "SELECT szin FROM szinek";
                $result = $conn->query($sql);
                while ($row = $result->fetch_assoc()) {
                    echo '<option value="' . $row["szin"] . '">' . $row["szin"] . '</option>';
                }
                $conn->close();
                ?>
            </select><br>
            <input type="submit" value="Hozzáad" name="szemelyAdd">
        </fieldset>
    </form>
    
    <?php
    if (isset($_POST["szemelyAdd"])) {
        $conn = new mysqli("localhost", "root", "", "07_orai");
        if ($conn->connect_error) {
            die("Nem sikerült az adatbázishoz kapcsolódni!");
        }
        if (isset($_POST["hallgato"]))
            $h = "true";
        else
            $h = "false";
        if (isset($_POST["dolgozik"]))
            $d = "true";
        else
            $d = "false";
        $sql = "INSERT INTO emberek (nev, kor, hallgato, dolgozik, nem, szin) VALUES ('" . $_POST["nev"] . "', " . $_POST["kor"] . ", " . $h . ", " . $d . ", '" . $_POST["nem"] . "', '" . $_POST["szin"] . "')";
        $conn->query($sql);
        $conn->close();

        header("Location: szemelyek.php");
        /**^~~~ ez megoldja, hogy refresh-re ne legyen minden ujra elkuldve */
    }
    ?>
    <button onclick="tablazat(0)">Megmutat</button>
    <p align="center" id="tablazat"></p>
</body>

</html>