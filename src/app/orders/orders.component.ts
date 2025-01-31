import { Component } from '@angular/core';
import { ConsumeService } from '../services/consume.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { SessionService } from '../services/session.service'; // Import SessionService

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [MatSnackBarModule, HttpClientModule, FormsModule, NgIf],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  product = {
    name: '',
    description: '',
    price: 0,
    stockType: 'Stock out',
    availableStock: 0,
    date: '',
    client: '',
    dispatchedStock: 0,
    userId: 0 // This will be set dynamically
  };

  isSaving = false;

  constructor(
    private consumeService: ConsumeService,
    private snackBar: MatSnackBar,
    private sessionService: SessionService 
  ) { }

  saveProduct() {
    this.isSaving = true;

    const userId = this.sessionService.getUserId(); // Get userId from session storage
    if (!userId) {
      this.snackBar.open('User ID not found. Please log in again.', 'Close', {
        duration: 3000,
        panelClass: 'bg-red-500 text-white'
      });
      this.isSaving = false;
      return;
    }

    this.product.date = new Date().toISOString(); 
    this.product.userId = parseInt(userId, 10); // Convert userId to a number

    this.consumeService.postRequest(`/api/open/stock-out?userId=${this.product.userId}`, this.product, null).subscribe(
      () => {
        this.isSaving = false;
        this.snackBar.open('Product dispatched successfully!', 'Close', {
          duration: 3000,
          panelClass: 'bg-green-500 text-white'
        });
        this.clearForm();
      },
      (error) => {
        this.isSaving = false;
        this.snackBar.open('Error dispatching product. Try again!', 'Close', {
          duration: 3000,
          panelClass: 'bg-red-500 text-white'
        });
        console.error('Error dispatching product:', error);
      }
    );
  }

  clearForm() {
    this.product = { name: '', description: '', price: 0, stockType: 'Stock out', availableStock: 0, date: '', client: '', dispatchedStock: 0, userId: 0 };
  }
}
