const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyparser.json());


// conexão ao banco de dados (Mysql)

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'wevodb',
    port: 3306
});

// validador de conexão banco de dados

db.connect(err=>{
    if(err){console.log(err, 'erro ao conectar');}
    console.log('banco de dados conectado');
})


//get dados (ler/read)

app.get('/user', (req,res)=>{

    let qr = 'select * from user';

    db.query(qr,(err,result)=>{

        if(err){
            console.log(err,'errs');
        }

        if(result.length>0)
        {
            res.send({
                message:'todos dados de usuarios',
                data:result
            });
        }
    });

    //console.log('get users');

});

// get dado unitario (obter)

app.get('/user/:id',(req,res)=>{

    let gID = req.params.id;

    let qr = `select * from user where id = ${gID}`;

    db.query(qr,(err,result)=>{

        if(err) {console.log(err);}

        if(result.length>0)
        {
            res.send({
                message:'get single data',
                data:result
            });
        }
        else{
            res.send({
                message:'dado não encontrado'
            });
        }
    });
    //console.log(req.params.id,'getid==>')

});

// Criar dado (create)

app.post('/user',(req,res)=>{
    
    console.log(req.body,'createdata');

    let Nome = req.body.Nome;
    let CPF = req.body.CPF;
    let Email = req.body.Email;
    let Telefone = req.body.Telefone;
    let Sexo = req.body.Sexo;
    let DataNascimento = req.body.DataNascimento;

    let qr = `insert into user(Nome,CPF,Email,Telefone,Sexo,DataNAscimento) 
                values('${Nome}','${CPF}','${Email}','${Telefone}','${Sexo}','${DataNascimento}' )`;
 
    db.query(qr,(err,result)=>{

        if(err){console.log(err);}
        console.log(result,'result')
        res.send({
            message:'dados inseridos',            
        })
    });
});

//Atualizar dado unitario (update)

app.put('/user/:id',(req,res)=>{

    console.log(req.body,'updatedata');

    let gID = req.params.id;
    let Nome = req.body.Nome;
    let CPF = req.body.CPF;
    let Email = req.body.Email;
    let Telefone = req.body.Telefone;
    let Sexo = req.body.Sexo;
    let DataNascimento = req.body.DataNascimento;

    let qr = `update user set Nome = '${Nome}', CPF = '${CPF}', Email = '${Email}', Telefone = '${Telefone}', Sexo = '${Sexo}', DataNascimento = '${DataNascimento}' where id = ${gID}`;

    db.query(qr,(err,result)=>{

        if(err) {console.log(err);}

        res.send({
            message:'dados atualizados'
        });
    });
})

// deletar dado unico (delete)

app.delete('/user/:id',(req,res)=>{

    let qID = req.params.id;

    let qr = `delete from user where id = '${qID}' `;
    db.query(qr,(err,result)=>{
        if(err) {console.log(err);}

        res.send(
            {
                message:'dados deletados'
            }
        )
    })

});

app.listen(3000,()=>{
    console.log('servidor conectado');
})