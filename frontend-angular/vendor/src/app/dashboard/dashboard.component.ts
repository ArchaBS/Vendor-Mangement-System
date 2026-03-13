import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  products: any = [];

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.api.getProducts().subscribe({
      next: (res: any) => {
        this.products = res;
      },
      error: (err) => {
        if (err.status === 401) {
          // Token expired or invalid — redirect to login
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
      }
    });
  }

}