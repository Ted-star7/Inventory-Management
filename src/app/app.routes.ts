import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventoryComponent } from './inventory/inventory.component';

export const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'inventory', component: InventoryComponent}
];
