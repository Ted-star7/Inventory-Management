import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})
export class ManageComponent {

  constructor(
    private router: Router
  ){}

  navigatesignup(): void{
    this.router.navigate(['/signup']);

  }
}
