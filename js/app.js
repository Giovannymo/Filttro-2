import { setData } from "./post.js"; 
import { getData } from "./get.js";
import { getDataApi } from "./api.js";
import { removeItem } from "./delete.js";


//Funcion anonima autoejecutable que carga los datos en DOM
( async ()=>{
    const departamentos = await getData("http://localhost:3000/departamentos");
    
    mostrarDepartamentos(departamentos);


    const ciudades = await getData("http://localhost:3000/ciudades");

    mostrarCiudad(ciudades)

})()


const $btnEnviar = document.getElementById("btn-enviar");
const $container = document.getElementById("containerData");

const $btnGuardar = document.querySelector("#btnGuardarCiudad");

let departSeleccionado;

$btnEnviar.addEventListener("click",enviarDepartamento);
$container.addEventListener("click",async  (e)=>{
    e.preventDefault()  
    if(e.target.classList.contains("btn-agregar")){
        
        departSeleccionado = await getData(`http://localhost:3000/departamentos/${e.target.id}`);
    }

    if(e.target.classList.contains("btn-danger")){
        removeItem("http://localhost:3000/ciudades/",e.target.id)
        
    }
    if(e.target.classList.contains("btn-warning")){
        const ciudad = e.target.parentNode.querySelector("p").textContent
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&onecall?lang=sp&appid=`;
        const API_KEY = "eef1bee8e136427c52e09919160c87de";
        const data = await getDataApi(URL,API_KEY);
        const $title = document.querySelector("#titleNomCiudad")
        const $clima = document.querySelector("#clima");
        const $humedad = document.querySelector("#humedad");
        const $tempMax = document.querySelector("#temp-max");
        const $tempMin = document.querySelector("#temp-min");

        $title.textContent = ciudad
        $clima.textContent = data.main.feels_like
        $humedad.textContent = data.main.humidity
        $tempMax.textContent = data.main.temp_max
        $tempMin.textContent = data.main.temp_min
    }

})
$btnGuardar.addEventListener("click", enviarCiudad);


async function enviarCiudad(e){
    e.preventDefault()  
    
        const $txtNomCiudad =  document.getElementById("txtNomCiudad")

        const $txtImgCiudad = document.getElementById("txtImgCiudad");

        const ciudad = {
            nomCiudad : $txtNomCiudad.value,
            imagen: $txtImgCiudad.value,
            departamentoId: departSeleccionado.id,

        }

        setData("http://localhost:3000/ciudades", ciudad)


}


function enviarDepartamento(e){
    e.preventDefault();
    const $txtNomDepartamento = document.getElementById("txtNomDepartamento");

    const departamento = {
        nomDepartamento: $txtNomDepartamento.value
    }

    setData("http://localhost:3000/departamentos", departamento)
    return $txtNomDepartamento.value = ""

}


function mostrarDepartamentos(data){
    const $accordion = document.getElementById("accordionExample");
    const $fragment = document.createDocumentFragment();
    const $template = document.getElementById("nuevo-departamento").content;

    data.forEach(departamento  => {

        const $titulo = $template.querySelector(".titulo-departamento");


        $titulo.textContent = departamento.nomDepartamento;
        const $btnAgregar = $template.querySelector(".btn-agregar");
        $btnAgregar.id = departamento.id
        const $ul = $template.querySelector(".lista-ciudades");
        $ul.id= departamento.id

        const $clone = $template.cloneNode(true)

        $fragment.appendChild($clone)

    });

    $accordion.appendChild($fragment)
    

}

function mostrarCiudad(data){
    const $template = document.getElementById("nueva-ciudad").content;
    const $fragment = document.createDocumentFragment();
    const $uls =Array.from(document.querySelectorAll(".lista-ciudades"))

    $uls.forEach(ul =>{
    
        data.forEach(ciudad =>{
            if(ul.id == ciudad.departamentoId){
                
                
                const $nomCiudad = $template.querySelector("p");
                const $imgCiudad = $template.querySelector("img")
                const $btnDelete = $template.querySelector(".btn-danger")
                $nomCiudad.textContent = ciudad.nomCiudad;
                $imgCiudad.src = ciudad.imagen;
                $btnDelete.id = ciudad.id;
                const clone = $template.cloneNode(true)
                $fragment.appendChild(clone)
            }
        })
        ul.appendChild($fragment)

    })




}