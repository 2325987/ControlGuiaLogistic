// ======================================================
// CONTROL DE GUÍAS DE TRANSPORTE Y LOGÍSTICA
// ======================================================


// ======================================================
// 0. CONFIGURACIÓN DEL LOGIN
// ======================================================

const USUARIO_CORRECTO = "logistic";
const CLAVE_CORRECTA = "Lg1234";


// ======================================================
// ELEMENTOS DEL LOGIN
// ======================================================

const login = document.getElementById("login");

const sistema = document.getElementById("sistema");

const usuarioInput =
    document.getElementById("usuario");

const claveInput =
    document.getElementById("clave");

const btnLogin =
    document.getElementById("btnLogin");

const mostrarClave =
    document.getElementById("mostrarClave");

const mensajeLogin =
    document.getElementById("mensajeLogin");

const cerrarSesion =
    document.getElementById("cerrarSesion");


// ======================================================
// VERIFICAR SESIÓN
// ======================================================

const sesionActiva =
    sessionStorage.getItem("sesionActiva");


// ======================================================
// MOSTRAR SISTEMA
// ======================================================

function mostrarSistema() {

    login.style.display = "none";

    sistema.classList.remove("sistema-oculto");

}


// ======================================================
// MOSTRAR LOGIN
// ======================================================

function mostrarLogin() {

    login.style.display = "flex";

    sistema.classList.add("sistema-oculto");

    usuarioInput.value = "";

    claveInput.value = "";

    mensajeLogin.textContent = "";

    usuarioInput.focus();

}


// ======================================================
// INICIAR SESIÓN
// ======================================================

function iniciarSesion() {

    const usuario =
        usuarioInput.value.trim();

    const clave =
        claveInput.value;


    if (
        usuario === "" ||
        clave === ""
    ) {

        mensajeLogin.textContent =
            "⚠️ Ingrese el usuario y la contraseña.";

        mensajeLogin.className =
            "mensaje-login error";

        return;

    }


    if (
        usuario === USUARIO_CORRECTO &&
        clave === CLAVE_CORRECTA
    ) {

        sessionStorage.setItem(
            "sesionActiva",
            "true"
        );


        mensajeLogin.textContent =
            "✅ Acceso correcto.";

        mensajeLogin.className =
            "mensaje-login exito";


        setTimeout(
            function() {

                mostrarSistema();

            },
            500
        );

    }

    else {

        mensajeLogin.textContent =
            "❌ Usuario o contraseña incorrectos.";

        mensajeLogin.className =
            "mensaje-login error";

        claveInput.value = "";

        claveInput.focus();

    }

}


// ======================================================
// BOTÓN LOGIN
// ======================================================

btnLogin.addEventListener(
    "click",
    iniciarSesion
);


// ======================================================
// ENTER PARA LOGIN
// ======================================================

claveInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            iniciarSesion();

        }

    }
);


// ======================================================
// MOSTRAR / OCULTAR CONTRASEÑA
// ======================================================

mostrarClave.addEventListener(
    "click",
    function() {

        if (
            claveInput.type === "password"
        ) {

            claveInput.type = "text";

            mostrarClave.textContent = "🙈";

        }

        else {

            claveInput.type = "password";

            mostrarClave.textContent = "👁️";

        }

    }
);


// ======================================================
// CERRAR SESIÓN
// ======================================================

cerrarSesion.addEventListener(
    "click",
    function() {

        const confirmar =
            confirm(
                "¿Está seguro de cerrar la sesión?"
            );


        if (!confirmar) {

            return;

        }


        sessionStorage.removeItem(
            "sesionActiva"
        );


        mostrarLogin();

    }
);


// ======================================================
// COMPROBAR SESIÓN AL CARGAR
// ======================================================

if (sesionActiva === "true") {

    mostrarSistema();

}

else {

    mostrarLogin();

}


// ======================================================
// 1. CARGAR GUÍAS
// ======================================================

let guias =
    JSON.parse(
        localStorage.getItem("guias")
    ) || [];


// ======================================================
// 2. ELEMENTOS DEL FORMULARIO
// ======================================================

