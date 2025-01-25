import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConsumeService } from '../services/consume.service';
import { SessionService } from '../services/session.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatSnackBarModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string | undefined;
  password: string | undefined;
  role: string | undefined;
  showPassword: boolean = false; // Toggles password visibility
  isPasswordVisible: any;

  constructor(
    private router: Router,
    private consumeService: ConsumeService,
    private sessionService: SessionService,
    private snackBar: MatSnackBar
  ) { }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  navigateToResetPassword(): void {
    this.router.navigate(['/resetpassword']);
  }

  onLogin(): void {
    const formData = {
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.consumeService.postRequest('/api/open/registration/login', formData, null).subscribe(
      (response) => {
        response = JSON.parse(response);

        // Check if the response contains the message and token
        if (response.message === 'Login successful' && response.token) {
          const token = response.token;
          const userId = response.userId;
          const role = response.role;

          if (token && userId) {
            // Save session data
            this.sessionService.saveToken(token);
            this.sessionService.saveUserId(userId);
            this.sessionService.saverole(role);

            this.snackBar.open('Login Successful', 'Close', {
              duration: 3000,
            });

            this.router.navigate(['/dashboard']);  // Navigate to dashboard
          } else {
            console.error('Token or userId is undefined or null');
            this.snackBar.open('Login Failed: Invalid response from server', 'Close', {
              duration: 5000,
            });
          }
        } else {
          console.error('Login failed or unexpected response:', response);
          this.snackBar.open('Login Failed: ' + response.message, 'Close', {
            duration: 5000,
          });
        }
      },
      (error) => {
        console.error('Login error:', error);
        this.snackBar.open('Login Failed', 'Close', {
          duration: 5000,
        });
      }
    );
  }


}
