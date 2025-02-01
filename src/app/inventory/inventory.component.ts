import { Component, OnInit } from '@angular/core';
import { DatePipe, NgFor, DecimalPipe, NgIf } from '@angular/common';
import { ConsumeService } from '../services/consume.service';
import { SessionService } from '../services/session.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

interface StockInRecord {
  id: number;
  date: string;
  supplier: string;
  quantity: number;
  action: 'Stock In';
}

interface StockOutRecord {
  id: number;
  date: string;
  client: string;
  quantity: number;
  action: 'Stock Out';
}

interface CombinedStockRecord {
  id: number;
  date: string;
  supplier?: string;
  client?: string;
  quantity: number;
  action: 'Stock In' | 'Stock Out';
}

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [DatePipe, NgFor, FormsModule, NgIf],
  providers: [DatePipe, DecimalPipe],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent implements OnInit {
  stockInRecords: StockInRecord[] = [];
  stockOutRecords: StockOutRecord[] = [];
  combinedRecords: CombinedStockRecord[] = [];
  displayedRecords: CombinedStockRecord[] = [];
  totalRecords: number = 0;
  currentPage: number = 1;
  recordsPerPage: number = 10;
  totalPages: number = 1;
  currentView: 'stockIn' | 'stockOut' | 'combined' = 'combined';
  token: string | null = null;
  userId: string | null = null;

  constructor(
    private consumeService: ConsumeService,
    private datePipe: DatePipe,
    private sessionService: SessionService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    // Fetch the token and user ID from session service
    this.token = this.sessionService.getToken();
    this.userId = this.sessionService.getUserId();

    // Check if token is available
    if (this.token && this.userId) {
      this.fetchStockInRecords();
      this.fetchStockOutRecords();
    } else {
      this.snackBar.open('You are not logged in', 'Close', { duration: 3000 });
    }
  }

  fetchStockInRecords(): void {
    if (this.token && this.userId) {
      this.consumeService.getRequest(`/api/open/stock-in?userId=${this.userId}`, this.token).subscribe(
        (data: StockInRecord[]) => {
          this.stockInRecords = data;
          this.updateCombinedRecords();
        },
        (error) => {
          console.error('Error fetching Stock In records:', error);
        }
      );
    }
  }

  fetchStockOutRecords(): void {
    if (this.token && this.userId) {
      this.consumeService.getRequest(`/api/open/stock-out?userId=${this.userId}`, this.token).subscribe(
        (data: StockOutRecord[]) => {
          this.stockOutRecords = data;
          this.updateCombinedRecords();
        },
        (error) => {
          console.error('Error fetching Stock Out records:', error);
        }
      );
    }
  }

  updateCombinedRecords(): void {
    this.combinedRecords = [
      ...this.stockInRecords.map(item => ({
        ...item,
        action: 'Stock In' as 'Stock In'
      })),
      ...this.stockOutRecords.map(item => ({
        ...item,
        action: 'Stock Out' as 'Stock Out'
      }))
    ];
    this.totalRecords = this.getDisplayedRecords().length;
    this.totalPages = Math.ceil(this.totalRecords / this.recordsPerPage);
    this.updatePageData();
  }

  getDisplayedRecords(): CombinedStockRecord[] {
    if (this.currentView === 'stockIn') {
      return this.stockInRecords.map(item => ({ ...item, action: 'Stock In' }));
    }
    if (this.currentView === 'stockOut') {
      return this.stockOutRecords.map(item => ({ ...item, action: 'Stock Out' }));
    }
    return this.combinedRecords;
  }

  toggleView(view: 'stockIn' | 'stockOut' | 'combined'): void {
    this.currentView = view;
    this.updatePageData();
  }

  updatePageData(): void {
    const records = this.getDisplayedRecords();
    const startIndex = (this.currentPage - 1) * this.recordsPerPage;
    const endIndex = startIndex + this.recordsPerPage;
    this.displayedRecords = records.slice(startIndex, endIndex);
  }

  changePage(direction: 'previous' | 'next'): void {
    if (direction === 'previous' && this.currentPage > 1) {
      this.currentPage--;
    }
    if (direction === 'next' && this.currentPage < this.totalPages) {
      this.currentPage++;
    }
    this.updatePageData();
  }

  downloadData(type: 'stockIn' | 'stockOut' | 'combined'): void {
    let dataToDownload: any[];
    if (type === 'stockIn') {
      dataToDownload = this.stockInRecords;
    } else if (type === 'stockOut') {
      dataToDownload = this.stockOutRecords;
    } else {
      dataToDownload = this.combinedRecords;
    }

    const csv = this.convertToCSV(dataToDownload);
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${type}_data.csv`;
    link.click();
  }

  convertToCSV(data: any[]): string {
    const header = Object.keys(data[0]).join(',');
    const rows = data.map(record => Object.values(record).join(',')).join('\n');
    return `${header}\n${rows}`;
  }
}