const guiaInput =
    document.getElementById("guia");

const fechaInput =
    document.getElementById("fecha");

const placaInput =
    document.getElementById("placa");

const lugarInput =
    document.getElementById("lugar");

const montoInput =
    document.getElementById("monto");

const hojasInput =
    document.getElementById("hojas");

const estadoInput =
    document.getElementById("estado");


// ======================================================
// ELEMENTOS DE LA TABLA
// ======================================================

const tablaGuias =
    document.getElementById("tablaGuias");

const contador =
    document.getElementById("contador");

const salida =
    document.getElementById("salida");


// ======================================================
// BOTONES
// ======================================================

const botonAgregar =
    document.getElementById("agregar");

const botonModificar =
    document.getElementById("modificar");

const botonEliminar =
    document.getElementById("eliminar");

const botonObtener =
    document.getElementById("obtener");

const botonLimpiar =
    document.getElementById("limpiar");


// ======================================================
// BÚSQUEDA
// ======================================================

const buscarGuiaInput =
    document.getElementById("buscarGuia");


// ======================================================
// FILTROS
// ======================================================

const filtrarPlacaInput =
    document.getElementById("filtrarPlaca");

const filtrarEstadoInput =
    document.getElementById("filtrarEstado");

const ordenarInput =
    document.getElementById("ordenar");

const botonQuitarFiltros =
    document.getElementById("quitarFiltros");


// ======================================================
// 3. GUARDAR DATOS
// ======================================================

function guardarDatos() {

    localStorage.setItem(
        "guias",
        JSON.stringify(guias)
    );

}


// ======================================================
// 4. MOSTRAR MENSAJE
// ======================================================

function mostrarMensaje(
    mensaje,
    tipo = "normal"
) {

    salida.textContent = mensaje;


    if (tipo === "exito") {

        salida.style.background = "#dcfce7";

        salida.style.color = "#166534";

    }

    else if (tipo === "error") {

        salida.style.background = "#fee2e2";

        salida.style.color = "#991b1b";

    }

    else if (tipo === "advertencia") {

        salida.style.background = "#fef3c7";

        salida.style.color = "#92400e";

    }

    else {

        salida.style.background = "#f1f5f9";

        salida.style.color = "#334155";

    }

}


// ======================================================
// 5. CLASE PARA ESTADO
// ======================================================

function obtenerClaseEstado(estado) {

    switch (estado) {

        case "Pendiente":

            return "estado-pendiente";


        case "En tránsito":

            return "estado-transito";


        case "Entregado":

            return "estado-entregado";


        case "Cancelado":

            return "estado-cancelado";


        default:

            return "";

    }

}


// ======================================================
// 6. ACTUALIZAR FILTRO DE PLACAS
// ======================================================

function actualizarFiltroPlacas() {

    const placaSeleccionada =
        filtrarPlacaInput.value;


    const placas = [
        ...new Set(
            guias
                .map(function(item) {

                    return item.placa;

                })
                .filter(function(placa) {

                    return placa &&
                           placa.trim() !== "";

                })
        )
    ];


    placas.sort(
        function(a, b) {

            return a.localeCompare(
                b,
                undefined,
                {
                    numeric: true,
                    sensitivity: "base"
                }
            );

        }
    );


    filtrarPlacaInput.innerHTML = `
        <option value="todos">
            Todas las placas
        </option>
    `;


    placas.forEach(
        function(placa) {

            const opcion =
                document.createElement("option");

            opcion.value = placa;

            opcion.textContent = placa;

            filtrarPlacaInput.appendChild(
                opcion
            );

        }
    );


    if (
        placas.includes(
            placaSeleccionada
        )
    ) {

        filtrarPlacaInput.value =
            placaSeleccionada;

    }

    else {

        filtrarPlacaInput.value =
            "todos";

    }

}


// ======================================================
// 7. MOSTRAR GUÍAS
// ======================================================

