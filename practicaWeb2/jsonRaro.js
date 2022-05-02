var contador = 0;

// var names = [];
// names[0] = prompt("New member name?");
// localStorage.setItem("names", JSON.stringify(names));



// //... 
// var storedNames = JSON.parse(localStorage.getItem("names"));



function estaVacio(campo){
    if(campo.value == ""){
        campo.setAttribute("style", "border-color:red; border-width:3px;");
        return true;
    }else{
        campo.setAttribute("style", "border-color:green; border-width:3px;");
        return false;
    }
}
let formularioLogin = document.getElementById("formu");
document.formularioLogin.addEventListener('submit', validarSignUp);
function validarSignUp(){
    
    

    let usuario = document.getElementById("user");
    let mail = document.getElementById("mail");
    let pass = document.getElementById("password");
    let perfil = document.getElementById("perfil");

    if(!camposVacios(usuario, mail, pass)){
        if(!usuariosRepetidos()){
           crearUsuario(usuario,mail,pass,perfil);
        }else{
            alert("Usuario Repetido!");
        }
        //GUARDAMOS EL USUARIO
    }
    formularioLogin.preventDefault();
}

function crearUsuario(user, mail, pass, perfil){

    let newUser = {
        usuario: user.value,
        mail: mail.value,
        pass: pass.value,
        perfil: perfil.value
    }

    let dataDict = window.localStorage.getItem("usersMap");
    if (dataDict == null) {
        dataDict = {
            username: newUser['usuario'],
            user: newUser
        };
    } else {
        dataDict = JSON.parse(dataDict);
        
        // TODO: Ver el tipo de dato que devuelve cuando se pide un valor que no existe en el diccionario

        if (dataDict[newUser.usuario] == null) {
            dataDict[newUser.usuario] = newUser;
        } else {
            // Ya existe, hacer ALGO
        }
    }
    window.localStorage.setItem("usersMap", JSON.stringify(dataDict))
}

function usuariosRepetidos(){}

function camposVacios(usuario,mail,contrasenia){
    if(estaVacio(usuario) || estaVacio(mail) || estaVacio(contrasenia)){
        return true;
    }else{
        return false;
    }
}

function validarLogIn(){
    let usuario = document.getElementById("user");
    let mail = document.getElementById("mail");
    let pass = document.getElementById("password");
    let perfil = document.getElementById("perfil");


    if(camposVacios(usuario, mail, pass)){
        alert("hay campos vacios");
        //VALIDAMOS LOS DATOS
        //SI SON CORRECTOS SE LOGUEA CORRECTACMENTE Y contador = 0
    }else if(contador+1 >= 3){
        //SE REDIRECCIONA AL SIGNUP
    }
    contador ++;
}
