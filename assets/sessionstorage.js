function iniciar(){
    var boton= document.getElementById("grabar");
    boton.addEventListener("click", nuevoItem);
   
    var boton2 = document.getElementById("grabar2");
    boton2.addEventListener("click", nuevoItem3);

    var boton3 = document.getElementById("grabar3");
    boton3.addEventListener("click", nuevoItem2)
    
    window.addEventListener("storage", mostrar);
    mostrar();
}
var auxsd=0, aux2=0, aux3=0;
function nuevoItem3(){
    aux2++;
    var clave = "26.99";
    sessionStorage.setItem(clave, aux2);
    mostrar();
}
function nuevoItem(){
    auxsd++;
    console.log(auxsd);
    var clave = "9.99";
    sessionStorage.setItem(clave, auxsd);
    mostrar();
}
function nuevoItem2(){
    aux3++;
    var clave = "99.99";
    sessionStorage.setItem(clave, aux3);
    mostrar();

}
function mostrar(){
    var noinfo = true;
    var cajadatos = document.getElementById("cajadatos");
    cajadatos.innerHTML ='';
    for(var i=0; i<sessionStorage.length; i++){
        var clave = sessionStorage.key(i);
        var valor = sessionStorage.getItem(clave);
        if(clave!="IsThisFirstTime_Log_From_LiveServer"){
            noinfo = false;
            cajadatos.innerHTML += '<div id="valorcarrito">'+"x"+valor+" Suscripción Curso "+clave+'<input id="borraritem" type="button" onclick="borrarItem(\''+clave+'\')" value="Borrar Item"><input id="noborrar" type="button" onclick="mas(\''+clave+'\')" value="+"><input id="noborrar" type="button" onclick="menos(\''+clave+'\')" value="-"></div>'
        }
    }
    cajadatos.innerHTML += '<br><br><div><input id="todos" type="button" onclick="borrarTodos()" value="Borrar Todo"></div>';
    cajadatos.innerHTML += '<br><div><input id="pagar" type="button" onclick="pagar()" value="Pagar"></div>';
    if(noinfo==true){
        cajadatos.innerHTML='<div id="noinfo">NO HAY PRODUCTOS EN EL CARRITO DE COMPRAS</div>'
    }
}

function borrarTodos(){
    auxsd=0;
    aux2=0;
    aux3=0;
    if(confirm("Estas seguro que deseas borrar todos los datos?"))
    {
        sessionStorage.clear();
        mostrar();
    }
}
function menos(clave){
    if(clave=="99.99"){
        aux3--;
        var clave = "99.99";
        if(aux3<0){
            aux3=0;
        }
        sessionStorage.setItem(clave, aux3);

    }
    else if (clave=="9.99"){
        auxsd--;
        var clave = "9.99";
        if(auxsd<0){
            auxsd=0;
        }
        sessionStorage.setItem(clave, auxsd);
    }
    else if(clave =="26.99"){
        aux2--;
        var clave = "26.99";
        if(aux2<0){
            aux2=0;
        }
        sessionStorage.setItem(clave, aux2);
    }
    mostrar();
}
function mas(clave){
    if(clave=="99.99"){
        nuevoItem2();
    }
    if (clave=="9.99"){
        nuevoItem();
    }
    if(clave =="26.99"){
        nuevoItem3();
    }
    mostrar();
}
function borrarItem(clave){
    if(confirm("Estas seguro que deseas borrar el item seleccionado?")){
        if(clave=="99.99"){
            var clave = "99.99";
            aux3=0;
            sessionStorage.setItem(clave, aux3);
        }
        else if (clave=="9.99"){
            var clave = "9.99";
            auxsd=0;
            sessionStorage.setItem(clave, aux);
        }
        else if(clave =="26.99"){
            var clave = "26.99";
            aux2=0;
            sessionStorage.setItem(clave, aux2);
        }
        sessionStorage.removeItem(clave);
        mostrar();
    }
}

function pagar(){
    var total=0;
    var noinfo = true;
    var cajadatos = document.getElementById("cajadatos");
    cajadatos.innerHTML ='';
    cajadatos.innerHTML += '<main><div id="valorcarrito"><h1>'+"Comprobante de pago"+'</h1></div></main>'
    cajadatos.innerHTML += '<div id="valorcarrito">'+"Productos: "+'</div>'
    for(var i=0; i<sessionStorage.length; i++){
        var clave = sessionStorage.key(i);
        var valor = sessionStorage.getItem(clave);
        if(clave!="IsThisFirstTime_Log_From_LiveServer"){
            noinfo = false;
            total += valor*clave;
            cajadatos.innerHTML += '<div id="valorcarrito">'+"x"+valor+" Suscripción Curso "+clave+'</div>'
        }
    }
    cajadatos.innerHTML += '<br><br><br><div id="valorcarrito">'+"Subtotal: "+Math.round(total * 100) / 100+'</div>'
    var iva= (Math.round(total * 100) / 100)*0.12;
    cajadatos.innerHTML += '<div id="valorcarrito">'+"IVA 12%: "+Math.round(iva *100 ) / 100+'</div>'
    var masiva = total+iva;
    cajadatos.innerHTML += '<div id="valorcarrito">'+"Total: "+Math.round(masiva * 100) / 100+'</div>'

}
window.addEventListener("load", iniciar);