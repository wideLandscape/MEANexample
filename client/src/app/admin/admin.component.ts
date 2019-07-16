import { Component, OnInit } from '@angular/core';
import { Employee } from '../_models/Employee';
import { EmployeesService } from '../_services/employees.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {
  employees: Employee[];
  activeId = -1;
  constructor(private employeesService: EmployeesService) {}

  ngOnInit() {
    this.employeesService
      .getAll()
      .pipe(first())
      .subscribe((data: Employee[]) => {
        this.employees = data;
      });
  }

  isActive(id: number) {
    return this.activeId === id;
  }

  activate(employee: Employee) {
    this.activeId = employee.id;
  }
}