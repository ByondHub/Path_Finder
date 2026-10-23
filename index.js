const tabla = document.getElementById("tabla")
const mensaje = document.getElementById("mensaje")

const config = {
    ancho: 10,
    alto: 10,
    colores: {
        fondo: "rgb(7, 95, 98)",
        jugador: "black",
        enemigo: "white",
        camino: "rgba(233, 133, 18, 0.85)"
    }
}

let casillaEnemiga = "3_3"
let casillaJugador = null

function crearCamino() {
    for (let i = 0; i < config.alto; i++) {
        const fila = document.createElement("tr")

        for (let j = 0; j < config.ancho; j++) {
            const columna = document.createElement("td")
     
            const x = j
            const y = config.alto - i - 1;
            
            const id = `${x}_${y}`;
            
            columna.id = id
            columna.style.backgroundColor = config.colores.fondo
            columna.style.height = "40px"
            columna.style.width = "40px"

            columna.onclick = () => seleccionarCasilla(id)
            fila.appendChild(columna)
        }
        tabla.appendChild(fila)
    }
    dibujarEnemigo()
}

function dibujarEnemigo() {
    document.getElementById(casillaEnemiga).style.backgroundColor = config.colores.enemigo
}

function limpiarTablero() {
    for (let x = 0; x < config.ancho; x++) {
        for (let y = 0; y < config.alto; y++) {
            const id = `${x}_${y}`
            if (id !== casillaEnemiga) {
                document.getElementById(id).style.backgroundColor = config.colores.fondo
            }
        }
    }
}

function obtenerCoordenadas(id) {
    const [x, y] = id.split("_").map(Number)
    return { x, y }
}

function seleccionarCasilla(id) {
    if (casillaEnemiga === id) return

    casillaJugador = id;
    mensaje.innerText = ""
    
    limpiarTablero();
    document.getElementById(id).style.backgroundColor = config.colores.jugador
    
    buscarCamino()
   
}

function buscarCamino(){
    const jugador= obtenerCoordenadas(casillaJugador)
    const enemigo =obtenerCoordenadas(casillaEnemiga)

    if (jugador.x === enemigo.x){
        graficarVertical(jugador.x , jugador.y,enemigo.y)
    }

    const m = (jugador.y - enemigo.y)/(jugador.x -enemigo.x)

    const b= jugador.y - (m*jugador.x)

    if(m==0 || m==1 || m==-1){
        graficarRecta(m , b , jugador.x , enemigo.x)
    } else{
        mostrarPuntoCiego()
    }
}

function graficarVertical(x,yJugador,yEnemigo){

    for(let y=0 ; y<config.alto ; y++){

        if(y !== yJugador && y != yEnemigo){

        document.getElementById(`${x}_${y}`).style.backgroundColor=config.colores.camino

        }
    }
}

function graficarRecta(m , b , xJugador , xEnemigo){

    for(let x=0; x < config.ancho ;x++){
        
        if(x == xJugador || x ==xEnemigo){
            continue
        }

        const y =(m *x) +b

        if(y>=0 && y <  config.alto){
            
            document.getElementById(`${x}_${y}`).style.backgroundColor =config.colores.camino


        }

    }
}


function mostrarPuntoCiego(){
    mensaje.innerText ="Punto Ciego"
}


crearCamino();