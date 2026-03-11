import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'cars/:id',
    component: CarDetailsComponent,
  },
];
