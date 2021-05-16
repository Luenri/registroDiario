var express = require('express');
var router = express.Router();


const cobranzaController = require ("../controllers/cobranza.controller");


//PAGINA LOGIN EN EL INICIO
router.get('/', cobranzaController.login);
router.post('/verificacion', cobranzaController.entrar);

//PAGINA PRINCIPAL
router.get('/cobranza', cobranzaController.listarDatos);

//AGREGA UN CLIENTE
router.post('/cobranza/add',cobranzaController.save);

//MUESTRA DATOS A ACTUALIZAR DE UN CLIENTE
router.get('/cobranza/update/:id', cobranzaController.update);

//ACTUALIZA LOS DATOS DE UN CLIENTE
router.post('/cobranza/update/:id', cobranzaController.editar);


//ELIMINA UN CLIENTE
router.get('/cobranza/delete/:id', cobranzaController.delete);


//MUESTRA EL CLIENTE AL QUE SE LE HARÁ EL ABONO
router.get('/cobranza/abono/:id', cobranzaController.abono);


//AGREGA EL ABONO AL CLIENTE Y A LA BASE DE DATOS
router.post('/cobranza/abono/:id',cobranzaController.addAbono);


//MUESTRA EL HISTORIAL DE ABONOS POR CLIENTES
router.get('/cobranza/abono/historial/:id', cobranzaController.listarAbonos);


//AGREGA UN GASTO
router.post('/cobranza/add/gasto',cobranzaController.saveGasto);


//LISTAR TODOS LOS GASTOS
router.get('/cobranza/historial/gastos',cobranzaController.listarGastos);


//MOSTRAR EL FORMULARIO PARA ACTUALIZAR LA CAJA
router.get('/cobranza/caja/actualizar',cobranzaController.formCaja);

//ACTUALIZAR EL VALOR DE LA CAJA
//router.post('/cobranza/caja/actualizar',cobranzaController.editarCaja);


//CERRAR SESION DE LOS USUARIOS
router.get('/cobranza/cerrar', cobranzaController.cerrar);


//MUESTRA TODOS LOS REPORTES EXISTENTES
router.get('/cobranza/reporte', cobranzaController.reporte);


module.exports = router;
