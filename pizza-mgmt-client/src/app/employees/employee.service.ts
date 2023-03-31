import { Injectable } from '@angular/core';
import type { CreateEmployeeInput, Employee } from './employee.model';
import { BehaviorSubject, filter, map, Observable, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

type AllEmployees = Record<string, Employee>;
type EmployeeTuple = [string, Employee | null];

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  selectedEmployeeId$ = new BehaviorSubject<string | null>(null);
  allEmployees$ = new BehaviorSubject<AllEmployees>({});

  selectedEmployee$: Observable<Employee>;

  constructor(private http: HttpClient) {
    this.selectedEmployee$ = this.selectedEmployeeId$.pipe(
      filter(id => id !== null),
      withLatestFrom(this.allEmployees$),
      map(([id, employees]) => {
        return [id, (id && employees[id]) || null] as EmployeeTuple;
      }),
      switchMap(([id, employee]) => {
        if (employee) {
          return of(employee);
        }
        return this.getEmployee(id).pipe(
          tap(employee => {
            this.allEmployees$.next({
              ...this.allEmployees$.value,
              [employee.id]: employee,
            });
          })
        );
      })
    );
  }

  createEmployee(input: CreateEmployeeInput): Observable<Employee> {
    return this.http.post<Employee>('employee', input);
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>('employee').pipe(
      tap(employees => {
        this.allEmployees$.next({
          ...this.mapEmployeesToRecord(employees, this.allEmployees$.value),
        });
      })
    );
  }

  getEmployee(id: string): Observable<Employee> {
    return this.http.get<Employee>(`employee/${id}`);
  }

  selectEmployee(id: string) {
    this.selectedEmployeeId$.next(id);
  }

  private mapEmployeesToRecord(employees: Employee[], existing: AllEmployees = {}): AllEmployees {
    return employees.reduce((acc, employee) => {
      acc[employee.id] = employee;
      return acc;
    }, existing);
  }

  updateEmployee(employee: Employee) {
    return this.http.put<Employee>(`employee/${employee.id}`, employee).pipe(
      tap(updatedEmployee => {
        this.allEmployees$.next({
          ...this.allEmployees$.value,
          [updatedEmployee.id]: updatedEmployee,
        });
        this.selectEmployee(updatedEmployee.id);
      })
    );
  }
}
