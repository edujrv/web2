const signupH = `<div class="row pad">
<h1 style="text-align: center;">
    Registro de Usuarios
</h1>
</div>
<form id="formu">
<div class="row pad">
<div class="col-md-1"></div>
<div class="col-md-2">
<label for="user" class="form-label">Usuario</label>
</div>
<div class="col-md-7">
<input
  type="text"
  class="form-control"
  id="user"
  placeholder="Ingrese su Usuario"
/>
</div>
</div>

<div class="row pad">
<div class="col-md-1"></div>
<div class="col-md-2">
<label for="mail" class="form-label">Email</label>
</div>
<div class="col-md-7">
<input
  type="email"
  class="form-control"
  id="mail"
  placeholder="Ingrese su Email"
/>
</div>
</div>
<div class="row pad">
<div class="col-md-1"></div>
<div class="col-md-2">
<label for="password" class="form-label">Constrasenia</label>
</div>
<div class="col-md-7">
<input
  type="password"
  class="form-control"
  id="password"
  placeholder="Ingrese su Contrasenia"
/>
</div>
</div>
<div class="row pad" id="perfilClass">
<!-- <div class="col-md-1"></div>
<div class="col-md-2">
  <label for="perfil" class="form-label">Perfil</label>
</div>
<div class="col-md-7">
    <select class="form-select" id="perfil" disabled>
        <option selected>Estandar</option>
        <option value="avanzado">Avanzado</option>
        <option value="admin">Administrador</option>
      </select>
</div> -->
</div>


<div class="row pad">
<div class="col-md-3"></div>
<div class="col-md-7" style="padding-bottom: 10px">
<input type="submit" class="btn btn-primary pad" onclick="validarSignUp()" value="Registrar">
</div>
</div>
</form>`;

const perfil_admin = `
<div class="col-md-1"></div>
<div class="col-md-2">
  <label for="perfil" class="form-label">Perfil</label>
</div>
<div class="col-md-7">
    <select class="form-select" id="perfil">
        <option selected>Estandar</option>
        <option value="avanzado">Avanzado</option>
        <option value="admin">Administrador</option>
      </select>
</div>`;


const perfil_user = `
<div class="col-md-1"></div>
<div class="col-md-2">
  <label for="perfil" class="form-label">Perfil</label>
</div>
<div class="col-md-7">
    <select class="form-select" id="perfil" disabled>
        <option selected>Estandar</option>
        <option value="avanzado">Avanzado</option>
        <option value="admin">Administrador</option>
      </select>
</div>`;

const table_header = `<div class="row">
<div class="col-md-3">
  <h1 class="tableH1">Usuario</h1>
</div>
<div class="col-md-3">
  <h1 class="tableH1" >Mail</h1>
</div>
<div class="col-md-3">
  <h1 class="tableH1">Perfil</h1>
</div>
<div class="col-md-3">
  <h1 class="tableH1" >Opciones</h1>
</div>
</div>`;






function estaVacio(campo) {
    if (campo.value == "") {
        campo.setAttribute("style", "border-color:red; border-width:3px;");
        return true;
    } else {
        campo.setAttribute("style", "border-color:green; border-width:3px;");
        return false;
    }
}

function validarSignUp() {


    let usuario = document.getElementById("user");
    let mail = document.getElementById("mail");
    let pass = document.getElementById("password");
    let perfil = document.getElementById("perfil");

    if (!camposVacios(usuario, mail, pass) && mail.value.includes("@")) {
        crearUsuario(usuario, mail, pass, perfil);
    }

}

function crearUsuario(user, mail, pass, perfil) {

    let newUser = {
        usuario: user.value,
        mail: mail.value,
        pass: pass.value,
        perfil: perfil.value
    }

    let data = [];

    crearAdmin();


    if (localStorage.getItem("perfil") === null) {
        localStorage.setItem("perfil", "estandar");
    }

    data = JSON.parse(localStorage.getItem("users"));

    if (exists(newUser.usuario)) {
        alert("Usuario ya existente");
    } else {
        data.push(newUser);
        localStorage.setItem("users", JSON.stringify(data));
        alert("Usuario creado exitosamente");
    }

    if(!(document.getElementById("divTable").innerHTML == "")){
        crearTabla();
    }


}

function exists(username) {
    let users = JSON.parse(localStorage.getItem("users"));
    let exist = false;
    users.forEach(element => {
        if (element.usuario == username) {
            exist = true;
        }
    });
    return exist;
}

function camposVacios(usuario, mail, contrasenia) {
    if (estaVacio(usuario) || estaVacio(mail) || estaVacio(contrasenia)) {
        return true;
    } else {
        return false;
    }
}




