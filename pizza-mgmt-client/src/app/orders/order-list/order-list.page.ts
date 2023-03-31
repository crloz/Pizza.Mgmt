import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.page.html',
  styleUrls: ['./order-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderListPage {

}
