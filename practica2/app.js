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

const ingreso = `<div class="row">
<div class="col-md-3"> </div>
<div class="col-md-6 container-inicio">
    <div class="row">
        <h1 class="title">Ingreso de Productos</h1>
    </div>
    <form class="formulario">
        <div class="row">
            <div class="col-md-2">
                <label for="codigo">Codigo:</label>
            </div>
            <div class="col-md-6 inputText">
                <input type="text" name="code" id="code" placeholder="Ingrese el Codigo"
                    class="form-control" />
            </div>
        </div>
        <div class="row">
            <div class="col-md-2">
                <label for="desc">Descripcion:</label>
            </div>
            <div class="col-md-6 inputText">
                <input type="text" name="desc" id="desc" placeholder="Ingrese la Descripcion"
                    class="form-control" />
            </div>
        </div>
        <div class="row">
            <div class="col-md-2">
                <label for="marca">Marca:</label>
            </div>
            <div class="col-md-6 inputText">
                <input type="text" name="marca" id="marca" placeholder="Ingrese la Marca"
                    class="form-control" />
            </div>
        </div>
        <div class="row">
            <div class="col-md-2">
                <label for="precio">Precio:</label>
            </div>
            <div class="col-md-6 inputText">
                <input type="number" name="precio" id="precio" placeholder="Ingrese el Precio"
                    class="form-control" />
            </div>
        </div>
        <div class="row">
            <div class="col-md-2">
                <label for="cant">Cantidad:</label>
            </div>
            <div class="col-md-6 inputText">
                <input type="number" name="cant" id="cant" placeholder="Ingrese la Cantidad"
                    class="form-control" />
            </div>
        </div>
        <div class="row">
            <div class="col-md-2">
                <label for="desc">IVA:</label>
            </div>
            <div class="col-md-6 inputText">
                <select name="iva" id="iva" class="form-control">
                    <option value="10">10%</option>
                    <option value="21">21%</option>
                </select>
            </div>
        </div>
        <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-6">
                <input type="button" value="Registrar Producto" class="btn btn-success"
                    onclick="guardarProducto()">
            </div>
        </div>

    </form>

</div>


<div class="col-md-2"></div>
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
    if(iva == 10){
        return `
        <div class="row row1" id="fila">

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
    }else{
        return `
        <div class="row row2" id="fila">

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
    
}

function eliminarFila(id) {
    let productos = JSON.parse(localStorage.getItem("productos"));
    productos.splice(id, 1);
    localStorage.setItem("productos", JSON.stringify(productos));
    mostrarTabla();
}

function editarFila(id) {
    let formu = document.getElementById("formulario");
    formu.innerHTML = formEdit(id);

    
}


function formEdit(id){
    let productos =JSON.parse(localStorage.getItem("productos"));
    let producto = productos[id];
    console.log(producto);
    
    return `<div class="row">
    <div class="col-md-3"> </div>
    <div class="col-md-6 container-edit">
        <div class="row">
            <h1 class="title">Editar Producto</h1>
        </div>
        <form class="formulario">
            <div class="row">
                <div class="col-md-2">
                    <label for="codigo">Codigo:</label>
                </div>
                <div class="col-md-6 inputText">
                    <input type="text" name="code" id="code" value="`+ producto.codigo +`"
                        class="form-control" />
                </div>
            </div>
            <div class="row">
                <div class="col-md-2">
                    <label for="desc">Descripcion:</label>
                </div>
                <div class="col-md-6 inputText">
                    <input type="text" name="desc" id="desc" value="`+ producto.desc +`"
                        class="form-control" />
                </div>
            </div>
            <div class="row">
                <div class="col-md-2">
                    <label for="marca">Marca:</label>
                </div>
                <div class="col-md-6 inputText">
                    <input type="text" name="marca" id="marca" value="`+ producto.marca +`"
                        class="form-control" />
                </div>
            </div>
            <div class="row">
                <div class="col-md-2">
                    <label for="precio">Precio:</label>
                </div>
                <div class="col-md-6 inputText">
                    <input type="number" name="precio" id="precio" value="`+ producto.precio +`"
                        class="form-control" />
                </div>
            </div>
            <div class="row">
                <div class="col-md-2">
                    <label for="cant">Cantidad:</label>
                </div>
                <div class="col-md-6 inputText">
                    <input type="number" name="cant" id="cant" value="`+ producto.cant +`"
                        class="form-control" />
                </div>
            </div>
            <div class="row">
                <div class="col-md-2">
                    <label for="desc">IVA:</label>
                </div>
                <div class="col-md-6 inputText">
                    <select name="iva" id="iva" class="form-control" value="`+ producto.iva +`">
                        <option value="10">10%</option>
                        <option value="21">21%</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-6">
                    <input type="button" value="Guardar" class="btn btn-success"
                        onclick="actualizarProducto(`+ id +`)">
                </div>
            </div>

        </form>

    </div>


    <div class="col-md-2"></div>
</div>`;
}

function mostrarForm(){
    let formu = document.getElementById("formulario");
    formu.innerHTML = ingreso;
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