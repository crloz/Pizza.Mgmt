import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateOrderInput, Order } from './types';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private http: HttpClient) {}

  createOrder(input: CreateOrderInput): Observable<Order> {
    return this.http.post<Order>('order', input);
  }
}
