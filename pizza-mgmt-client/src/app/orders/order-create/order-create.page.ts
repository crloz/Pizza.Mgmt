import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PizzaSize, PizzaType } from '../types';

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

  constructor(private formBuilder: FormBuilder) {
    this.createOrderForm = this.formBuilder.group({
      totalPrice: [null, Validators.required],
      pizzaSize: ['', Validators.required],
      pizzaType: ['', Validators.required],
      deliveryAddress: ['ddd', Validators.required],
      customer: this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['jose', Validators.required],
        phone: ['', Validators.required],
      }),
    });
  }

  onSubmit() {
    console.log(this.createOrderForm.value);
  }

  protected readonly PizzaType = PizzaType;
}
