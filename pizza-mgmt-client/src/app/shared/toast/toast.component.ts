import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-toast',
  animations: [
    trigger('hideShow', [
      state(
        'true',
        style({
          opacity: 1,
        })
      ),
      state(
        'false',
        style({
          opacity: 0,
          top: '0',
        })
      ),
      transition('true => false', [animate(400)]),
      transition('false => true', [animate(250)]),
    ]),
  ],
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent implements OnDestroy, AfterContentInit {
  isOpen = true;

  private _autoHide = true;

  @Input() message: string | null = '';

  @Input() isError = false;
  @Input() set open(value: boolean) {
    this.isOpen = value;
    this._clearTimeout();
    this.setupAutoHide();
  }

  @Input() delay = 2500;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  @Input() set autoHide(value: boolean) {
    this._autoHide = value;
    this._clearTimeout();
    this.setupAutoHide();
  }

  private ngUnsubscribe = new Subject();

  private _timeoutId: number | null = null;

  hide() {
    this._clearTimeout();
    this.isOpen = false;
    this.changeDetectorRef.detectChanges();
  }

  private setupAutoHide() {
    if (this.isOpen && this._autoHide && !this._timeoutId) {
      this._timeoutId = setTimeout(() => {
        this.hide();
      }, this.delay);
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(1);
    this.ngUnsubscribe.complete();
  }

  ngAfterContentInit(): void {
    this.setupAutoHide();
  }

  private _clearTimeout() {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
    }
    this._timeoutId = null;
  }
}
