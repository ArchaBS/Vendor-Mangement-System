import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: any;
  password: any;
  successMessage: string = '';
  errorMessage: string = '';
  showPassword = false;

  constructor(private api: ApiService, private router: Router) {}

  loginUser() {
    let data = {
      username: this.username,
      password: this.password
    };

    this.api.login(data).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.access);
        this.successMessage = 'Login Successful! Redirecting...';
        this.errorMessage = '';
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1500);
      },
      error: (err) => {
        this.errorMessage = 'Invalid credentials. Please try again.';
        this.successMessage = '';
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

}