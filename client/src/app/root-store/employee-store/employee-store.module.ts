import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromEmployee from './employee/employee.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromEmployee.employeesFeatureKey, fromEmployee.reducer)
  ]
})
export class EmployeeStoreModule { }
