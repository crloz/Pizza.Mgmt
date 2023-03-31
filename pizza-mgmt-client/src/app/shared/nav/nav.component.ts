import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, Event, RouterLink } from '@angular/router';
import { filter, map, Observable } from 'rxjs';

export type NavItem = {
  title: string;
  path: string;
  current?: Observable<boolean>;
};

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  #_navItems: NavItem[] = [];
  @Input() set navItems(navItems: NavItem[]) {
    this.#_navItems = navItems.map(item => ({
      ...item,
      current:
        item.current ||
        this.router.events.pipe(
          filter(event => event instanceof NavigationEnd),
          map(
            (event: Event) =>
              (event as NavigationEnd).urlAfterRedirects.match(/^(\/\w+)/g)?.[0] === item.path
          )
        ),
    }));
  }

  get navItems(): NavItem[] {
    return this.#_navItems;
  }
  constructor(private readonly router: Router, private route: ActivatedRoute) {
    // this.router.events.subscribe(e => {
    //   console.log(e);
    // });
  }
}
