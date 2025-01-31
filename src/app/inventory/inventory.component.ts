import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConsumeService } from '../services/consume.service';

interface Product {
  name: string;
  description: string;
  price: number;
  stockType: string;
  availableStock: number;
  date: string;
  supplier: string;
  dispatchedStock: number;
  client: string;
}

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [DatePipe, FormsModule, NgFor, HttpClientModule],
  providers: [DatePipe],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent implements OnInit {
downloadData() {
throw new Error('Method not implemented.');
}

  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchDate: string = '';
  searchText: string = '';

  constructor(private consumeService: ConsumeService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.consumeService.getRequest('/api/open/admin/products', null).subscribe(
      (data: Product[]) => {
     
        this.products = data.map((product: Product) => ({
          ...product,
          date: this.datePipe.transform(product.date, 'yyyy-MM-dd HH:mm') || ''
        }));
        this.filteredProducts = this.products;
      },
      (error) => console.error('Error fetching products:', error)
    );
  }

  filterRecords(): void {
    this.filteredProducts = this.products.filter((product: Product) => {
      const matchesDate = this.searchDate ? product.date.startsWith(this.searchDate) : true;
      const matchesText = this.searchText
        ? product.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        product.supplier.toLowerCase().includes(this.searchText.toLowerCase())
        : true;

      return matchesDate && matchesText;
    });
  }
}
