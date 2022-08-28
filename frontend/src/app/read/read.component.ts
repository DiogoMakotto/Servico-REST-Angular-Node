import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  constructor(private service:ApiserviceService) { }

  readData:any;
  sucessmsg:any;
  
  ngOnInit(): void {
    this.getAllData();
  }

  //obter o id

  deleteId(id:any)
  {
    console.log(id,'deleteid==>');
    this.service.deleteData(id).subscribe((res)=>{
      console.log(res,'deleteress==>');
      this.sucessmsg = res.message;
      this.getAllData();
    });   
    
  }

  // Obter dados (get)
  
  getAllData(){

    this.service.getAllData().subscribe((res)=>{
      console.log(res,"res==>");
      this.readData = res.data;
    });
  }

}
