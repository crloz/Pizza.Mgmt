import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Observable, Subject } from 'rxjs';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListPageComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  employees$: Observable<Employee[]> | null = null;
  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employees$ = this.employeeService.getEmployees();
  }

  handleClick(employee: Employee) {
    this.employeeService.selectedEmployeeId$.next(employee.id);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
