var mysql = require('mysql');

var connection;



//VARIABLE PARA CONFIRMAR EL LOGIN
verificar = false;


/*MOSTRAR LA PANTALLA DE LOGIN*/

exports.login= (req, res )=>{

    res.render('index');
  
}

//INGRESAR A LA PAGINA PRINCIPAL LUEGO DE VERIFICAR CREDENCIALES
exports.entrar= (req, res) =>{
    const usuario= req.body.usuario;
    const contrasena=req.body.contrasena;
    if(usuario=='ronny' && contrasena=='ronnyMayer01'){
        verificar=true;
        connection = mysql.createConnection({
            host: 'mysql-28620-0.cloudclusters.net',
            user: 'ronny',
            password: 'ronnyMayer01',
            database:'cobranza',
            port: 28620,  
          });
        res.redirect('/cobranza')

    
    }else if(usuario=='david' && contrasena=='davidMontero02'){
        verificar=true;
        connection = mysql.createConnection({
            host: 'mysql-28620-0.cloudclusters.net',
            user: 'david',
            password: 'davidMontero02',
            port: 28620,
            database: 'cobranza1'  
          });
        res.redirect('/cobranza')
    }else if(usuario=='francisco' && contrasena=='Francisco0205'){
        verificar=true;
        connection = mysql.createConnection({
            host: 'mysql-28620-0.cloudclusters.net',
            user: 'francisco',
            password: 'Francisco0205',
            port: 28620,
            database: 'cobranza2'  
          });
        res.redirect('/cobranza')

    }else if(usuario=='hernan' && contrasena=='Hernan0306'){
        verificar=true;
        connection = mysql.createConnection({
            host: 'mysql-28620-0.cloudclusters.net',
            user: 'hernan',
            password: 'Hernan0306',
            port: 28620,
            database: 'cobranza3'  
          });
        res.redirect('/cobranza')

    }
    
    else{
        res.send('Credenciales incorrectas')
    }

}



//LISTAR TODOS LOS CLIENTES EN LA BASE DE DATOS
exports.listarDatos = (req, res) =>{
    connection.connect((err, conn)=>{
        connection.query('SELECT * FROM clientes', (err, clientes)=>{
            if (err){
                res.json(err);
            }

            connection.query('SELECT * FROM caja', (err, caja)=>{
                if(err){
                    res.json(err)
                }
                if(verificar==true){
                    res.render('principal',{ title:'CLIENTES', clientes: clientes, data:caja})
                }else{
                    res.send("Te atrapé")
                } 

            })
             
        });
    });
};



//MUESTRA EL REPORTE DE TODOS LOS PRESTAMOS REALIZADOS
exports.reporte = ( req, res) =>{
    connection.connect((err, conn)=>{
        connection.query('SELECT * FROM clientes',( err, clientes)=>{
            if(err){
                res.json(err)
            }
            res.render('reporte',{data: clientes});
        })
    })
}





//DATE_SUB(current_timestamp(), INTERVAL 5 HOUR)

//CREAR UN NUEVO CLIENTE
exports.save = (req, res) =>{
    const data= req.body;
    connection.connect((err, conn)=>{
        connection.query('INSERT INTO clientes (nombre,apellido,fecha,valorPrestado, totalPagar,plazo,interes, valorPagado, valorPorCobrar) values (\''+data.nombre+'\',\''+data.apellido+'\',DATE_SUB(current_timestamp(), INTERVAL 5 HOUR),'+
        data.valorPrestado+','+((Number(data.valorPrestado*0.20))+Number(data.valorPrestado))+',\''+data.plazo+'\','+Number(data.valorPrestado*0.20)+','+0+','+((Number(data.valorPrestado*0.20))+Number(data.valorPrestado))+');',(err, cliente)=>{
            res.redirect('/cobranza');
        })
    })

};


