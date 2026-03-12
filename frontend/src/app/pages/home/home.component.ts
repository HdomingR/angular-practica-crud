import { Component } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { BreadcrumbItem } from '../../core/model/Breadcrumb';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-home',
  imports: [TableComponent, BreadcrumbComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  breadcrumbs: BreadcrumbItem[] = [{ label: 'Inicio', url: '/' }];
}
