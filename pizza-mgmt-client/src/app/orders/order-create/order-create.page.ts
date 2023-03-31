import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateOrderInput, Order, PizzaSize, PizzaType } from '../types';
import {
  catchError,
  debounceTime,
  filter,
  map,
  Observable,
  of,
  share,
  Subject,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { OrderService } from '../order.service';

type ResultTuple = [Error | null, Order | null];

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.page.html',
  styleUrls: ['./order-create.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderCreatePage {
  createOrderForm: FormGroup;

  pizzaSizes = Object.values(PizzaSize);
  pizzaTypes = Object.values(PizzaType);

  submitHandler$ = new Subject<MouseEvent>();
  successOrError$: Observable<ResultTuple>;
  toastOpen$: Observable<boolean>;
  isErrored$: Observable<boolean>;

  constructor(private formBuilder: FormBuilder, private orderService: OrderService) {
    this.createOrderForm = this.formBuilder.group({
      totalPrice: [null, Validators.required],
      pizzaSize: [null, Validators.required],
      pizzaType: ['', Validators.required],
      deliveryAddress: ['', Validators.required],
      customer: this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phone: ['', Validators.required],
      }),
    });

    this.successOrError$ = this.submitHandler$.pipe(
      debounceTime(1000),
      filter(() => this.createOrderForm.valid),
      withLatestFrom(this.createOrderForm.valueChanges),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      map(([_, value]) => value as CreateOrderInput),
      switchMap(value => this.orderService.createOrder(value)),
      catchError(() => of(new Error())),
      map(e => (e instanceof Error ? [e, null] : [null, e]) as ResultTuple),
      share()
    );
    this.toastOpen$ = this.successOrError$.pipe(map(() => true));
    this.isErrored$ = this.successOrError$.pipe(map(([e]) => !!e));
  }

  onSubmit() {
    if (this.createOrderForm.valid) {
      console.log(this.createOrderForm.value);
    }
  }
}
