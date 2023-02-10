import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/alertify.service';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';
import { NgForm } from '@angular/forms';

declare var alertify: any;
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit{
  addEmployeeRequest: Employee = {
    id: '',
    name: '',
    email: '',
    phone: 0,
    salary: 0,
    department: '',
    order: 0
  }
  constructor(private employeeService: EmployeesService, private router: Router, private alertify: AlertifyService) {}

  emailPattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"

  ngOnInit(): void {
    
  }
  addEmployee(){
    this.employeeService.addEmployee(this.addEmployeeRequest).subscribe({
      next: (employee) =>{
        this.router.navigate(['/employees']);
      }
    });
  }
  openAlert(){
    if(this.addEmployeeRequest.name == '' || this.addEmployeeRequest.email == '' || this.addEmployeeRequest.email == '' ||this.addEmployeeRequest.phone == null || this.addEmployeeRequest.salary == null || this.addEmployeeRequest.department == '' || this.addEmployeeRequest.salary == 0 || this.addEmployeeRequest.phone == 0){
      alertify.error('Başarısız! Eksik Bilgi.');
    }
    else{
      alertify.success('Ekleme Başarılı!');
      this.addEmployee();
    }
  }
  openError(){
    alertify.warning('Bilgiler Gereksinimleri Karşılamıyor!');
  } 
}
