import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/alertify.service';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';
declare var alertify: any;

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
  providers: [EmployeesService]
})
export class EditEmployeeComponent implements OnInit {

  empDetail: Employee = {
    id: '',
    name: '',
    email: '',
    phone: 0,
    salary: 0,
    department: '',
    order: 0
  }
  constructor(private route: ActivatedRoute, private empService: EmployeesService, private router: Router, private alertify: AlertifyService) {}

  
  ngOnInit() : void{

    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if(id){
          console.log(id);
          this.empService.getIdEmployees(id).subscribe({
            next: (response) =>{
              this.empDetail = response;
            }
          })
        }
      }
    })
  }
  editEmployee(){
    // this.empService.editEmployee(this.empDetail.id, this.empDetail).subscribe({
    //   next: (emp) =>{
    //     this.router.navigate(['/employees']);
    //     console.log(emp);
    //   }
    // });
    alertify.success('Düzenleme İşlemi Başarılı!');
    this.empService.editEmployee(this.empDetail.id, this.empDetail).subscribe({
      next: (emp) =>{
        this.router.navigate(['/employees']);
      }
    })
  }
  // openAlert(){
  //   if(this.empDetail.name == '' || this.empDetail.email == '' || this.empDetail.email == '' ||this.empDetail.phone == null || this.empDetail.salary == null  || this.empDetail.department == '' || this.empDetail.phone == 0 || this.empDetail.salary == 0){
  //     alertify.warning('İşlem Başarısız!');
  //   }
  //   else{
  //     alertify.success('Düzenleme İşlemi Başarılı!');
  //     console.log(this.empDetail.order);
  //     this.editEmployee();
  //     console.log(this.empDetail.order);
  //   } 
  // }
  deleteEmployee(){
      this.empService.deleteEmployee(this.empDetail.id).subscribe({
        next: (response) => {
          this.router.navigate(['/employees']);
        }
      });
  }
  openError(){
    alertify.warning('Bilgiler Gereksinimleri Karşılamıyor!');
  }
}