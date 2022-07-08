/**
 * EGY tombot hasznalunk.
 * Sok kis cellara van osztva a canvas, ezek a mozgas folyamatossagaert felelosek.
 * Valojaban egy sokkal kisebb matrix latszodik. ~~> CANVAS_MULTIPLIER, IMAGE_WIDTH, IMAGE_HEIGHT
 */


var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var CANVAS_MULTIPLIER = 4;
var NUM_OF_ROWS = 116; //--> visible: 29 = num_of_rows / canvas_multiplier
var NUM_OF_COLUMNS = 100; //--> visible: 25 = u.a.
var CELL_WIDTH = canvas.width / NUM_OF_COLUMNS; // 5px
var CELL_HEIGHT = canvas.height / NUM_OF_ROWS; // 5px
var IMAGE_WIDTH = CELL_WIDTH * CANVAS_MULTIPLIER; // 20px
var IMAGE_HEIGHT = CELL_HEIGHT * CANVAS_MULTIPLIER; // 20px

var GAMMA = 0.4; //fal-bogyo lefedettseg
var MAX_POINTS = (NUM_OF_ROWS / CANVAS_MULTIPLIER) * (NUM_OF_COLUMNS / CANVAS_MULTIPLIER) * GAMMA;

var PACMAN_SPAWN_ROW = NUM_OF_ROWS / 2 - ((NUM_OF_ROWS / 2) % 4); // 50
var PACMAN_SPAWN_COLUMN = NUM_OF_COLUMNS / 2 - ((NUM_OF_COLUMNS / 2) % 4); // 58

var GHOST_STARTING_SPEED = 1;

var PACMAN_IMAGE = new Image(IMAGE_WIDTH, IMAGE_HEIGHT); PACMAN_IMAGE.src = "pacman.png";
var G1_IMAGE = new Image(IMAGE_WIDTH, IMAGE_HEIGHT); G1_IMAGE.src = "ghost_1.png";
var G2_IMAGE = new Image(IMAGE_WIDTH, IMAGE_HEIGHT); G2_IMAGE.src = "ghost_2.png";
var WALL_IMAGE = new Image(IMAGE_WIDTH, IMAGE_HEIGHT); WALL_IMAGE.src = "wall.png";
var POINT_IMAGE = new Image(IMAGE_WIDTH, IMAGE_HEIGHT); POINT_IMAGE.src = "point.png";


//-------------------------------------------------------------------------------------------------------------


class Level {
    array; rows = NUM_OF_ROWS; columns = NUM_OF_COLUMNS;
    static wins = "noone"; static wallImage = WALL_IMAGE; static pointImage = POINT_IMAGE;

    constructor() {
        this.array = new Array(this.rows);
        for (var i = 0; i < this.rows; i++) {
            this.array[i] = new Array(this.columns);
            for (var j = 0; j < this.columns; j++) {
                this.array[i][j] = '0';
            }
        }
    }
}

class Pacman {
    r; c; orientation; image = PACMAN_IMAGE;
    static points = 0; static speed = 1; 

    constructor() {
        this.r = PACMAN_SPAWN_ROW;
        this.c = PACMAN_SPAWN_COLUMN;
        this.orientation = null;
    }
}

class Ghost {
    r; c; serial; image; orientation;
    static speed = GHOST_STARTING_SPEED; static firstCorner;
    /* ~~~~~^ 1, 2, 4 */

    constructor(_serial) {
        this.serial = _serial;
        var c = getGhostSpawningCorner(this.serial);

        switch (c) {
            case "tl":
                this.r = 0; this.c = 0;
                break;
            case "tr":
                this.r = 0; this.c = NUM_OF_COLUMNS - CANVAS_MULTIPLIER;
                break;
            case "br":
                this.r = NUM_OF_ROWS - CANVAS_MULTIPLIER; this.c = NUM_OF_COLUMNS - CANVAS_MULTIPLIER;
                break;
            case "bl":
                this.r = NUM_OF_ROWS - CANVAS_MULTIPLIER; this.c = 0;
                break;
        }

        this.orientation = null;
        if (this.serial == 1) this.image = G1_IMAGE;
        else this.image = G2_IMAGE;
    }
}

//-------------------------------------------------------------------------------------------------------------

