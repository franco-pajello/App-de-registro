async function login() {
  try {
    let username = document.getElementById('name').value;
    let password = document.getElementById('password').value;
    let options = {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=utf-8 ' },
      body: JSON.stringify({ username: username, password: password }),
    };
    await fetch('http://localhost:8080/login', options);
  } catch (error) {
    console.log(error);
  }
}
async function signup() {
  try {
    let username = await document.getElementById('name').value;
    let direccion = await document.getElementById('direccion').value;
    let altura = await document.getElementById('altura').value;
    let telefono = await document.getElementById('telefono').value;
    let password = await document.getElementById('password').value;

    let options = {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=utf-8 ' },
      body: JSON.stringify({
        username: username,
        direccion: direccion,
        altura: altura,
        telefono: telefono,
        password: password,
      }),
    };
    await fetch('http://localhost:8080/registro', options)
      .then((res) => {
        res.json();
      })
      .then((d) => {
        return d;
      });

    return;
  } catch (error) {
    console.log(error);
  }
}
async function debe(id) {
  try {
    const resUpDeudaProducto = await document.getElementById(`UpDeudaProducto${id}`).value;
    const resUpDeudaPrecio = await document.getElementById(`UpDeudaPrecio${id}`).value;
    const resUpProdId = await document.getElementById(`prodId${id}`).value;
    if (resUpProdId == '') {
      let options = {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=utf-8 ' },
        body: JSON.stringify({
          id: id,
          producto: resUpDeudaProducto,
          precio: resUpDeudaPrecio,
        }),
      };
      await fetch(`http://localhost:8080/up`, options)
        .then((res) => {
          return res.ok ? res.json() : Promise.reject(res);
        })
        .then(() => {
          document.getElementById(`UpDeudaProducto${id}`).value = '';
          document.getElementById(`UpDeudaPrecio${id}`).value = '';
          return;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally();

      return;
    }
    const resUpDeudaFecha = await document.getElementById(`fechaRegistro${resUpProdId}`).textContent;
    let options = {
      method: 'PUT',
      headers: { 'Content-type': 'application/json; charset=utf-8 ' },
      body: JSON.stringify({
        id: id,
        idProd: resUpProdId,
        producto: resUpDeudaProducto,
        precio: resUpDeudaPrecio,
        fecha: resUpDeudaFecha,
      }),
    };
    await fetch(`http://localhost:8080/up`, options)
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(res);
      })
      .then(() => {
        document.getElementById(`UpDeudaProducto${id}`).value = '';
        document.getElementById(`UpDeudaPrecio${id}`).value = '';
        document.getElementById(`prodId${id}`).value = '';
        return;
      })
      .catch((error) => {
        console.log(error);
      })
      .finally();

    return;
  } catch (error) {
    console.log(error);
  }
}
async function ver(id) {
  try {
    await fetch(`http://localhost:8080/cliente/${id}`)
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(res);
      })
      .then((data) => {
        let h = '';
        let total = '';
        console.log(data);

        if (data.success == false) {
          h = `<h2 >no hay productos</h2>`;
          document.getElementById(`CargarDeuda${id}`).innerHTML = h;
          return;
        }
        _dataArray = data[0];
        total = data[1].total;

        _dataArray.forEach((element) => {
          let fecha = new Date(element.fecha).toLocaleDateString();
          h += `
              <div>
                <h2 >producto:<span id='productoRegistro${element._id}'>${element.producto}</span></h2>
                <h2 >precio:<span id="precioRegistro${element._id}">${element.precio}</span></h2>
                <h2 >fecha:<span id="fechaRegistro${element._id}">${fecha}</span></h2>
                <button  onclick="editar('${element._id}','${id}')">Editar</button>
                <button  onclick="eliminar('${element._id}','${id}')">Eliminar</button>
              </div>
          `;
        });
        document.getElementById(`CargarDeuda${id}`).innerHTML = h;

        if (total < 0) {
          total = data[1].total * -1;
          document.getElementById(`C${id}`).innerHTML = `<h2>a favor: ${total}</h2>`;
          return;
        }
        if (total == 0) {
          h = `<h2 >no hay productos</h2>`;
          document.getElementById(`C${id}`).innerHTML = '';
          document.getElementById(`CargarDeuda${id}`).innerHTML = h;
          return;
        }
        document.getElementById(`C${id}`).innerHTML = `<h2>debe: ${total}</h2>
        <button  onclick="eliminarRegistro('${id}')">eliminar registro</button>`;
        return;
      })
      .catch((error) => {
        console.log(error);
      })
      .finally();
    return;
  } catch (error) {
    console.log(error);
  }
}
async function newCliente() {
  try {
    let username = await document.getElementById('nameCliente').value;
    let direccion = await document.getElementById('direccionCliente').value;
    let descripcion = await document.getElementById('descripcionCliente').value;
    let Altura = await document.getElementById('AlturaCliente').value;

    let options = {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=utf-8 ' },
      body: JSON.stringify({
        nombre: username,
        direccion: direccion,
        descripcion: descripcion,
        Altura: Altura,
      }),
    };
    await fetch('http://localhost:8080/newcliente', options)
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(res);
      })
      .then((data) => {
        if (data == true) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Cliente existente!',
          });
          document.getElementById('nameCliente').value = '';
          document.getElementById('direccionCliente').value = '';
          document.getElementById('descripcionCliente').value = '';
          document.getElementById('AlturaCliente').value = '';
          return;
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    return;
  } catch (error) {
    console.log(error);
  }
}
async function monto(id) {
  try {
    let r = document.getElementById('pagoDeudaProducto').value;
    let options = {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=utf-8 ' },
      body: JSON.stringify({
        id: id,
        monto: r,
      }),
    };
    await fetch(`http://localhost:8080/monto`, options);
    return;
  } catch (error) {
    console.log(error);
  }
}
async function editar(idProd, id) {
  try {
    let r = (document.getElementById(`UpDeudaProducto${id}`).value = document.getElementById(`productoRegistro${idProd}`).textContent);
    let re = (document.getElementById(`UpDeudaPrecio${id}`).value = document.getElementById(`precioRegistro${idProd}`).textContent);
    document.getElementById(`prodId${id}`).value = idProd;

    return;
  } catch (error) {
    console.log(error);
  }
}
async function eliminarCliente(idCliente) {
  try {
    let options = {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json; charset=utf-8 ' },
    };
    await fetch(`http://localhost:8080/eliminarCliente/${idCliente}`, options);
    return;
  } catch (error) {
    console.log(error);
  }
}
async function eliminar(idProducto, idCliente) {
  try {
    let producto = document.getElementById(`productoRegistro${idProducto}`).textContent;
    let precio = document.getElementById(`precioRegistro${idProducto}`).textContent;
    let fecha = document.getElementById(`fechaRegistro${idProducto}`).textContent;

    let options = {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json; charset=utf-8 ' },
      body: JSON.stringify({
        idCliente,
        producto: producto,
        precio: precio,
        fecha: fecha,
      }),
    };
    await fetch(`http://localhost:8080/eliminar/${idProducto}`, options);
    return;
  } catch (error) {
    console.log(error);
  }
}
async function eliminarRegistro(idCliente) {
  try {
    let options = {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json; charset=utf-8 ' },
    };
    await fetch(`http://localhost:8080/eliminarTodo/${idCliente}`, options);
    return;
  } catch (error) {
    console.log(error);
  }
}
