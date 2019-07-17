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
  editableEmployee: Employee;
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
    this.editableEmployee = undefined;
  }

  toggleShowForm() {
    if (!this.showForm) {
      // close list as we are adding a new employee
      this.activeId = '';
    }
    this.showForm = !this.showForm;
    this.editableEmployee = undefined;
    this.alertService.close();
  }

  showEditForm(id: string) {
    this.employeesService
      .get(id)
      .pipe(first())
      .subscribe((employee: Employee) => {
        this.showForm = true;
        this.editableEmployee = employee;
      });
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
    this.alertService.success(
      this.editableEmployee ? 'Successful update' : 'Employee created'
    );
    this.showForm = false;
    this.editableEmployee = undefined;
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
