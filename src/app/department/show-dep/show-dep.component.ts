import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/_services/shared.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  constructor(private service:SharedService) { }

  DepartmentList:any=[];

  ModalTitle:string;
  //ActivateAddEditDepComp:boolean=false;
  dep:any;

  DepartmentIdFilter:string="";
  DepartmentNameFilter:string="";
  DepartmentListWithoutFilter:any=[];

  ngOnInit(): void {
    this.refreshDepList();
  }

  addDeptClick(){
    this.dep={
      DepartmentId:0,
      DepartmentName:""
    }
    this.ModalTitle="Add Department";
    //this.ActivateAddEditDepComp=true;
    this.service.setActivateAddEditEmpComp(true);
  }

  editDeptClick(item){
    this.dep=item;
    this.ModalTitle="Edit Department";
    //this.ActivateAddEditDepComp=true;
    this.service.setActivateAddEditEmpComp(true);
  }

  deleteDeptClick(item){
    if(confirm('Are you sure??')){
      this.service.deleteDepartment(item.DepartmentId).pipe(first()).subscribe(data=>{
        alert(data.toString());
        this.refreshDepList();
      })
    }
  }

  closeDeptClick(){
    //this.ActivateAddEditDepComp=false;
    this.service.setActivateAddEditEmpComp(false);
    this.refreshDepList();
  }


  refreshDepList(){
    this.service.getDepList().pipe(first()).subscribe(data=>{
      this.DepartmentList=data;
      this.DepartmentListWithoutFilter=data;
    });
  }

  FilterDeptFn(){
    var DepartmentIdFilter = this.DepartmentIdFilter;
    var DepartmentNameFilter = this.DepartmentNameFilter;

    this.DepartmentList = this.DepartmentListWithoutFilter.filter(function (el){
        return el.DepartmentId.toString().toLowerCase().includes(
          DepartmentIdFilter.toString().trim().toLowerCase()
        )&&
        el.DepartmentName.toString().toLowerCase().includes(
          DepartmentNameFilter.toString().trim().toLowerCase()
        )
    });
  }

  sortDeptResult(prop,asc){
    this.DepartmentList = this.DepartmentListWithoutFilter.sort(function(a,b){
      if(asc){
          return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);
      }else{
        return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
      }
    })
  }

  isActivateAddEditEmpComp(){
    return this.service.isActivateAddEditEmpComp();
  }

}
