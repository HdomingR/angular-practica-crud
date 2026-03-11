import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CarCreateComponent } from './components/car-create/car-create.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'cars/create',
    component: CarCreateComponent,
  },
  {
    path: 'cars/:id',
    component: CarDetailsComponent,
  },
];