function getGhostSpawningCorner(_serial) {
    if (_serial === 1) {
        var corner_number = Math.floor(Math.random() * 4 + 1); //1-4 kozotti random
        switch (corner_number) {
            case 1: return Ghost.firstCorner = "tl";
            case 2: return Ghost.firstCorner =  "tr";
            case 3: return Ghost.firstCorner =  "br";
            case 4: return Ghost.firstCorner =  "bl";
            default: throw new Error("Valami nem cool... (" + Ghost.firstCorner + ")");
        }
    }

    switch (Ghost.firstCorner) {
        case "tl": return "br";
        case "tr": return "bl";
        case "br": return "tl";
        case "bl": return "tr";
        default: throw new Error("Valami nem cool... (" + Ghost.firstCorner + ")");
    }
}

//-------------------------------------------------------------------------------------------------------------

function wallGeneration(_level, _p, _g1, _g2) {
    for(var i=0; i<NUM_OF_ROWS; i+=CANVAS_MULTIPLIER){
        for(var j=0; j<NUM_OF_COLUMNS; j+=CANVAS_MULTIPLIER){
            var r = Math.random();
            if(r < GAMMA){
                for(var k=0; k<CANVAS_MULTIPLIER; k++){
                    for(var l=0; l<CANVAS_MULTIPLIER; l++){
                        if ((i+k !== _p.r && j+l !== _p.c) && (i+k !== _g1.r && j+l !== _g1.c) && (i+k !== _g2.r && j+l !== _g2.c)){
                            _level.array[i+k][j+l] = "w";
                        }
                    }
                }
            }
        }
    }
}

function dotGeneration(_level, _p) {
    for(var i=0; i<NUM_OF_ROWS; i+=CANVAS_MULTIPLIER){
        for(var j=0; j<NUM_OF_COLUMNS; j+=CANVAS_MULTIPLIER){
            var r = Math.random();
            if(r < GAMMA){
                for(var k=0; k<CANVAS_MULTIPLIER; k++){
                    for(var l=0; l<CANVAS_MULTIPLIER; l++){
                        if ((i+k !== _p.r && j+l !== _p.c) && _level.array[i+k][j+l] !== "w"){
                            _level.array[i+k][j+l] = "d";
                        }
                    }
                }
            }
        }
    }
}

//-------------------------------------------------------------------------------------------------------------

function drawGame(_l, _p, _g1, _g2){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for(var i=0; i<NUM_OF_ROWS; i+= CANVAS_MULTIPLIER){
        for(var j=0; j<NUM_OF_COLUMNS; j+= CANVAS_MULTIPLIER){
            if(_l.array[i][j] === "w") ctx.drawImage(Level.wallImage, j * CELL_WIDTH, i * CELL_HEIGHT);
            if(_l.array[i][j] === "d") ctx.drawImage(Level.pointImage, j * CELL_WIDTH, i * CELL_HEIGHT);
        }
    }
    
    ctx.drawImage(_p.image, _p.c * CELL_WIDTH, _p.r * CELL_HEIGHT);
    ctx.drawImage(_g1.image, _g1.c * CELL_WIDTH, _g1.r * CELL_HEIGHT);
    ctx.drawImage(_g2.image, _g2.c * CELL_WIDTH, _g2.r * CELL_HEIGHT);
}

//-------------------------------------------------------------------------------------------------------------

