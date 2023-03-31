import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEmployeeInput, Employee } from '../../employees/employee.model';
import { FormGroupValueOf } from '../types';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { map, Observable } from 'rxjs';

type EmployeeForm = FormGroupValueOf<Omit<Employee, 'id'>>;

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeFormComponent {
  saveButtonDisabled$: Observable<boolean> | null = null;

  employeeForm = new FormGroup<EmployeeForm>({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    hourlyRate: new FormControl(0, {
      validators: [Validators.min(0), Validators.required],
    }),
    isActive: new FormControl(true, Validators.required),
  });

  _employee: Employee | null = null;
  @Input() set employee(employee: Employee | null) {
    console.log('employee', employee);
    if (employee) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...editable } = employee;
      this._employee = employee;
      this.employeeForm.reset(editable, { emitEvent: true });
    }
  }
  @Input() saveButtonText = 'Create';
  @Input() cancelButtonText = 'Cancel';
  @Input() saveButtonDisabled: boolean | null = false;
  @Output() saveClick = new EventEmitter<Employee | CreateEmployeeInput>();
  @Output() cancelClick = new EventEmitter<MouseEvent>();

  constructor() {
    this.saveButtonDisabled$ = this.employeeForm.valueChanges.pipe(
      map(() => {
        return !this.employeeForm.valid || !this.employeeForm.dirty;
      })
    );
  }

  handleSaveButtonClick() {
    if (!this.employeeForm.dirty) {
      return;
    }
    if (this.employeeForm.valid && this._employee) {
      const employee = { ...this._employee, ...this.employeeForm.value } as Employee;
      this.saveClick.emit(employee);
    }

    // if (this.employeeForm.valid && !this._employee) {
    //   const employee = this.employeeForm.value as CreateEmployeeInput;
    //   this.saveClick.emit(employee);
    // }
  }
}
