import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  debounceTime,
  filter,
  map,
  Observable,
  of,
  startWith,
  Subject,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { CreateEmployeeInput } from '../employee.model';
import { EmployeeService } from '../employee.service';

type FormGroupValueOf<T> = {
  [P in keyof T]: AbstractControl<T[P] | null>;
};

type EmployeeForm = FormGroupValueOf<CreateEmployeeInput>;

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePageComponent implements OnInit {
  submitButtonClickHandler$ = new Subject<MouseEvent>();

  buttonDisabled$: Observable<boolean> | null = null;

  loading$ = new BehaviorSubject(false);
  employeeForm = new FormGroup<EmployeeForm>({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    hourlyRate: new FormControl(0, {
      validators: [Validators.min(0), Validators.required],
    }),
    isActive: new FormControl(true, Validators.required),
  });

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    const validFormValues$ = this.employeeForm.valueChanges.pipe(
      filter(() => this.employeeForm.valid)
    );

    this.buttonDisabled$ = combineLatest([validFormValues$, this.loading$]).pipe(
      map(([formValues, loading]) => {
        return (
          !Object.values(formValues).every(
            value => value !== null && value !== undefined && value !== ''
          ) || loading
        );
      }),
      startWith(true)
    );

    const employeeOrError$ = this.submitButtonClickHandler$.pipe(
      debounceTime(100),
      withLatestFrom(validFormValues$),
      map(([_, formValues]) => {
        const employee: CreateEmployeeInput = {
          firstName: formValues.firstName ?? '',
          lastName: formValues.lastName ?? '',
          hourlyRate: formValues.hourlyRate ?? 0,
          isActive: formValues.isActive ?? false,
        };
        return employee;
      }),
      tap(() => {
        this.loading$.next(true);
      }),
      switchMap(employee => {
        return this.employeeService.createEmployee(employee);
      }),
      catchError(error => of(new Error(error))),
      tap(() => {
        this.loading$.next(false);
      })
    );
    employeeOrError$.subscribe(console.log);
  }
}
