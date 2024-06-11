
function Validar(){
    validarVacio("Nombre")
    validarVacio("Apellido")
    validarVacio("Correo")
    validarVacio("Asunto")
};

function validarVacio(idElemento){
    let elemento = document.getElementById(idElemento);
    let valor = elemento.value;
    if (valor.trim()==""){
        console.log("Vacio");
    }else{
        if (isNaN(valor)){
            console.log(valor);
        }else{
            console.log("es un numero");
        };
    };
};

function validarlongitud(idElemento){
    let elemento = document.getElementById(idElemento);
    let valor = elemento.value;
    if (isNaN(valor)){
        console.log("no es numero")

    }else{
        if (valor.trim()=="" || valor.length==9){
            console.log("valor")
        }else{
            console.log("no tiene 9 digitos")
        }
    }
};

function contraste(){
    let tema = document.getElementsByClassName("Oscuro")
    for (let idx = 0; idx<tema.length; idx++){
        let rIdx = tema[idx]
        rIdx.classList.toggle("Claro")
    }
}

function fuente(){
    let tamanio = document.getElementById("body")
    if (tamanio.classList.contains("Normal")){
        tamanio.classList.replace("Normal", "Aumento1")
    }
}