function mostrarGuias() {

    const textoBusqueda =
        buscarGuiaInput.value
            .trim()
            .toLowerCase();


    const placaFiltro =
        filtrarPlacaInput.value;


    const estadoFiltro =
        filtrarEstadoInput.value;


    const orden =
        ordenarInput.value;


    let guiasMostrar =
        [...guias];


    // ==================================================
    // BUSCAR GUÍA
    // ==================================================

    if (
        textoBusqueda !== ""
    ) {

        guiasMostrar =
            guiasMostrar.filter(
                function(item) {

                    return item.guia
                        .toLowerCase()
                        .includes(
                            textoBusqueda
                        );

                }
            );

    }


    // ==================================================
    // FILTRAR PLACA
    // ==================================================

    if (
        placaFiltro !== "todos"
    ) {

        guiasMostrar =
            guiasMostrar.filter(
                function(item) {

                    return (
                        item.placa || ""
                    ).toLowerCase() ===
                    placaFiltro.toLowerCase();

                }
            );

    }


    // ==================================================
    // FILTRAR ESTADO
    // ==================================================

    if (
        estadoFiltro !== "todos"
    ) {

        guiasMostrar =
            guiasMostrar.filter(
                function(item) {

                    return (
                        item.estado ===
                        estadoFiltro
                    );

                }
            );

    }


    // ==================================================
    // ORDENAR
    // ==================================================

    guiasMostrar.sort(
        function(a, b) {

            if (
                orden === "guiaAsc"
            ) {

                return a.guia.localeCompare(
                    b.guia,
                    undefined,
                    {
                        numeric: true,
                        sensitivity: "base"
                    }
                );

            }


            if (
                orden === "guiaDesc"
            ) {

                return b.guia.localeCompare(
                    a.guia,
                    undefined,
                    {
                        numeric: true,
                        sensitivity: "base"
                    }
                );

            }


            if (
                orden === "fechaAsc"
            ) {

                return new Date(a.fecha)
                    - new Date(b.fecha);

            }


            if (
                orden === "fechaDesc"
            ) {

                return new Date(b.fecha)
                    - new Date(a.fecha);

            }


            if (
                orden === "placaAsc"
            ) {

                return (
                    a.placa || ""
                ).localeCompare(
                    b.placa || "",
                    undefined,
                    {
                        numeric: true,
                        sensitivity: "base"
                    }
                );

            }


            if (
                orden === "placaDesc"
            ) {

                return (
                    b.placa || ""
                ).localeCompare(
                    a.placa || "",
                    undefined,
                    {
                        numeric: true,
                        sensitivity: "base"
                    }
                );

            }


            if (
                orden === "montoAsc"
            ) {

                return Number(a.monto)
                    - Number(b.monto);

            }


            if (
                orden === "montoDesc"
            ) {

                return Number(b.monto)
                    - Number(a.monto);

            }


            if (
                orden === "hojasAsc"
            ) {

                return Number(a.hojas)
                    - Number(b.hojas);

            }


            if (
                orden === "hojasDesc"
            ) {

                return Number(b.hojas)
                    - Number(a.hojas);

            }


            return 0;

        }
    );


    // ==================================================
    // LIMPIAR TABLA
    // ==================================================

    tablaGuias.innerHTML = "";


    // ==================================================
    // NO HAY RESULTADOS
    // ==================================================

    if (
        guiasMostrar.length === 0
    ) {

        tablaGuias.innerHTML = `

            <tr>

                <td colspan="8">

                    🔎 No se encontraron guías.

                </td>

            </tr>

        `;

    }


    // ==================================================
    // MOSTRAR GUÍAS
    // ==================================================

    guiasMostrar.forEach(
        function(item) {

            const fila =
                document.createElement("tr");


            fila.innerHTML = `

                <td>

                    <strong>
                        ${item.guia}
                    </strong>

                </td>


                <td>
                    ${item.fecha}
                </td>


                <td>

                    <strong>
                        ${item.placa || "-"}
                    </strong>

                </td>


                <td>
                    ${item.lugar}
                </td>


                <td>

                    ₡${Number(
                        item.monto
                    ).toLocaleString("es-CR")}

                </td>


                <td>

                    ${item.hojas || 0}

                </td>


                <td>

                    <span
                        class="estado ${obtenerClaseEstado(item.estado)}"
                    >

                        ${item.estado}

                    </span>

                </td>


                <td>

                    <button
                        class="btn-tabla btn-tabla-modificar"
                        type="button"
                    >

                        ✏️ Modificar

                    </button>


                    <button
                        class="btn-tabla btn-tabla-eliminar"
                        type="button"
                    >

                        🗑️ Eliminar

                    </button>

                </td>

            `;


            // ==================================================
            // ÍNDICE REAL
            // ==================================================

            const indiceReal =
                guias.findIndex(
                    function(g) {

                        return (
                            g.guia ===
                            item.guia
                        );

                    }
                );


            // ==================================================
            // MODIFICAR DESDE TABLA
            // ==================================================

            const botonModificarTabla =
                fila.querySelector(
                    ".btn-tabla-modificar"
                );


            botonModificarTabla.addEventListener(
                "click",
                function() {

                    seleccionarGuia(
                        indiceReal
                    );

                }
            );


            // ==================================================
            // ELIMINAR DESDE TABLA
            // ==================================================

            const botonEliminarTabla =
                fila.querySelector(
                    ".btn-tabla-eliminar"
                );


            botonEliminarTabla.addEventListener(
                "click",
                function() {

                    eliminarDesdeTabla(
                        indiceReal
                    );

                }
            );


            tablaGuias.appendChild(
                fila
            );

        }
    );


    // ==================================================
    // CONTADOR
    // ==================================================

    contador.textContent =
        guiasMostrar.length +
        (
            guiasMostrar.length === 1
                ? " guía"
                : " guías"
        );

}