function validarLogIn() {
    let usuario = document.getElementById("user");
    let mail = document.getElementById("mail");
    let pass = document.getElementById("password");
    let perfil;

    crearAdmin();

    if (localStorage.getItem("perfil") === null) {
        localStorage.setItem("perfil", "Estandar");
    }
    if (localStorage.getItem("contador") === null) {
        localStorage.setItem("contador", 0);
    }

    if (!camposVacios(usuario, mail, pass)) {
        
        if( localStorage.getItem("contador") < 3){
            if (autenticar(usuario.value, pass.value)) {
                localStorage.setItem("contador", 0);//reseteo contador
            
            perfil = localStorage.getItem("perfil");
            alert("Bienvenido de nuevo " + usuario.value);   

        if(perfil == "admin"){
            document.getElementById("divForm").innerHTML = signupH;
            document.getElementById("divForm").classList.add("container-signup");
            document.getElementById("divForm").classList.remove("container-login");
            printPerfilAdmin();
            crearTabla();
        }else{
            alert("ELSE Perfil: " + perfil);
            document.getElementById("divForm").innerHTML = "";
            document.getElementById("divForm").classList.remove("container-login");
            crearTabla();
        }
            
        }
        
        }else{
            formReg();
        }
        
        //VALIDAMOS LOS DATOS
        //SI SON CORRECTOS SE LOGUEA CORRECTACMENTE Y contador = 0
     
       
        
    }
}

function autenticar(username, pass) {
    let users = JSON.parse(localStorage.getItem("users"));
    let exist = false;
    let contador = parseInt(localStorage.getItem("contador"));
    users.forEach(element => {
        if (element.usuario == username && element.pass == pass) {
            exist = true;
            localStorage.setItem("perfil", element.perfil);
            contador = -1;
        }
    });
    localStorage.setItem("contador", contador+1);
    return exist;
}

function printPerfilAdmin(){
    document.getElementById("perfilClass").innerHTML = perfil_admin;
}

function crearAdmin(){
    if (localStorage.getItem("users") === null) {
        let data = [];
        let admUser = {
            usuario: "admin",
            mail: "admin@admin.com",
            pass: "admin123",
            perfil: "admin"
        }
        data.push(admUser);
        localStorage.setItem("users", JSON.stringify(data));

    }
}

function formReg(){
    document.getElementById("divForm").innerHTML = signupH;
    document.getElementById("divForm").classList.add("container-signup");
    document.getElementById("divForm").classList.remove("container-login");
    document.getElementById("perfilClass").innerHTML = perfil_user;
    localStorage.setItem("contador", 0);// reseteo el contador
}

function crearTabla(){
    let tabla = document.getElementById("divTable");
    tabla.classList.add("container-table");
    tabla.innerHTML = table_header;
    let data =JSON.parse(localStorage.getItem("users"));
    let id = 0;
    let flag = true


    if(localStorage.getItem("perfil") == "admin"){
        data.forEach(element => {
        tabla.innerHTML += createRowAdmin(element.usuario, element.mail, element.perfil, id, flag);
        id++;
        flag = !flag;
    });
    }else{
        data.forEach(element => {
            tabla.innerHTML += createRow(element.usuario, element.mail, element.perfil, id, flag);
            id++;
            flag = !flag;
        });
    }
    
}

function createRow(user, mail, perfil, id, flag){
    if (flag){
        return `<div class="row row1">
    <div class="col-md-3">
      <h1 class="tableH1" id="user">`+ user + `</h1>
    </div>
    <div class="col-md-3">
      <h1 class="tableH1" id="mail">`+ mail + `</h1>
    </div>
    <div class="col-md-3">
      <h1 class="tableH1" id="perfil">`+ perfil + `</h1>
    </div>
    <div class="col-md-3">
    <button onclick="Borrar(`+ id +`)" disabled="disabled" class="btn btn-outline-danger"> Eliminar </button>
    </div>
    </div>`;
    } else{
        return `<div class="row row2">
    <div class="col-md-3">
      <h1 class="tableH1" id="user">`+ user + `</h1>
    </div>
    <div class="col-md-3">
      <h1 class="tableH1" id="mail">`+ mail + `</h1>
    </div>
    <div class="col-md-3">
      <h1 class="tableH1" id="perfil">`+ perfil + `</h1>
    </div>
    <div class="col-md-3">
    <button onclick="Borrar(`+ id +`)" disabled="disabled" class="btn btn-outline-danger"> Eliminar </button>
    </div>
    </div>`;
    }
}

function createRowAdmin(user, mail, perfil, id, flag){
    if (flag){
        return `<div class="row row1">
    <div class="col-md-3">
      <h1 class="tableH1" id="user">`+ user + `</h1>
    </div>
    <div class="col-md-3">
      <h1 class="tableH1" id="mail">`+ mail + `</h1>
    </div>
    <div class="col-md-3">
      <h1 class="tableH1" id="perfil">`+ perfil + `</h1>
    </div>
    <div class="col-md-3">
    <button onclick="Borrar(`+ id +`)" class="btn btn-outline-danger"> Eliminar </button>
    </div>
    </div>`;
    } else{
        return `<div class="row row2">
    <div class="col-md-3">
      <h1 class="tableH1" id="user">`+ user + `</h1>
    </div>
    <div class="col-md-3">
      <h1 class="tableH1" id="mail">`+ mail + `</h1>
    </div>
    <div class="col-md-3">
      <h1 class="tableH1" id="perfil">`+ perfil + `</h1>
    </div>
    <div class="col-md-3">
    <button onclick="Borrar(`+ id +`)" class="btn btn-outline-danger"> Eliminar </button>
    </div>
    </div>`;
    }
}

function Borrar(id){
    let data =JSON.parse(localStorage.getItem("users"));
    data.splice(id,1);
    localStorage.setItem("users", JSON.stringify(data));
    crearTabla();
}