import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService{
  
  path = environment.apiUrl;
  constructor(private _http:HttpClient) {}


  getEmployees(): Observable<Employee[]>{
    return this._http.get<Employee[]>(this.path + 'api/Employee/GetEmployee');
  }

  addEmployee(addEmployeeRequest: Employee): Observable<Employee> {
    addEmployeeRequest.id= '00000000-0000-0000-0000-000000000000';
    return this._http.post<Employee>(this.path + 'api/Employee/PostEmployee',addEmployeeRequest);
  }
  getIdEmployees(id: string): Observable<Employee> {
    return this._http.get<Employee>(this.path+ 'api/Employee/GetIdEmployee?id=' + id);
  }
  editEmployee(id: string, editEmpRequest: Employee): Observable<Employee> {
    return this._http.put<Employee>(this.path+"api/Employee/UpdateEmployee?id="+id,editEmpRequest );
  }
  deleteEmployee(id: string): Observable<Employee>{
    return this._http.delete<Employee>(this.path+ "api/Employee/DeleteEmployee?id="+ id);
  }
}
