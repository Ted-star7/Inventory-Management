import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConsumeService } from '../services/consume.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatSnackBarModule, FormsModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  username: string | undefined;
  email: string | undefined;
  password: string | undefined;
  role: string | undefined;
isPasswordVisible: any;

  constructor(
    private router: Router,
    private consumeService: ConsumeService,
    private snackBar: MatSnackBar
  ) { }

  onSignup(): void {
    const formData = {
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.consumeService.postRequest('/api/open/users/signup', formData, null).subscribe(
      (response) => {
        response = JSON.parse(response);
        if (response.success) {
          this.snackBar.open('Signup Successful', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/dashboard']);  // Navigate to dashboard after successful signup
        } else {
          this.snackBar.open('Signup Failed: ' + response.message, 'Close', {
            duration: 5000,
          });
        }
      },
      (error) => {
        console.error('Signup error:', error);
        this.snackBar.open('Signup Failed', 'Close', {
          duration: 5000,
        });
      }
    );
    
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
