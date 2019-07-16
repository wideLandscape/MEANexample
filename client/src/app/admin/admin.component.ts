import { Component, OnInit } from '@angular/core';
import { Employee } from '../_models/Employee';
import { EmployeesService } from '../_services/employees.service';
import { first } from 'rxjs/operators';
import { AlertService } from '../_services/alert.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {
  employees: Employee[];
  activeId = '';
  showForm = false;
  constructor(
    private employeesService: EmployeesService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.getEmployees();
  }

  isActive(id: string) {
    return this.activeId === id;
  }

  toggleActivation(employee: Employee) {
    this.activeId = employee._id === this.activeId ? '' : employee._id;
  }

  toggleShowForm() {
    this.showForm = !this.showForm;
  }

  delete(id: string) {
    this.employeesService
      .delete(id)
      .pipe(first())
      .subscribe(data => {
        this.alertService.success('Deleted successfully');
        this.showForm = false;
        this.getEmployees();
      });
  }

  successForm(employee: Employee) {
    this.alertService.success('Registration successful');
    this.showForm = false;
    this.getEmployees();
  }
  errorForm(error: any) {
    this.alertService.error(error);
  }
  private getEmployees() {
    this.employeesService
      .getAll()
      .pipe(first())
      .subscribe((data: Employee[]) => {
        this.employees = data;
      });
  }
}
