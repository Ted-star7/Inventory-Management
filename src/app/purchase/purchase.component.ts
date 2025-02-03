import { Component } from '@angular/core';
import { ConsumeService } from '../services/consume.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { SessionService } from '../services/session.service'; // Import SessionService

@Component({
  selector: 'app-purchase',
  standalone: true,
  imports: [MatSnackBarModule, HttpClientModule, FormsModule, NgIf],
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.css'
})
export class PurchaseComponent {
  product = {
    name: '',
    description: '',
    availableStock: '',
    price: 0,
    stockType: 'Stock in',
    date: '',
    supplier: '',
    userId: 0 
  };

  isSaving = false;

  constructor(
    private consumeService: ConsumeService,
    private snackBar: MatSnackBar,
    private sessionService: SessionService 
  ) { }

  saveProduct() {
    this.isSaving = true;

    const userId = this.sessionService.getUserId();
    if (!userId) {
      this.snackBar.open('User ID not found. Please log in again.', 'Close', { duration: 3000, panelClass: 'bg-red-500 text-white' });
      this.isSaving = false;
      return;
    }

    this.product.date = new Date().toISOString(); 
    this.product.userId = parseInt(userId, 10); 

    this.consumeService.postRequest(`/api/open/stock-in/add?userId=${this.product.userId}`, this.product, null).subscribe(
      () => {
        this.isSaving = false;
        this.snackBar.open('Product saved successfully!', 'Close', { duration: 3000});
        this.clearForm();
      },
      (error) => {
        this.isSaving = false;
        this.snackBar.open('Error saving product. Try again!', 'Close', { duration: 3000});
        console.error('Error saving product:', error);
      }
    );
  }

  clearForm() {
    this.product = { name: '', description: '', price: 0, stockType: 'Stock in', availableStock: '', date: '', supplier: '', userId: 0 };
  }
}
