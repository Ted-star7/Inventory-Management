import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { ConsumeService } from '../services/consume.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule,],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  userName: string = '';
  userId: string | null = null;
  token: string | null = null;

  totalStockIn: number = 0;
  totalStockOut: number = 0;
  totalInput: number = 0;
  totalWorth: number = 0;

  constructor(
    private sessionService: SessionService,
    private consumeService: ConsumeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userName = this.sessionService.getuserName() ?? 'Guest';
    this.userId = this.sessionService.getUserId() 
    this.token = this.sessionService.getToken(); 

    if (this.userId && this.token) {
      this.loadDashboardData();
    }
  }

  loadDashboardData(): void {
    // Fetch Total Stock In
    this.consumeService.getRequest(`/api/open/stock-in/total-quantity?userId=${this.userId}`, this.token)
      .subscribe(data => this.totalStockIn = data || 0);

    // Fetch Total Input Price
    this.consumeService.getRequest(`/api/open/stock-in/total-price?userId=${this.userId}`, this.token)
      .subscribe(data => this.totalInput = data || 0);

    // Fetch Total Stock Out
    this.consumeService.getRequest(`/api/open/stock-out/total-dispatched?userId=${this.userId}`, this.token)
      .subscribe(data => this.totalStockOut = data || 0);

    // Fetch Total Worth (Total Price of Stock Out)
    this.consumeService.getRequest(`/api/open/stock-out/total-price?userId=${this.userId}`, this.token)
      .subscribe(data => this.totalWorth = data || 0);
  }

  navigateToInventory(): void {
    this.router.navigate(['/inventory']);
  }
}
