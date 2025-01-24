import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventoryComponent } from './inventory/inventory.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'inventory', component: InventoryComponent},
  {path: 'sidebar', component: SidebarComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent}
];
