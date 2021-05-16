function filtrarReporte (){
    let buscador= document.getElementById('myInput');
    let filtro= buscador.value.toUpperCase();
    let paraBuscar= document.getElementsByClassName('filasR');
    for (let cliente of paraBuscar){
        let visible=false;
        let contenido= cliente.getElementsByTagName('td');
        let comparar = contenido[1].textContent.toUpperCase();
        if(comparar.indexOf(filtro)>-1){
            visible=true;
        }
        if(visible){
            cliente.style.display="";

        }else{
            cliente.style.display="none";

        }
    }

}
/*
function filtrarSaldos (){
    let buscador= document.getElementById('myInput1');
    let filtro= buscador.value.toUpperCase();
    let paraBuscar= document.getElementsByClassName('filasS');
    for (let cliente of paraBuscar){
        let visible=false;
        let contenido= cliente.getElementsByTagName('td');
        let comparar = contenido[0].textContent.toUpperCase();
        if(comparar.indexOf(filtro)>-1){
            visible=true;
        }
        if(visible){
            cliente.style.display="";

        }else{
            cliente.style.display="none";

        }
    }

}
*/
function filtrarClientes(){
    let buscador= document.getElementById('myInput2');
    let filtro= buscador.value.toUpperCase();
    let paraBuscar= document.getElementsByClassName('filasC');
    for (let cliente of paraBuscar){
        let visible=false;
        let contenido= cliente.getElementsByTagName('td');
        let comparar = contenido[1].textContent.toUpperCase();
        if(comparar.indexOf(filtro)>-1){
            visible=true;
        }
        if(visible){
            cliente.style.display="";

        }else{
            cliente.style.display="none";

        }
    }

}