function toNextCell(_l, _p, _g1, _g2){
    /**
     * PacMan mozgatasa, kis cellakon atlepked egyik nagycellabol a masikba, amennyiben az a palya resze ES nem fal.
     * Ha a kovetkezo (nagy)cella (amire atmegyunk) bogyo, akkor noveli a pontok szamat.
     */
    var r = _p.r;
    var c = _p.c;
    var a = _l.array;
    switch(_p.orientation){
        case "left":
            if(c-CANVAS_MULTIPLIER >= 0 && a[r][c-CANVAS_MULTIPLIER] !== "w"){ //HA NEM megyunk le a palyarol ÉS NINCS ott fal
                if(a[r][c-CANVAS_MULTIPLIER] === "d"){
                    Pacman.points++;
                    for(var i=0; i<CANVAS_MULTIPLIER; i++){
                        for(var j=0; j<CANVAS_MULTIPLIER; j++){
                            _l.array[r+i][c-CANVAS_MULTIPLIER+j] = undefined;
                        }
                    }
                }
                for(var i=0; i<CANVAS_MULTIPLIER; i++){
                    _p.c -= Pacman.speed;
                    drawGame(_l, _p, _g1, _g2);
                    if(gotcha(_p, _g1, _g2) === true) return "collision";
                }
            }
            break;
        case "up":
            if(r-CANVAS_MULTIPLIER >= 0 && a[r-CANVAS_MULTIPLIER][c] !== "w"){ //HA NEM megyunk le a palyarol ÉS NINCS ott fal
                if(a[r-CANVAS_MULTIPLIER][c] === "d"){
                    Pacman.points++;
                    for(var i=0; i<CANVAS_MULTIPLIER; i++){
                        for(var j=0; j<CANVAS_MULTIPLIER; j++){
                            _l.array[r-CANVAS_MULTIPLIER+i][c+j] = undefined;
                        }
                    }
                } 
                for(var i=0; i<CANVAS_MULTIPLIER; i++){
                    _p.r -= Pacman.speed;
                    drawGame(_l, _p, _g1, _g2);
                    if(gotcha(_p, _g1, _g2) === true) return "collision";
                }
            }
            break;
        case "right":
            if(c+CANVAS_MULTIPLIER < NUM_OF_COLUMNS && a[r][c+CANVAS_MULTIPLIER] !== "w"){ //HA NEM megyunk le a palyarol ÉS NINCS ott fal
                if(a[r][c+CANVAS_MULTIPLIER] === "d"){
                    Pacman.points++;
                    for(var i=0; i<CANVAS_MULTIPLIER; i++){
                        for(var j=0; j<CANVAS_MULTIPLIER; j++){
                            _l.array[r+i][c+CANVAS_MULTIPLIER+j] = undefined;
                        }
                    }
                } 
                for(var i=0; i<CANVAS_MULTIPLIER; i++){
                    _p.c += Pacman.speed;
                    drawGame(_l, _p, _g1, _g2);
                    if(gotcha(_p, _g1, _g2) === true) return "collision";
                }
            }
            break;
            
        case "down":
            if(r+CANVAS_MULTIPLIER < NUM_OF_ROWS && a[r+CANVAS_MULTIPLIER][c] !== "w"){ //HA NEM megyunk le a palyarol ÉS NINCS ott fal
                if(a[r+CANVAS_MULTIPLIER][c] === "d"){
                    Pacman.points++;
                    for(var i=0; i<CANVAS_MULTIPLIER; i++){
                        for(var j=0; j<CANVAS_MULTIPLIER; j++){
                            _l.array[r+CANVAS_MULTIPLIER+i][c+j] = undefined;
                        }
                    }
                } 
                for(var i=0; i<CANVAS_MULTIPLIER; i++){
                    _p.r += Pacman.speed;
                    drawGame(_l, _p, _g1, _g2);
                    if(gotcha(_p, _g1, _g2) === true) return "collision";
                }
            }
            break;
    }
}

