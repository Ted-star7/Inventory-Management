import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventoryComponent } from './inventory/inventory.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { OrdersComponent } from './orders/orders.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ManageComponent } from './manage/manage.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './services/auth.service';

export const routes: Routes = [
  { path: '', component: LoginComponent }, // Default route (Login Page)
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'purchase', component: PurchaseComponent, canActivate: [AuthGuard] },
  { path: 'sidebar', component: SidebarComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [AuthGuard] },
  { path: 'inventory', component: InventoryComponent, canActivate: [AuthGuard] },
  { path: 'resetpassword', component: ResetPasswordComponent},
  { path: 'manage', component: ManageComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }, // Fallback route
];


