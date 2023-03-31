import { Component } from '@angular/core';
import { NavItem } from './shared/nav/nav.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [``],
})
export class AppComponent {
  navigationItems: NavItem[] = [
    {
      title: 'Employees',
      path: '/employees',
    },
    {
      title: 'Orders',
      path: '/orders',
    },
    {
      title: 'Customers',
      path: '/customers',
    },
    {
      title: 'Reports',
      path: '/reports',
    },
  ];
}
