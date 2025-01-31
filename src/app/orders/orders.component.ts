import { Component } from '@angular/core';
import { ConsumeService } from '../services/consume.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [MatSnackBarModule, HttpClientModule, FormsModule, NgIf], // ✅ Ensure FormsModule is imported for ngModel
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  product = {
    name: '',
    description: '',
    price: 0,
    stockType: 'Stock out',
    client: ''
  };

  isSaving = false;
  userId = '123'; // 🔹 Replace with actual user ID (dynamic value)

  constructor(
    private consumeService: ConsumeService,
    private snackBar: MatSnackBar
  ) { }

  saveProduct() {
    this.isSaving = true;
    this.consumeService.postRequest('/api/open/admin/add-product?userId=${userId}', this.product, null).subscribe(
      () => {
        this.isSaving = false;
        this.snackBar.open('Product saved successfully!', 'Close', {
          duration: 3000,
          panelClass: 'bg-green-500 text-white'
        });
        this.clearForm();
      },
      (error) => {
        this.isSaving = false;
        this.snackBar.open('Error saving product. Try again!', 'Close', {
          duration: 3000,
          panelClass: 'bg-red-500 text-white'
        });
        console.error('Error saving product:', error);
      }
    );
  }

  clearForm() {
    this.product = { name: '', description: '', price: 0, stockType: 'Stock out', client: '' };
  }
}