function ghostToNextCell(_l, _g, _p, _g_masik, _HIPS){
    var rd = _p.r - _g.r;
    var cd = _p.c - _g.c;
    var tempDir;
    var canGo = true;

    if(_HIPS > 6){
        tempDir = Math.floor(Math.random() * 4 + 1);
    }else{
        if (cd < 0) tempDir = 1; //left
        else if (cd > 0) tempDir = 3; //right
        else if (rd < 0) tempDir = 2; //up
        else tempDir = 4; //down
    }

    do{
        switch(tempDir){
            case 1: //left
                if(_g.c - CANVAS_MULTIPLIER * Ghost.speed >= 0 && _l.array[_g.r][_g.c - CANVAS_MULTIPLIER * Ghost.speed] !== "w"){
                    canGo = true;
                    for(var i=0; i<CANVAS_MULTIPLIER; i++){
                        if(_g.c - Ghost.speed >= 0 && _l.array[_g.r][_g.c-Ghost.speed] !== "w") _g.c -= Ghost.speed;
                        drawGame(_l, _p, _g, _g_masik);
                        if(gotcha(_p, _g, _g_masik) === true) return "collision";
                    }
                }
                else{
                    canGo = false;
                }
                break;

            case 2: //up
                if(_g.r - CANVAS_MULTIPLIER * Ghost.speed >= 0 && _l.array[_g.r-CANVAS_MULTIPLIER * Ghost.speed][_g.c] !== "w"){
                    canGo = true;
                    for(var i=0; i<CANVAS_MULTIPLIER; i++){
                        if(_g.r - Ghost.speed >= 0 && _l.array[_g.r-Ghost.speed][_g.c] !== "w") _g.r -= Ghost.speed;
                        drawGame(_l, _p, _g, _g_masik);
                        if(gotcha(_p, _g, _g_masik) === true) return "collision";
                    }
                }
                else{
                    canGo = false;
                }
                break;

            case 3: //right
                if(_g.c + CANVAS_MULTIPLIER * Ghost.speed < NUM_OF_COLUMNS && _l.array[_g.r][_g.c + CANVAS_MULTIPLIER * Ghost.speed] !== "w"){
                    canGo = true;
                    for(var i=0; i<CANVAS_MULTIPLIER; i++){
                        if(_g.c + Ghost.speed < NUM_OF_COLUMNS && _l.array[_g.r][_g.c + Ghost.speed] !== "w") _g.c += Ghost.speed;
                        drawGame(_l, _p, _g, _g_masik);
                        if(gotcha(_p, _g, _g_masik) === true) return "collision";
                    }
                }
                else{
                    canGo = false;
                }
                break;

            case 4: //down
                if(_g.r+CANVAS_MULTIPLIER * Ghost.speed < NUM_OF_ROWS && _l.array[_g.r+CANVAS_MULTIPLIER * Ghost.speed][_g.c] !== "w"){
                    canGo = true;
                    for(var i=0; i<CANVAS_MULTIPLIER; i++){
                        if(_g.r+Ghost.speed < NUM_OF_ROWS && _l.array[_g.r+Ghost.speed][_g.c] !== "w") _g.r += Ghost.speed;
                        drawGame(_l, _p, _g, _g_masik);
                        if(gotcha(_p, _g, _g_masik) === true) return "collision";
                    }
                }
                else{
                    canGo = false;
                }
                break;
        }

        if(canGo === false) tempDir = Math.floor(Math.random() * 4 + 1);
    }while(canGo === false);

}

//-------------------------------------------------------------------------------------------------------------

function gotcha(_p, _g1, _g2){
    var p_topLeft = [_p.r, _p.c];
    var p_bottomRight = [_p.r + CANVAS_MULTIPLIER-1, _p.c + CANVAS_MULTIPLIER-1];
    var g1_topLeft = [_g1.r, _g1.c];
    var g1_bottomRight = [_g1.r + CANVAS_MULTIPLIER-1, _g1.c + CANVAS_MULTIPLIER-1];
    var g2_topLeft = [_g2.r, _g2.c];
    var g2_bottomRight = [_g2.r + CANVAS_MULTIPLIER-1, _g2.c + CANVAS_MULTIPLIER-1];


    if(p_topLeft[0] >= g1_topLeft[0] && p_topLeft[0] <= g1_bottomRight[0]){
        if(p_topLeft[1] >= g1_topLeft[1] && p_topLeft[1] <= g1_bottomRight[1]){
            return true;
        }
    }
    if(p_bottomRight[0] >= g1_topLeft[0] && p_bottomRight[0] <= g1_bottomRight[0]){
        if(p_bottomRight[1] >= g1_topLeft[1] && p_bottomRight[1] <= g1_bottomRight[1]){
            return true;
        }
    }
    if(p_topLeft[0] >= g2_topLeft[0] && p_topLeft[0] <= g2_bottomRight[0]){
        if(p_topLeft[1] >= g2_topLeft[1] && p_topLeft[1] <= g2_bottomRight[1]){
            return true;
        }
    }
    if(p_bottomRight[0] >= g2_topLeft[0] && p_bottomRight[0] <= g2_bottomRight[0]){
        if(p_bottomRight[1] >= g2_topLeft[1] && p_bottomRight[1] <= g2_bottomRight[1]){
            return true;
        }
    }

    return false;
}

//-------------------------------------------------------------------------------------------------------------

