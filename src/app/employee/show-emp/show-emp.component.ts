import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/_services/shared.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  constructor(private service:SharedService) { }

  EmployeeList:any=[];

  ModalTitle:string;
  //ActivateAddEditEmpComp:boolean=false;
  emp:any;

  ngOnInit(): void {
    this.refreshEmpList();
  }

  addClick(){
    this.emp={
      EmployeeId:0,
      EmployeeName:"",
      Department:"",
      DateOfJoining:"",
      PhotoFileName:"anonymous.png"
    }
    this.ModalTitle="Add Employee";
    //this.ActivateAddEditEmpComp=true;
    this.service.setActivateAddEditEmpComp(true);
  }

  editClick(item){
    console.log(item);
    this.emp=item;
    this.ModalTitle="Edit Employee";
    //this.ActivateAddEditEmpComp=true;
    this.service.setActivateAddEditEmpComp(true);
  }

  deleteClick(item){
    if(confirm('Are you sure??')){
      this.service.deleteEmployee(item.EmployeeId).pipe(first()).subscribe(data=>{
        //alert(data.toString());
        alert("Successfully deleted employee with id="+item.EmployeeId);
        this.refreshEmpList();
      })
    }
  }

  closeClick(){
    //this.ActivateAddEditEmpComp=false;
    this.service.setActivateAddEditEmpComp(false);
    this.refreshEmpList();
  }


  refreshEmpList(){
    //this.service.getEmpList().subscribe(data=>{
      //this.EmployeeList=data;
    //});

    this.service.getEmpList().pipe(first()).subscribe(employees => {
      //this.loading = false;
      this.EmployeeList = employees;
  });
   
  }

  isActivateAddEditEmpComp(){
    return this.service.isActivateAddEditEmpComp();
  }

}