// ======================================================
// 8. LIMPIAR FORMULARIO
// ======================================================

function limpiarFormulario() {

    guiaInput.value = "";

    fechaInput.value = "";

    placaInput.value = "";

    lugarInput.value = "";

    montoInput.value = "";

    hojasInput.value = "";

    estadoInput.value = "";

    guiaInput.focus();

}


// ======================================================
// 9. AGREGAR GUÍA
// ======================================================

botonAgregar.addEventListener(
    "click",
    function() {

        const guia =
            guiaInput.value.trim();

        const fecha =
            fechaInput.value;

        const placa =
            placaInput.value
                .trim()
                .toUpperCase();

        const lugar =
            lugarInput.value.trim();

        const monto =
            montoInput.value;

        const hojas =
            hojasInput.value;

        const estado =
            estadoInput.value;


        // ==================================================
        // VALIDAR CAMPOS
        // ==================================================

        if (
            guia === "" ||
            fecha === "" ||
            placa === "" ||
            lugar === "" ||
            monto === "" ||
            hojas === "" ||
            estado === ""
        ) {

            mostrarMensaje(
                "⚠️ Complete todos los campos.",
                "error"
            );

            return;

        }


        // ==================================================
        // VALIDAR MONTO
        // ==================================================

        if (
            Number(monto) <= 0
        ) {

            mostrarMensaje(
                "⚠️ El monto debe ser mayor que cero.",
                "error"
            );

            return;

        }


        // ==================================================
        // VALIDAR HOJAS
        // ==================================================

        if (
            Number(hojas) < 1 ||
            Number(hojas) > 10
        ) {

            mostrarMensaje(
                "⚠️ La cantidad de hojas debe estar entre 1 y 10.",
                "error"
            );

            return;

        }


        // ==================================================
        // VERIFICAR GUÍA DUPLICADA
        // ==================================================

        const existe =
            guias.some(
                function(item) {

                    return item.guia
                        .toLowerCase() ===
                        guia.toLowerCase();

                }
            );


        if (existe) {

            mostrarMensaje(
                "⚠️ El número de guía ya existe.",
                "advertencia"
            );

            return;

        }


        // ==================================================
        // CREAR GUÍA
        // ==================================================

        const nuevaGuia = {

            guia: guia,

            fecha: fecha,

            placa: placa,

            lugar: lugar,

            monto: Number(monto),

            hojas: Number(hojas),

            estado: estado

        };


        // ==================================================
        // AGREGAR
        // ==================================================

        guias.push(
            nuevaGuia
        );


        guardarDatos();

        actualizarFiltroPlacas();

        mostrarGuias();

        limpiarFormulario();


        mostrarMensaje(
            "✅ Guía agregada y guardada correctamente.",
            "exito"
        );

    }
);