function gameFunction(_name) {
    var l = new Level();
    var p = new Pacman();
    var g1 = new Ghost(1);
    var g2 = new Ghost(2);
    var isLeaderboardHidden = true;
    var isHelpHidden = true;
    var HIPS = 0; //Hiding In Plain Sight -- pacman megprobal elbujni --> cserkeszo-mod (3 kor) --> majd vissza rendes
    Pacman.points = 0;
    
    wallGeneration(l, p, g1, g2);
    dotGeneration(l, p);
    var GAME_OVER = false;

    drawGame(l, p, g1, g2);
    

    var myInterval = setInterval(function () {
        if (GAME_OVER){
            clearInterval(myInterval);
            gameOver(_name, Pacman.points);
            return;
        } 

        document.addEventListener("keyup", function (e) {
            //gomboknak jelentes:
            /* 
            fel-le-jobbra-balra nyil --> p.irany = uj irany;
            h, t, 1, 2
            */
           switch (e.key){
               case "ArrowLeft":
                   p.orientation = "left";
                   break;
                case "ArrowUp":
                    p.orientation = "up";
                    break;
                case "ArrowRight":
                    p.orientation = "right";
                    break;
                case "ArrowDown":
                    p.orientation = "down";
                    break;
                case "h":   
                    if(isHelpHidden === true) isHelpHidden = false;
                    else isHelpHidden = true;
                    break;
                case "t":
                    if(isLeaderboardHidden === true) isLeaderboardHidden = false;
                    else isLeaderboardHidden = true;
                    break;
                case "1": 
                    Ghost.speed = 1;
                    break;
                case "2":
                    Ghost.speed = 2;
                    break;
           }
        })

        if(!isHelpHidden){
            document.getElementById("help-div").style.visibility = "visible";
        }
        else document.getElementById("help-div").style.visibility = "hidden";

        if(!isLeaderboardHidden){
            showDatabase();
            document.getElementById("leaderboard-div").style.visibility = "visible";
        }else{
            document.getElementById("leaderboard-div").style.visibility = "hidden";
        }

        var prevPMPos = [p.r, p.c];
        if(toNextCell(l, p, g1, g2) === "collision"){
            GAME_OVER = true;
            return;
        }
        if(HIPS <= 6 && prevPMPos[0] === p.r && prevPMPos[1] === p.c) HIPS += 3;
        else if(prevPMPos[0] !== p.r || prevPMPos[1] !== p.c) HIPS = 0;

        if (Pacman.points === MAX_POINTS * 0.95) {
            GAME_OVER = true;
            return;
        }

        if(ghostToNextCell(l, g1, p, g2, HIPS) === "collision"){
            GAME_OVER = true;
            return;
        }
        if(ghostToNextCell(l, g2, p, g1, HIPS) === "collision"){
            GAME_OVER = true;
            return;
        }
        if(HIPS > 6){
            HIPS--;
            if(HIPS === 6) HIPS = 0;
        }
            
    }, 150);
}

//-----------------------------------------------------------------------------------------------------------

function updateDatabase(_name, _points){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("updated");
        }
    };
    var str = "pacman_database.php?type=update&name=" + _name + "&points=" + _points;
    xhttp.open("GET", str, true);
    xhttp.send();
}

function showDatabase(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("leaderboard-div").innerHTML = this.responseText;
            document.getElementById("leaderboard-div").style.visibility = "visible";
        }
    };
    var str = "pacman_database.php?type=show";
    xhttp.open("GET", str, true);
    xhttp.send();
}

//-----------------------------------------------------------------------------------------------------------

function startGame(){
    document.getElementById("game-over-div").style.visibility = "hidden";
    var name = document.getElementById("name-input").value;
    if(!name){
        return alert("Mindenkinek van neve...");
    }else{
        document.getElementById("starting-div").style.visibility = "hidden";
        document.getElementById("canvas").style.visibility = "visible";
        gameFunction(name);
    }
}

function gameOver(_name, _points){
    console.log("GAME OVER");
    if(_points === Math.round(MAX_POINTS * 0.95)){
        document.getElementById("game-over-status").innerHTML = "GRATULÁLOK, NYERTÉL!";
    }else{
        document.getElementById("game-over-status").innerHTML = "VESZTETTÉL.";
    }
    document.getElementById("game-over-points").innerHTML = "Elért pontszám: " + _points;
    document.getElementById("game-over-div").style.visibility = "visible";
    updateDatabase(_name, _points);
}

