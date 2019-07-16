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

  activate(employee: Employee) {
    this.activeId = employee._id;
  }

  toggleShowForm() {
    this.showForm = !this.showForm;
  }

  delete(id: string) {
    console.log('delete', id);
  }

  successForm(employee: Employee) {
    this.alertService.success('Registration successful', true);
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
