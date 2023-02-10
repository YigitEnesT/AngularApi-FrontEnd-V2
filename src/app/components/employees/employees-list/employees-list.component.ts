import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/alertify.service';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

declare var alertify:any;
@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
  employees: Employee[] = [];
  constructor(private employeesService: EmployeesService, private alertify: AlertifyService) {}

  ngOnInit(): void {
    this.employeesService.getEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
        alertify.success('Veriler Başarılı Bir Şekilde Getirildi!');

      },
      error: (response) => {
        console.log(response);
        alertify.error('Veriler Getirilemedi!');
      }
    })
    
  }
}
