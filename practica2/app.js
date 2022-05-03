const table_title = `<div class="row title-row" id="fila">

<div class="col-md-1">
    <h1 class="tableTitle">Codigo</h1>
</div>
<div class="col-md-2">
    <h1 class="tableTitle">Descripcion</h1>
</div>
<div class="col-md-2">
    <h1 class="tableTitle">Marca</h1>
</div>
<div class="col-md-1">
    <h1 class="tableTitle">Precio</h1>
</div>
<div class="col-md-2">
    <h1 class="tableTitle">Cantidad</h1>
</div>
<div class="col-md-1">
    <h1 class="tableTitle">IVA</h1>
</div>
<div class="col-md-1">
    <h1 class="tableTitle">Sub Total</h1>
</div>
<div class="col-md-2">
    <h1 class="tableTitle">
        Opciones
    </h1>
</div>
</div>`;

function guardarProducto(){
    let codigo = document.getElementById("code").value;
    let desc = document.getElementById("desc").value;
    let marca = document.getElementById("marca").value;
    let precio = document.getElementById("precio").value;
    let cant = document.getElementById("cant").value;
    let iva = document.getElementById("iva").value;
    let productos = [];

    let producto = {
        codigo: codigo,
        desc: desc,
        marca: marca,
        precio: precio,
        cant: cant,
        iva: iva
    }

    if(localStorage.getItem("productos") != null){
        productos = JSON.parse(localStorage.getItem("productos"));  
    }
    
    productos.push(producto);
    localStorage.setItem("productos", JSON.stringify(productos));

    mostrarTabla();
}

function mostrarTabla(){
    let productos = JSON.parse(localStorage.getItem("productos"));  
    let tabla = document.getElementById("divTabla");
    let id = 0;
    let total = 0;
    tabla.innerHTML = table_title;
    productos.forEach(element => {
        let subtotal = 0;
        if(element.iva == 10){
            subtotal = (element.precio * element.cant * 0.1);
        }else{
            subtotal = (element.precio * element.cant * 0.21);
        }

        total += subtotal;
        tabla.innerHTML += crearFila(element.codigo, element.desc, element.marca, element.precio, element.cant, element.iva, subtotal.toFixed(1), id);
        id++;
    });
    tabla.innerHTML += `
        <div class="row" id="fila" style="border-bottom: 2px">
            <div class="col-md-1">
            <h1 class="tableTitle">Total</h1>
            </div>
            <div class="col-md-8">
            
            </div>
            <div class="col-md-1">
            <h1 class="tableTitle">`+ total.toFixed(1) +`</h1>
            </div>
        </div>
    `;
}


function crearFila(codigo, desc, marca, precio, cant, iva, subtotal, id){
    let style = "row1";
    if(iva == 21){
        style = "row2";
    }
        return `
        <div class="row `+ style +`" id="fila">

                        <div class="col-md-1">
                            <h1 class="tableTitle">`+ codigo +`</h1>
                        </div>
                        <div class="col-md-2">
                            <h1 class="tableTitle">`+ desc +`</h1>
                        </div>
                        <div class="col-md-2">
                            <h1 class="tableTitle">`+ marca +`</h1>
                        </div>
                        <div class="col-md-1">
                            <h1 class="tableTitle">`+ precio +`</h1>
                        </div>
                        <div class="col-md-2">
                            <h1 class="tableTitle">`+ cant +`</h1>
                        </div>
                        <div class="col-md-1">
                            <h1 class="tableTitle">`+ iva +`</h1>
                        </div>
                        <div class="col-md-1">
                            <h1 class="tableTitle">`+ subtotal +`</h1>
                        </div>
                        <div class="col-md-1">
                            <h1 class="tableTitle">
                                <button id="elimBtn" class="opcionBtn" onclick="eliminarFila(`+ id +`)">
                                    X
                                </button>
                            </h1>
                        </div>
                        <div class="col-md-1">
                            <h1 class="tableTitle">
                                <button id="editBtn" class="opcionBtn" onclick="editarFila(`+ id +`)"
                                    style="margin-left:5%">
                                    ✏️
                                </button>
                            </h1>
                        </div>

                    </div>`;
    }

function eliminarFila(id) {
    let productos = JSON.parse(localStorage.getItem("productos"));
    productos.splice(id, 1);
    localStorage.setItem("productos", JSON.stringify(productos));
    mostrarTabla();
}

function editarFila(id) {
    let productos =JSON.parse(localStorage.getItem("productos"));
    let producto = productos[id];

    document.getElementById("formul").classList.remove("container-inicio");
    document.getElementById("formul").classList.add("container-edit");

    document.getElementById("code").value = producto.codigo;
    document.getElementById("desc").value = producto.desc;
    document.getElementById("marca").value = producto.marca;
    document.getElementById("precio").value = producto.precio;
    document.getElementById("cant").value = producto.cant;
    document.getElementById("iva").value = producto.iva;

    document.getElementById("bot").value = "Guardar";
    document.getElementById("bot").setAttribute('onclick',  'actualizarProducto('+ id +');');    
}

function mostrarForm(){
    document.getElementById("formul").classList.add("container-inicio");
    document.getElementById("formul").classList.remove("container-edit");

    document.getElementById("code").value = "";
    document.getElementById("desc").value = "";
    document.getElementById("marca").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("cant").value = "";
    document.getElementById("iva").value;

    document.getElementById("bot").value = "Registar producto";
    document.getElementById("bot").setAttribute('onclick',  'guardarProducto()');
}

function actualizarProducto(id){
    let productos =JSON.parse(localStorage.getItem("productos"));

    let codigo = document.getElementById("code").value;
    let desc = document.getElementById("desc").value;
    let marca = document.getElementById("marca").value;
    let precio = document.getElementById("precio").value;
    let cant = document.getElementById("cant").value;
    let iva = document.getElementById("iva").value;
    
    console.log(id);
    console.log(productos[id]);

    productos[id].codigo = codigo;
    productos[id].desc = desc;
    productos[id].marca = marca;
    productos[id].precio = precio;
    productos[id].cant = cant;
    productos[id].iva = iva;

    localStorage.setItem("productos", JSON.stringify(productos));
    mostrarTabla();
    mostrarForm();
}