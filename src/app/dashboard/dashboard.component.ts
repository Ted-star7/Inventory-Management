import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  userName: string = '';

  constructor(private sessionService: SessionService) { }

  ngOnInit(): void {
    this.userName = this.sessionService.getuserName() ?? 'Guest'; // Default to 'Guest' if null
  }
}
