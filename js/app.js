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
    return valor.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })
}

const fomatoPorcentaje = (valor) => {
    return valor.toLocaleString('en-US', { style: 'percent', minimumFractionDigits: 2 })
}

let CargarApp = () => {
    cargarCabezera();
}