import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConsumeService } from '../services/consume.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatSnackBarModule, FormsModule, HttpClientModule, NgIf],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  userName: string | undefined;
  email: string | undefined;
  password: string | undefined;
  role: string | undefined;
  isPasswordVisible: boolean = false;
  showPasswordField: boolean = true; 

  constructor(
    private router: Router,
    private consumeService: ConsumeService,
    private snackBar: MatSnackBar
  ) { }

  onSignup(): void {
    const formData = {
      userName: this.userName,
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.consumeService.postRequest('/api/open/users/signup', formData, null).subscribe(
      (response) => {
        response = JSON.parse(response);
        if (response.status === 'success') {
          this.snackBar.open('Signup Successful: ' + response.message, 'Close', {
            duration: 3000,
          });
          this.resetForm();
          this.router.navigate(['/dashboard']);
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

  resetForm(): void {
    this.userName = '';
    this.email = '';
    this.password = '';
    this.role = '';
    this.showPasswordField = true; // Reset visibility on form reset
  }

 
  onRoleChange() {
    this.showPasswordField = this.role === 'SuperAdmin';
  }
}