//MOSTRAR LOS DATOS PARA EDITAR
exports.update = (req, res) =>{
    const {id}= req.params;
    connection.connect((err, conn)=>{
        connection.query('SELECT * FROM clientes WHERE id = ?', [id], (err, clientes)=>{
            if(verificar){
                res.render('edicion',{clientes: clientes[0]})
            }else{
                res.send('No tiene permisos para estar aqui')
            }
           
        })
    })
}


//METODO QUE ACTUALIZA LOS DATOS
exports.editar = (req, res )=>{
    const {id}= req.params;
    const newCliente = req.body;
    connection.connect((err, conn)=>{
        connection.query( 'UPDATE clientes set ? WHERE id = ? ',[ newCliente, id],(err, rows)=>{
            res.redirect('/cobranza');
        })
    })
}



//ELIMINA UN CLIENTE
exports.delete = (req, res) =>{
    const {id}= req.params;
    connection.connect((err, conn)=>{
        connection.query('DELETE FROM clientes WHERE id= ?', [id], (err, rows)=>{
            res.redirect('/cobranza')
        })
    })
}


//MUESTRA EL CLIENTE AL QUE SE LE HARÁ UN ABONO
exports.abono = (req, res) =>{
    const {id}= req.params;
    connection.connect((err, conn)=>{
        connection.query('SELECT * FROM clientes WHERE id = ?', [id], (err, clientes)=>{
            if(verificar){
                res.render('abonos',{clientes: clientes[0]})

            }else{
                res.send('No tiene permisos para estar aqui')

            }
            
        })
    })
}


//AGREGA EL ABONO AL CLIENTE Y A LA BASE DE DATOS
exports.addAbono = (req, res) =>{
    const {id}= req.params;
    connection.connect((err, conn)=>{
        connection.query('INSERT INTO abonos (fecha,valorAbono,id_cliente) values(DATE_SUB(current_timestamp(), INTERVAL 5 HOUR),'+Number(req.body.valor)+','+Number(id)+');', (err, cliente)=>{
            res.redirect('/cobranza');
        }  )
    })
}


//MUESTRA EL HISTORIAL DE ABONOS POR CLIENTES
exports.listarAbonos = (req, res) =>{
    const {id}= req.params;
    connection.connect((err, conn)=>{
        connection.query('select nombre, apellido, abonos.fecha, valorAbono from clientes join abonos on clientes.id = abonos.id_cliente where clientes.id=?;',[id],(err, data)=>{
            if(verificar){
                res.render('listaAbonos', {clientes: data});
            }else{
                res.send('No tiene permisos para estar aqui')

            }
            
        })
    })
}


//AGREGAR UN NUEVO GASTO
exports.saveGasto = (req, res) =>{
    const data= req.body;
    connection.connect((err, conn)=>{
        connection.query('INSERT INTO gastos (fecha,valor,detalle) values (DATE_SUB(current_timestamp(), INTERVAL 5 HOUR),'+data.valor+',+\''+data.detalle+'\');',(err, cliente)=>{
            res.redirect('/cobranza');
        })
    })

};



//MOSTRAR EL HISTORIAL DE GASTOS REALIZADOS
exports.listarGastos = (req, res ) =>{
    connection.connect((err, conn)=>{
        connection.query('SELECT * FROM gastos',(err, data)=>{
            if(verificar){
                res.render('listaGastos',{data:data});
            }else{
                res.send('No tiene permisos para estar aqui')
            }
            
        })
    })
    
}


//MUESTRA EL FORMULARIO PARA EDITAR LA CAJA
exports.formCaja = (req, res) =>{
    if(verificar){
        res.render('caja');
    }else{
        res.send('No tiene permisos para estar aqui')
    }
    
}



//ACTUALIZAR EL VALOR DE LA CAJA
/*
exports.editarCaja = (req, res )=>{
    const nuevo = Number(req.body.nuevoValor);
    console.log(nuevo);
    connection.connect((err, conn)=>{
        connection.query('UPDATE caja SET valor = ? WHERE id = 1 ;',[nuevo],(err, rows)=>{
            res.redirect('/cobranza');
        })
    })
}*/


exports.cerrar = (req,res)=>{
    verificar=false;
    res.redirect('/');
}