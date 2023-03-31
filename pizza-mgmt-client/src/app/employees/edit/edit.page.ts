import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';
import {
  catchError,
  distinctUntilChanged,
  finalize,
  map,
  Observable,
  of,
  share,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { CreateEmployeeInput, Employee, isEmployee } from '../employee.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPageComponent implements OnInit {
  employee$: Observable<Employee> | null = null;

  requestStatus$ = new Subject<{ loading: boolean; error: boolean; open: boolean }>();

  isOpen$ = this.requestStatus$.pipe(
    map(status => status.open),
    distinctUntilChanged()
  );

  isLoading$ = this.requestStatus$.pipe(
    map(status => status.loading),
    distinctUntilChanged()
  );

  onSaveClickHandler$ = new Subject<Employee | CreateEmployeeInput>();

  updateOperationResult$: Observable<boolean> | null = null;
  constructor(private route: ActivatedRoute, public service: EmployeeService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.employee$ = this.service.selectedEmployee$;
    if (id) {
      this.service.selectEmployee(id);

      this.updateOperationResult$ = this.onSaveClickHandler$.pipe(
        switchMap(employee => {
          if (isEmployee(employee)) {
            this.requestStatus$.next({ loading: true, error: false, open: false });
            return this.service.updateEmployee(employee).pipe(
              catchError(() => {
                return of(true);
              }),
              map(result => result === true),
              tap(error => {
                this.requestStatus$.next({ loading: false, error, open: true });
              }),
              finalize(() => {
                this.requestStatus$.next({ loading: false, error: false, open: true });
              })
            );
          }
          return of(false);
        }),
        share()
      );
    }
  }
}
