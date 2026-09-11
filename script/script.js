// ======================================================
// CONTROL DE GUÍAS DE TRANSPORTE Y LOGÍSTICA
// ======================================================


// ======================================================
// 0. CONFIGURACIÓN DEL LOGIN
// ======================================================

const USUARIO_CORRECTO = "David2026";
const CLAVE_CORRECTA = "Dc1234";


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
            function () {

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
    function (event) {

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
    function () {

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
    function () {

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

const numeroRutaInput =
    document.getElementById("numeroRuta");

const fechaInput =
    document.getElementById("fecha");

const placaInput =
    document.getElementById("placa");

const lugarInput =
    document.getElementById("lugar");

const montoInput =
    document.getElementById("monto");

const montoDeducibleInput =
    document.getElementById("montoDeducible");

const totalPagarInput =
    document.getElementById("totalPagar");

const hojasInput =
    document.getElementById("hojas");

const estadoInput =
    document.getElementById("estado");


// ======================================================
// 3. ELEMENTOS DE LA TABLA
// ======================================================

const tablaGuias =
    document.getElementById("tablaGuias");

const contador =
    document.getElementById("contador");

const salida =
    document.getElementById("salida");


// ======================================================
// 4. BOTONES
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
// 5. BÚSQUEDA
// ======================================================

const buscarGuiaInput =
    document.getElementById("buscarGuia");


// ======================================================
// 6. FILTROS
// ======================================================

const filtrarRutaInput =
    document.getElementById("filtrarRuta");

const filtrarPlacaInput =
    document.getElementById("filtrarPlaca");

const filtrarEstadoInput =
    document.getElementById("filtrarEstado");

const ordenarInput =
    document.getElementById("ordenar");

const botonQuitarFiltros =
    document.getElementById("quitarFiltros");


// ======================================================
// 7. CALCULAR TOTAL A PAGAR
// ======================================================
//
// TOTAL A PAGAR = MONTO - MONTO DEDUCIBLE
//
// El monto deducible no puede ser negativo.
// El total nunca será menor que 0.
// ======================================================

function calcularTotal() {

    const monto =
        Number(montoInput.value) || 0;

    let deducible =
        Number(montoDeducibleInput.value) || 0;


    if (deducible < 0) {

        deducible = 0;

        montoDeducibleInput.value = 0;

    }


    let total =
        monto - deducible;


    if (total < 0) {

        total = 0;

    }


    totalPagarInput.value =
        total.toFixed(2);

}


// ======================================================
// ACTUALIZAR TOTAL CUANDO CAMBIA EL MONTO
// ======================================================

montoInput.addEventListener(
    "input",
    calcularTotal
);


// ======================================================
// ACTUALIZAR TOTAL CUANDO CAMBIA EL DEDUCIBLE
// ======================================================

montoDeducibleInput.addEventListener(
    "input",
    calcularTotal
);


// ======================================================
// 8. GUARDAR DATOS
// ======================================================

function guardarDatos() {

    localStorage.setItem(
        "guias",
        JSON.stringify(guias)
    );

}


// ======================================================
// 9. MOSTRAR MENSAJE
// ======================================================

function mostrarMensaje(
    mensaje,
    tipo = "normal"
) {

    salida.textContent = mensaje;


    if (tipo === "exito") {

        salida.style.background =
            "#dcfce7";

        salida.style.color =
            "#166534";

    }

    else if (tipo === "error") {

        salida.style.background =
            "#fee2e2";

        salida.style.color =
            "#991b1b";

    }

    else if (tipo === "advertencia") {

        salida.style.background =
            "#fef3c7";

        salida.style.color =
            "#92400e";

    }

    else {

        salida.style.background =
            "#f1f5f9";

        salida.style.color =
            "#334155";

    }

}


// ======================================================
// 10. CLASE PARA ESTADO
// ======================================================

function obtenerClaseEstado(estado) {

    switch (estado) {

        case "Aprobadas":

            return "estado-aprobadas";


        case "En tránsito":

            return "estado-transito";


        case "Disputa":

            return "estado-disputa";


        case "Cancelado":

            return "estado-cancelado";


        case "Recepcionada":

            return "estado-recepcionada";


        case "Rechazada":

            return "estado-rechazada";


        default:

            return "";

    }

}


// ======================================================
// 11. ACTUALIZAR FILTRO DE RUTAS
// ======================================================

function actualizarFiltroRutas() {

    const rutaSeleccionada =
        filtrarRutaInput.value;


    const rutas = [
        ...new Set(
            guias
                .map(function (item) {

                    return item.numeroRuta;

                })
                .filter(function (ruta) {

                    return ruta !== undefined &&
                           ruta !== null &&
                           ruta !== "";

                })
        )
    ];


    rutas.sort(
        function (a, b) {

            return Number(a) - Number(b);

        }
    );


    filtrarRutaInput.innerHTML = `
        <option value="todos">
            Todas las rutas
        </option>
    `;


    rutas.forEach(
        function (ruta) {

            const opcion =
                document.createElement("option");

            opcion.value = ruta;

            opcion.textContent =
                "Ruta " + ruta;

            filtrarRutaInput.appendChild(
                opcion
            );

        }
    );


    if (
        rutas.map(String).includes(
            String(rutaSeleccionada)
        )
    ) {

        filtrarRutaInput.value =
            rutaSeleccionada;

    }

    else {

        filtrarRutaInput.value =
            "todos";

    }

}


// ======================================================
// 12. ACTUALIZAR FILTRO DE PLACAS
// ======================================================

function actualizarFiltroPlacas() {

    const placaSeleccionada =
        filtrarPlacaInput.value;


    const placas = [
        ...new Set(
            guias
                .map(function (item) {

                    return item.placa;

                })
                .filter(function (placa) {

                    return placa &&
                           placa.trim() !== "";

                })
        )
    ];


    placas.sort(
        function (a, b) {

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
        function (placa) {

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
// 13. MOSTRAR GUÍAS
// ======================================================

function mostrarGuias() {

    const textoBusqueda =
        buscarGuiaInput.value
            .trim()
            .toLowerCase();


    const rutaFiltro =
        filtrarRutaInput.value;


    const placaFiltro =
        filtrarPlacaInput.value;


    const estadoFiltro =
        filtrarEstadoInput.value;


    const orden =
        ordenarInput.value;


    let guiasMostrar =
        [...guias];


// ======================================================
// BUSCAR POR GUÍA
// ======================================================

    if (
        textoBusqueda !== ""
    ) {

        guiasMostrar =
            guiasMostrar.filter(
                function (item) {

                    return (
                        item.guia || ""
                    )
                        .toLowerCase()
                        .includes(
                            textoBusqueda
                        );

                }
            );

    }


// ======================================================
// FILTRAR POR RUTA
// ======================================================

    if (
        rutaFiltro !== "todos"
    ) {

        guiasMostrar =
            guiasMostrar.filter(
                function (item) {

                    return String(
                        item.numeroRuta || ""
                    ) === String(
                        rutaFiltro
                    );

                }
            );

    }


// ======================================================
// FILTRAR POR PLACA
// ======================================================

    if (
        placaFiltro !== "todos"
    ) {

        guiasMostrar =
            guiasMostrar.filter(
                function (item) {

                    return (
                        item.placa || ""
                    )
                        .toLowerCase() ===
                        placaFiltro.toLowerCase();

                }
            );

    }


// ======================================================
// FILTRAR POR ESTADO
// ======================================================

    if (
        estadoFiltro !== "todos"
    ) {

        guiasMostrar =
            guiasMostrar.filter(
                function (item) {

                    return (
                        item.estado ===
                        estadoFiltro
                    );

                }
            );

    }


// ======================================================
// ORDENAR
// ======================================================

    guiasMostrar.sort(
        function (a, b) {


// ------------------------------------------------------
// GUÍA
// ------------------------------------------------------

            if (
                orden === "guiaAsc"
            ) {

                return (
                    a.guia || ""
                ).localeCompare(
                    b.guia || "",
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

                return (
                    b.guia || ""
                ).localeCompare(
                    a.guia || "",
                    undefined,
                    {
                        numeric: true,
                        sensitivity: "base"
                    }
                );

            }


// ------------------------------------------------------
// RUTA
// ------------------------------------------------------

            if (
                orden === "rutaAsc"
            ) {

                return (
                    Number(a.numeroRuta) || 0
                ) -
                (
                    Number(b.numeroRuta) || 0
                );

            }


            if (
                orden === "rutaDesc"
            ) {

                return (
                    Number(b.numeroRuta) || 0
                ) -
                (
                    Number(a.numeroRuta) || 0
                );

            }


// ------------------------------------------------------
// FECHA
// ------------------------------------------------------

            if (
                orden === "fechaAsc"
            ) {

                return new Date(
                    a.fecha
                ) -
                new Date(
                    b.fecha
                );

            }


            if (
                orden === "fechaDesc"
            ) {

                return new Date(
                    b.fecha
                ) -
                new Date(
                    a.fecha
                );

            }


// ------------------------------------------------------
// PLACA
// ------------------------------------------------------

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


// ------------------------------------------------------
// MONTO
// ------------------------------------------------------

            if (
                orden === "montoAsc"
            ) {

                return (
                    Number(a.monto) || 0
                ) -
                (
                    Number(b.monto) || 0
                );

            }


            if (
                orden === "montoDesc"
            ) {

                return (
                    Number(b.monto) || 0
                ) -
                (
                    Number(a.monto) || 0
                );

            }


// ------------------------------------------------------
// DEDUCIBLE
// ------------------------------------------------------

            if (
                orden === "deducibleAsc"
            ) {

                return (
                    Number(a.montoDeducible) || 0
                ) -
                (
                    Number(b.montoDeducible) || 0
                );

            }


            if (
                orden === "deducibleDesc"
            ) {

                return (
                    Number(b.montoDeducible) || 0
                ) -
                (
                    Number(a.montoDeducible) || 0
                );

            }


// ------------------------------------------------------
// TOTAL
// ------------------------------------------------------

            if (
                orden === "totalAsc"
            ) {

                return (
                    Number(a.totalPagar) || 0
                ) -
                (
                    Number(b.totalPagar) || 0
                );

            }


            if (
                orden === "totalDesc"
            ) {

                return (
                    Number(b.totalPagar) || 0
                ) -
                (
                    Number(a.totalPagar) || 0
                );

            }


// ------------------------------------------------------
// HOJAS
// ------------------------------------------------------

            if (
                orden === "hojasAsc"
            ) {

                return (
                    Number(a.hojas) || 0
                ) -
                (
                    Number(b.hojas) || 0
                );

            }


            if (
                orden === "hojasDesc"
            ) {

                return (
                    Number(b.hojas) || 0
                ) -
                (
                    Number(a.hojas) || 0
                );

            }


            return 0;

        }
    );


// ======================================================
// LIMPIAR TABLA
// ======================================================

    tablaGuias.innerHTML = "";


// ======================================================
// NO HAY RESULTADOS
// ======================================================

    if (
        guiasMostrar.length === 0
    ) {

        tablaGuias.innerHTML = `

            <tr>

                <td colspan="11">

                    🔎 No se encontraron guías.

                </td>

            </tr>

        `;

    }


// ======================================================
// MOSTRAR GUÍAS
// ======================================================

    guiasMostrar.forEach(
        function (item) {

            const fila =
                document.createElement("tr");


            fila.innerHTML = `

                <td>

                    <strong>
                        ${item.guia || "-"}
                    </strong>

                </td>


                <td>

                    ${item.numeroRuta || "-"}

                </td>


                <td>

                    ${item.fecha || "-"}

                </td>


                <td>

                    <strong>
                        ${item.placa || "-"}
                    </strong>

                </td>


                <td>

                    ${item.lugar || "-"}

                </td>


                <td>

                    ₡${Number(
                        item.monto || 0
                    ).toLocaleString(
                        "es-CR",
                        {
                            minimumFractionDigits: 2
                        }
                    )}

                </td>


                <td>

                    ₡${Number(
                        item.montoDeducible || 0
                    ).toLocaleString(
                        "es-CR",
                        {
                            minimumFractionDigits: 2
                        }
                    )}

                </td>


                <td>

                    <strong>

                        ₡${Number(
                            item.totalPagar || 0
                        ).toLocaleString(
                            "es-CR",
                            {
                                minimumFractionDigits: 2
                            }
                        )}

                    </strong>

                </td>


                <td>

                    ${item.hojas || 0}

                </td>


                <td>

                    <span
                        class="estado ${obtenerClaseEstado(item.estado)}"
                    >

                        ${item.estado || "-"}

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
                    function (g) {

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
                function () {

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
                function () {

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


// ======================================================
// CONTADOR
// ======================================================

    contador.textContent =
        guiasMostrar.length +
        (
            guiasMostrar.length === 1
                ? " guía"
                : " guías"
        );

}


// ======================================================
// 14. LIMPIAR FORMULARIO
// ======================================================

function limpiarFormulario() {

    guiaInput.value = "";

    numeroRutaInput.value = "";

    fechaInput.value = "";

    placaInput.value = "";

    lugarInput.value = "";

    montoInput.value = "";

    montoDeducibleInput.value = "0";

    totalPagarInput.value = "";

    hojasInput.value = "";

    estadoInput.value = "";

    guiaInput.focus();

}


// ======================================================
// 15. AGREGAR GUÍA
// ======================================================

botonAgregar.addEventListener(
    "click",
    function () {

        const guia =
            guiaInput.value.trim();


        const numeroRuta =
            numeroRutaInput.value;


        const fecha =
            fechaInput.value;


        const placa =
            placaInput.value
                .trim()
                .toUpperCase();


        const lugar =
            lugarInput.value.trim();


        const monto =
            Number(montoInput.value);


        const montoDeducible =
            Number(
                montoDeducibleInput.value
            ) || 0;


        const hojas =
            Number(hojasInput.value);


        const estado =
            estadoInput.value;


// ==================================================
// VALIDAR CAMPOS
// ==================================================

        if (
            guia === "" ||
            numeroRuta === "" ||
            fecha === "" ||
            placa === "" ||
            lugar === "" ||
            montoInput.value === "" ||
            hojasInput.value === "" ||
            estado === ""
        ) {

            mostrarMensaje(
                "⚠️ Complete todos los campos.",
                "error"
            );

            return;

        }


// ==================================================
// VALIDAR RUTA
// ==================================================

        if (
            Number(numeroRuta) < 0
        ) {

            mostrarMensaje(
                "⚠️ El número de ruta no puede ser negativo.",
                "error"
            );

            return;

        }


// ==================================================
// VALIDAR MONTO
// ==================================================

        if (
            monto <= 0
        ) {

            mostrarMensaje(
                "⚠️ El monto debe ser mayor que cero.",
                "error"
            );

            return;

        }


// ==================================================
// VALIDAR DEDUCIBLE
// ==================================================

        if (
            montoDeducible < 0
        ) {

            mostrarMensaje(
                "⚠️ El monto deducible no puede ser negativo.",
                "error"
            );

            return;

        }


// ==================================================
// VALIDAR DEDUCIBLE NO MAYOR AL MONTO
// ==================================================

        if (
            montoDeducible > monto
        ) {

            mostrarMensaje(
                "⚠️ El monto deducible no puede ser mayor que el monto de la factura.",
                "error"
            );

            return;

        }


// ==================================================
// VALIDAR HOJAS
// ==================================================

        if (
            hojas < 1 ||
            hojas > 10
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
                function (item) {

                    return (
                        item.guia || ""
                    )
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
// CALCULAR TOTAL
// ==================================================

        const totalPagar =
            monto -
            montoDeducible;


// ==================================================
// CREAR GUÍA
// ==================================================

        const nuevaGuia = {

            guia:
                guia,

            numeroRuta:
                Number(numeroRuta),

            fecha:
                fecha,

            placa:
                placa,

            lugar:
                lugar,

            monto:
                monto,

            montoDeducible:
                montoDeducible,

            totalPagar:
                totalPagar,

            hojas:
                hojas,

            estado:
                estado

        };


// ==================================================
// AGREGAR
// ==================================================

        guias.push(
            nuevaGuia
        );


        guardarDatos();

        actualizarFiltroRutas();

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
// 16. OBTENER GUÍA
// ======================================================

botonObtener.addEventListener(
    "click",
    function () {

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
                function (item) {

                    return (
                        item.guia || ""
                    )
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


        numeroRutaInput.value =
            resultado.numeroRuta || "";


        fechaInput.value =
            resultado.fecha;


        placaInput.value =
            resultado.placa || "";


        lugarInput.value =
            resultado.lugar;


        montoInput.value =
            resultado.monto;


        montoDeducibleInput.value =
            resultado.montoDeducible || 0;


        totalPagarInput.value =
            (
                resultado.totalPagar ??
                (
                    Number(resultado.monto || 0) -
                    Number(resultado.montoDeducible || 0)
                )
            ).toFixed(2);


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
// 17. MODIFICAR GUÍA
// ======================================================

botonModificar.addEventListener(
    "click",
    function () {

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
                function (item) {

                    return (
                        item.guia || ""
                    )
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
            numeroRutaInput.value === "" ||
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


        const monto =
            Number(montoInput.value);


        const montoDeducible =
            Number(
                montoDeducibleInput.value
            ) || 0;


        const numeroRuta =
            Number(
                numeroRutaInput.value
            );


        const hojas =
            Number(
                hojasInput.value
            );


// ==================================================
// VALIDAR RUTA
// ==================================================

        if (
            numeroRuta < 0
        ) {

            mostrarMensaje(
                "⚠️ El número de ruta no puede ser negativo.",
                "error"
            );

            return;

        }


// ==================================================
// VALIDAR MONTO
// ==================================================

        if (
            monto <= 0
        ) {

            mostrarMensaje(
                "⚠️ El monto debe ser mayor que cero.",
                "error"
            );

            return;

        }


// ==================================================
// VALIDAR DEDUCIBLE
// ==================================================

        if (
            montoDeducible < 0
        ) {

            mostrarMensaje(
                "⚠️ El monto deducible no puede ser negativo.",
                "error"
            );

            return;

        }


// ==================================================
// VALIDAR DEDUCIBLE VS MONTO
// ==================================================

        if (
            montoDeducible > monto
        ) {

            mostrarMensaje(
                "⚠️ El monto deducible no puede ser mayor que el monto de la factura.",
                "error"
            );

            return;

        }


// ==================================================
// VALIDAR HOJAS
// ==================================================

        if (
            hojas < 1 ||
            hojas > 10
        ) {

            mostrarMensaje(
                "⚠️ La cantidad de hojas debe estar entre 1 y 10.",
                "error"
            );

            return;

        }


// ==================================================
// CALCULAR TOTAL
// ==================================================

        const totalPagar =
            monto -
            montoDeducible;


// ==================================================
// ACTUALIZAR GUÍA
// ==================================================

        guias[indice].numeroRuta =
            numeroRuta;


        guias[indice].fecha =
            fechaInput.value;


        guias[indice].placa =
            placaInput.value
                .trim()
                .toUpperCase();


        guias[indice].lugar =
            lugarInput.value.trim();


        guias[indice].monto =
            monto;


        guias[indice].montoDeducible =
            montoDeducible;


        guias[indice].totalPagar =
            totalPagar;


        guias[indice].hojas =
            hojas;


        guias[indice].estado =
            estadoInput.value;


        guardarDatos();

        actualizarFiltroRutas();

        actualizarFiltroPlacas();

        mostrarGuias();


        mostrarMensaje(
            "✏️ Guía modificada correctamente.",
            "exito"
        );

    }
);


// ======================================================
// 18. ELIMINAR GUÍA
// ======================================================

botonEliminar.addEventListener(
    "click",
    function () {

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
                function (item) {

                    return (
                        item.guia || ""
                    )
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

        actualizarFiltroRutas();

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
// 19. SELECCIONAR GUÍA DESDE TABLA
// ======================================================

function seleccionarGuia(indice) {

    const item =
        guias[indice];


    if (!item) {

        return;

    }


    guiaInput.value =
        item.guia;


    numeroRutaInput.value =
        item.numeroRuta || "";


    fechaInput.value =
        item.fecha;


    placaInput.value =
        item.placa || "";


    lugarInput.value =
        item.lugar;


    montoInput.value =
        item.monto;


    montoDeducibleInput.value =
        item.montoDeducible || 0;


    totalPagarInput.value =
        (
            item.totalPagar ??
            (
                Number(item.monto || 0) -
                Number(item.montoDeducible || 0)
            )
        ).toFixed(2);


    hojasInput.value =
        item.hojas || "";


    estadoInput.value =
        item.estado;


    calcularTotal();


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
// 20. ELIMINAR DESDE TABLA
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

    actualizarFiltroRutas();

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
// 21. BOTÓN LIMPIAR
// ======================================================

botonLimpiar.addEventListener(
    "click",
    function () {

        limpiarFormulario();

        mostrarMensaje(
            "🔄 Formulario limpiado."
        );

    }
);


// ======================================================
// 22. BÚSQUEDA AUTOMÁTICA
// ======================================================

buscarGuiaInput.addEventListener(
    "input",
    function () {

        mostrarGuias();

    }
);


// ======================================================
// 23. FILTRO POR RUTA
// ======================================================

filtrarRutaInput.addEventListener(
    "change",
    function () {

        mostrarGuias();

    }
);


// ======================================================
// 24. FILTRO POR PLACA
// ======================================================

filtrarPlacaInput.addEventListener(
    "change",
    function () {

        mostrarGuias();

    }
);


// ======================================================
// 25. FILTRO POR ESTADO
// ======================================================

filtrarEstadoInput.addEventListener(
    "change",
    function () {

        mostrarGuias();

    }
);


// ======================================================
// 26. ORDENAR
// ======================================================

ordenarInput.addEventListener(
    "change",
    function () {

        mostrarGuias();

    }
);


// ======================================================
// 27. QUITAR FILTROS
// ======================================================

botonQuitarFiltros.addEventListener(
    "click",
    function () {

        buscarGuiaInput.value = "";

        filtrarRutaInput.value =
            "todos";

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
// 28. CARGAR DATOS AL ABRIR
// ======================================================

actualizarFiltroRutas();

actualizarFiltroPlacas();

mostrarGuias();


// ======================================================
// 29. MENSAJE INICIAL
// ======================================================

mostrarMensaje(
    "📂 Sistema listo. Las guías guardadas se cargaron correctamente."
);