const ingresos = [
    new Ingreso('Salario', 2100),
    new Ingreso('venta Xbox', 5000),
    new Ingreso('Infinix Gt20pro', 6500)
];

const egresos = [
    new Egreso('BBVA', 3800),
    new Egreso('pizza', 250),
    new Egreso('Cine', 650)
];


let totalIngreso = () => {
    let totalIngreso = 0;

    for (const ingreso of ingresos) {
        totalIngreso += ingreso.valor;
    }

    return totalIngreso;
}

let totalEgreso = () => {
    let totalEgreso = 0;
    for (const egreso of egresos) {
        totalEgreso += egreso.valor
    }
    return totalEgreso;
}


let cargarCabezera = () => {
    let presupuesto = totalIngreso() - totalEgreso();
    let porcentaje = totalEgreso() / totalIngreso();
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = fomatoPorcentaje(porcentaje);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngreso());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgreso());
}


const formatoMoneda = (valor) => {
    return valor.toLocaleString('es-MX', { style: 'currency', currency: 'MNX', minimumFractionDigits: 2 })
}

const fomatoPorcentaje = (valor) => {
    if (!valor || isNaN(valor)) {
        return "0%" 
    }else {
        return valor.toLocaleString('en-MX', { style: 'percent', minimumFractionDigits: 2 })
    }
}

let CargarApp = () => {
    cargarCabezera();
    cargarIngresos();
    cargarEgresos();
}


const cargarIngresos = () => {
    let ingresosHtml = '';
    for (const ingreso of ingresos) {
        ingresosHtml += crearIngresosHtml(ingreso)
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHtml;
}

const crearIngresosHtml = (ingreso) => {
    let ingresoHtml = `
<div class="elemento limpiarEstilo">
            <div class="elemento_descripcion">${ingreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
              <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)} </div>
              <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn" onClick='eliminarIngreso(${ingreso.id})'>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-trash3-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>`;
    return ingresoHtml;
}

const cargarEgresos = () => {
    let EgresoHtml = '';
    for (const egreso of egresos) {
        EgresoHtml += crearEgresoHtml(egreso)
    }
    document.getElementById('lista-egresos').innerHTML = EgresoHtml;
}

const crearEgresoHtml = (egreso) => {
    let EgresoHTML = `
 
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${egreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
              <div class="elemento_valor">-${formatoMoneda(egreso.valor)}</div>
              <div class="elemento_porcentaje">${fomatoPorcentaje(egreso.valor / totalEgreso())}</div>
              <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn" onClick='eliminarEgreso(${egreso.id})'>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-trash3-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
 `;

    return EgresoHTML;
}

const eliminarIngreso = (id) => {

    let indexEliminar = ingresos.findIndex(ingreso => ingreso.id === id);

    ingresos.splice(indexEliminar, 1);

    cargarCabezera();
    cargarIngresos();

}

const eliminarEgreso = (id) => {

    let indexEl = egresos.findIndex(egreso => egreso.id === id);

    egresos.splice(indexEl, 1)

    cargarCabezera()
    cargarEgresos()

    console.log("eliminadoel id ");


}

let agregarDato = () => {
    let formulario = document.forms['forma'];
    let tipo = formulario['tipo'];
    let desc = formulario['descripcion'];
    let valor = formulario['valor'];

    if (desc.value !== '' && valor.value !== '') {
        if (tipo.value === 'ingreso') {
            ingresos.push(new Ingreso(descripcion.value, parseInt(valor.value)))
            cargarCabezera();
            cargarIngresos();
            console.log("Se agrego exitosamente ");

        } else if (tipo.value === "egreso") {
            egresos.push(new Egreso(descripcion.value, parseInt(valor.value)))
            cargarCabezera();
            cargarEgresos();
            console.log("Se agrego correctamente ");

        }
    } else {
        return alert('Ingresa una descripcion y un monto por favor');
    }


}