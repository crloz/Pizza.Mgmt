import { AbstractControl } from '@angular/forms';
import { CreateEmployeeInput } from '../employees/employee.model';

export type FormGroupValueOf<T> = {
  [P in keyof T]: AbstractControl<T[P] | null>;
};

type EmployeeForm = FormGroupValueOf<CreateEmployeeInput>;
