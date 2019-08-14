import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromEmployee from './employee/employee.reducer';
import { EffectsModule } from '@ngrx/effects';
import { EmployeeEffects } from './employee/employee.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromEmployee.employeesFeatureKey, fromEmployee.reducer),
    EffectsModule.forFeature([EmployeeEffects])
  ]
})
export class EmployeeStoreModule { }
