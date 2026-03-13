import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  username: any;
  password: any;
  confirmPassword: any;

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private api: ApiService, private router: Router) {}

  registerUser() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    let data = {
      username: this.username,
      password: this.password
    };

    this.api.register(data).subscribe({
      next: (res: any) => {
        alert('Registration Successful!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration failed:', err);
        alert('Registration failed! Error: ' + err.status);
      }
    });
  }

}