// ======================================================
// 10. OBTENER GUÍA
// ======================================================

botonObtener.addEventListener(
    "click",
    function() {

        const numeroGuia =
            guiaInput.value.trim();


        if (
            numeroGuia === ""
        ) {

            mostrarMensaje(
                "⚠️ Escriba el número de guía.",
                "advertencia"
            );

            return;

        }


        const resultado =
            guias.find(
                function(item) {

                    return item.guia
                        .toLowerCase() ===
                        numeroGuia.toLowerCase();

                }
            );


        if (!resultado) {

            mostrarMensaje(
                "❌ No se encontró la guía.",
                "error"
            );

            return;

        }


        guiaInput.value =
            resultado.guia;

        fechaInput.value =
            resultado.fecha;

        placaInput.value =
            resultado.placa || "";

        lugarInput.value =
            resultado.lugar;

        montoInput.value =
            resultado.monto;

        hojasInput.value =
            resultado.hojas || "";

        estadoInput.value =
            resultado.estado;


        buscarGuiaInput.value =
            resultado.guia;


        mostrarGuias();


        mostrarMensaje(
            "🔍 Guía encontrada. Todos los datos fueron cargados.",
            "exito"
        );

    }
);


// ======================================================
// 11. MODIFICAR GUÍA
// ======================================================

botonModificar.addEventListener(
    "click",
    function() {

        const numeroGuia =
            guiaInput.value.trim();


        if (
            numeroGuia === ""
        ) {

            mostrarMensaje(
                "⚠️ Escriba el número de guía.",
                "advertencia"
            );

            return;

        }


        const indice =
            guias.findIndex(
                function(item) {

                    return item.guia
                        .toLowerCase() ===
                        numeroGuia.toLowerCase();

                }
            );


        if (
            indice === -1
        ) {

            mostrarMensaje(
                "❌ No existe esa guía.",
                "error"
            );

            return;

        }


        // ==================================================
        // VALIDAR CAMPOS
        // ==================================================

        if (
            fechaInput.value === "" ||
            placaInput.value.trim() === "" ||
            lugarInput.value.trim() === "" ||
            montoInput.value === "" ||
            hojasInput.value === "" ||
            estadoInput.value === ""
        ) {

            mostrarMensaje(
                "⚠️ Complete todos los campos correctamente.",
                "error"
            );

            return;

        }


        if (
            Number(montoInput.value) <= 0
        ) {

            mostrarMensaje(
                "⚠️ El monto debe ser mayor que cero.",
                "error"
            );

            return;

        }


        if (
            Number(hojasInput.value) < 1 ||
            Number(hojasInput.value) > 10
        ) {

            mostrarMensaje(
                "⚠️ La cantidad de hojas debe estar entre 1 y 10.",
                "error"
            );

            return;

        }


        // ==================================================
        // ACTUALIZAR
        // ==================================================

        guias[indice].fecha =
            fechaInput.value;

        guias[indice].placa =
            placaInput.value
                .trim()
                .toUpperCase();

        guias[indice].lugar =
            lugarInput.value.trim();

        guias[indice].monto =
            Number(
                montoInput.value
            );

        guias[indice].hojas =
            Number(
                hojasInput.value
            );

        guias[indice].estado =
            estadoInput.value;


        guardarDatos();

        actualizarFiltroPlacas();

        mostrarGuias();


        mostrarMensaje(
            "✏️ Guía modificada correctamente.",
            "exito"
        );

    }
);


// ======================================================
// 12. ELIMINAR GUÍA
// ======================================================

