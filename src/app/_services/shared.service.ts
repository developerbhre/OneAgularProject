import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '@environments/environment';
import { Employee } from '@app/_models';
import { Department } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
readonly APIUrl= `${environment.apiUrl}/api`;
readonly PhotoUrl = `${environment.apiUrl}/Photos`;
ActivateAddEditEmpComp:boolean=false;

  constructor(private http:HttpClient) { }

  getDepList(){
    return this.http.get<Department[]>(this.APIUrl+'/Department');
  }

  addDepartment(val:any){
    return this.http.post(this.APIUrl+'/Department',val);
  }

  updateDepartment(val:any){
    return this.http.put(this.APIUrl+'/Department',val);
  }

  deleteDepartment(val:any){
    return this.http.delete(this.APIUrl+'/Department/'+val);
  }


  getEmpList(){
    return this.http.get<Employee[]>(this.APIUrl+'/Employee');
  }

  addEmployee(val:any){
    return this.http.post(this.APIUrl+'/Employee',val);
  }

  updateEmployee(val:any){
    return this.http.put(this.APIUrl+'/Employee',val);
  }

  deleteEmployee(val:any){
    return this.http.delete(this.APIUrl+'/Employee/'+val);
  }


  UploadPhoto(val:any){
    return this.http.post(this.APIUrl+'/Employee/SaveFile',val);
  }

  getAllDepartmentNames():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/Employee/GetAllDepartmentNames');
  }

  setActivateAddEditEmpComp(val:boolean){
    this.ActivateAddEditEmpComp = val;
  }

  isActivateAddEditEmpComp(){
    return this.ActivateAddEditEmpComp;
  }
}
