import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventoryComponent } from './inventory/inventory.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { OrdersComponent } from './orders/orders.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

export const routes: Routes = [
  { path: '', component: LoginComponent }, // Default route (Login Page)
  { path: 'dashboard', component: DashboardComponent },
  { path: 'orders', component: OrdersComponent},
  { path: 'purchase', component: PurchaseComponent},
  { path: 'sidebar', component: SidebarComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'resetpassword', component: ResetPasswordComponent},
  { path: '**', redirectTo: '' }, // Fallback route
];


