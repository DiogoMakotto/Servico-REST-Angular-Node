import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiserviceService} from '../apiservice.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private service:ApiserviceService,private router:ActivatedRoute){}

  errormsg:any;
  sucessmsg:any;
  getparamid:any;

  ngOnInit(): void {
    this.getparamid = this.router.snapshot.paramMap.get('id');
    if(this.getparamid)
    {
      this.service.getSingleData(this.getparamid).subscribe((res)=>{
        console.log(res,'ress==>');
        this.userForm.patchValue({
          Nome:res.data[0].Nome,
          CPF:res.data[0].CPF,
          Email:res.data[0].Email,
          Telefone:res.data[0].Telefone,
          Sexo:res.data[0].Sexo,
          DataNascimento:res.data[0].DataNascimento
        });      
      });
    }

  }

  userForm = new FormGroup({
    'Nome':new FormControl('',Validators.required),
    'CPF':new FormControl('',Validators.required),
    'Email':new FormControl('',Validators.required),
    'Telefone':new FormControl('',Validators.required),
    'Sexo':new FormControl('',Validators.required),
    'DataNascimento':new FormControl('',Validators.required)
  });

  //criar novo usuario
  userSubmit()
  {
      if(this.userForm.valid){
        console.log(this.userForm.value)
        this.service.createData(this.userForm.value).subscribe((res)=>{
          console.log(res,'ress==>');
          this.userForm.reset();
          this.sucessmsg = res.message;
        })
      }else{
        this.errormsg = 'Todos campos são obrigatorios !';        
      }
  }

  //atualizar (update)
  userUpdate()
  {
    console.log(this.userForm.value,'formularioAtualizado');
    
    if(this.userForm.valid)
    {
      this.service.updateData(this.userForm.value, this.getparamid).subscribe((res)=>{
        console.log(res,'resupdated');
        this.sucessmsg = res.message;
        
      });
    }else
    {
      this.errormsg = 'Todos campos são requeridos';
    }
  }
}