botonEliminar.addEventListener(
    "click",
    function() {

        const numeroGuia =
            guiaInput.value.trim();


        if (
            numeroGuia === ""
        ) {

            mostrarMensaje(
                "⚠️ Escriba el número de guía.",
                "advertencia"
            );

            return;

        }


        const indice =
            guias.findIndex(
                function(item) {

                    return item.guia
                        .toLowerCase() ===
                        numeroGuia.toLowerCase();

                }
            );


        if (
            indice === -1
        ) {

            mostrarMensaje(
                "❌ No existe esa guía.",
                "error"
            );

            return;

        }


        const confirmar =
            confirm(
                "¿Está seguro de eliminar la guía " +
                numeroGuia +
                "?"
            );


        if (!confirmar) {

            return;

        }


        guias.splice(
            indice,
            1
        );


        guardarDatos();

        actualizarFiltroPlacas();

        mostrarGuias();

        limpiarFormulario();

        buscarGuiaInput.value = "";


        mostrarMensaje(
            "🗑️ Guía eliminada correctamente.",
            "exito"
        );

    }
);


// ======================================================
// 13. SELECCIONAR GUÍA DESDE TABLA
// ======================================================

function seleccionarGuia(indice) {

    const item =
        guias[indice];


    if (!item) {

        return;

    }


    guiaInput.value =
        item.guia;

    fechaInput.value =
        item.fecha;

    placaInput.value =
        item.placa || "";

    lugarInput.value =
        item.lugar;

    montoInput.value =
        item.monto;

    hojasInput.value =
        item.hojas || "";

    estadoInput.value =
        item.estado;


    mostrarMensaje(
        "✏️ Guía seleccionada. Modifique los datos y presione Modificar.",
        "advertencia"
    );


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// ======================================================
// 14. ELIMINAR DESDE TABLA
// ======================================================

function eliminarDesdeTabla(indice) {

    const item =
        guias[indice];


    if (!item) {

        return;

    }


    const confirmar =
        confirm(
            "¿Desea eliminar la guía " +
            item.guia +
            "?"
        );


    if (!confirmar) {

        return;

    }


    guias.splice(
        indice,
        1
    );


    guardarDatos();

    actualizarFiltroPlacas();

    mostrarGuias();

    limpiarFormulario();

    buscarGuiaInput.value = "";


    mostrarMensaje(
        "🗑️ Guía " +
        item.guia +
        " eliminada correctamente.",
        "exito"
    );

}


// ======================================================
// 15. BOTÓN LIMPIAR
// ======================================================

botonLimpiar.addEventListener(
    "click",
    function() {

        limpiarFormulario();

        mostrarMensaje(
            "🔄 Formulario limpiado."
        );

    }
);


// ======================================================
// 16. BÚSQUEDA AUTOMÁTICA
// ======================================================

buscarGuiaInput.addEventListener(
    "input",
    function() {

        mostrarGuias();

    }
);


// ======================================================
// 17. FILTRO POR PLACA
// ======================================================

filtrarPlacaInput.addEventListener(
    "change",
    function() {

        mostrarGuias();

    }
);


// ======================================================
// 18. FILTRO POR ESTADO
// ======================================================

filtrarEstadoInput.addEventListener(
    "change",
    function() {

        mostrarGuias();

    }
);


// ======================================================
// 19. ORDENAR
// ======================================================

ordenarInput.addEventListener(
    "change",
    function() {

        mostrarGuias();

    }
);


// ======================================================
// 20. QUITAR FILTROS
// ======================================================

botonQuitarFiltros.addEventListener(
    "click",
    function() {

        buscarGuiaInput.value = "";

        filtrarPlacaInput.value =
            "todos";

        filtrarEstadoInput.value =
            "todos";

        ordenarInput.value =
            "guiaAsc";


        mostrarGuias();


        mostrarMensaje(
            "🔄 Se quitaron los filtros.",
            "normal"
        );

    }
);


// ======================================================
// 21. CARGAR DATOS AL ABRIR
// ======================================================

actualizarFiltroPlacas();

mostrarGuias();


mostrarMensaje(
    "📂 Sistema listo. Las guías guardadas se cargaron correctamente."
);