import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

const capitalize = (str: string) => (str && str.charAt(0).toUpperCase() + str.slice(1)) || '';
export type BreadcrumbItem = {
  title: string;
  path: string;
  current?: boolean;
};

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent {
  fragments: BreadcrumbItem[] = [];
  constructor(private route: ActivatedRoute) {
    this.fragments = this.route.pathFromRoot
      .filter(route => !!route.snapshot.url[0]?.path)
      .reduce<BreadcrumbItem[]>((acc, route) => {
        const basePath = acc[acc.length - 1]?.path || '/';
        const path = `${basePath}/${route.snapshot.url.map(segment => segment.path).join('/')}`;
        const title = capitalize(route.snapshot.url[0]?.path);
        const current = route === this.route;
        acc.push({ title, path, current });
        return acc;
      }, []);
  }
}
