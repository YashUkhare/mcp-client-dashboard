import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, PasswordModule, ButtonModule, CardModule],
  templateUrl: './login.html',
  styles: [`
    .login-wrapper {
      min-height: calc(100vh - 150px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      background: radial-gradient(circle at top left, #1e3a8a, #0f172a);
    }

    .login-container {
      display: grid;
      gap: 2.5rem;
      align-items: center;
      width: 100%;
      max-width: 960px;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      color: #e2e8f0;
    }

    .login-copy h1 {
      margin: 0;
      font-size: 2.5rem;
      font-weight: 700;
      letter-spacing: 0.02em;
    }

    .login-copy p {
      margin: 0.75rem 0 0;
      line-height: 1.7;
      max-width: 24rem;
      opacity: 0.8;
    }

    .login-card {
      backdrop-filter: blur(16px);
      border-radius: 1.25rem;
      box-shadow: 0 30px 60px -35px rgba(15, 23, 42, 0.85);
      border: 1px solid rgba(148, 163, 184, 0.25);
      overflow: hidden;
    }

    :host ::ng-deep .login-card .p-card-body {
      padding: 2rem;
      background: rgba(248, 250, 252, 0.95);
    }

    .login-header {
      margin-bottom: 1.5rem;
    }

    .login-title {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 700;
      color: #0f172a;
    }

    .login-subtitle {
      margin: 0.35rem 0 0;
      color: #475569;
    }

    .field {
      margin-bottom: 1.25rem;
    }

    .field label {
      display: block;
      margin-bottom: 0.35rem;
      font-weight: 600;
      color: #0f172a;
    }

    :host ::ng-deep .p-inputtext,
    :host ::ng-deep .p-password-input {
      width: 100%;
      padding: 0.75rem 1rem;
      border-radius: 0.75rem;
      border: 1px solid rgba(148, 163, 184, 0.6);
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    :host ::ng-deep .p-inputtext:focus,
    :host ::ng-deep .p-password-input:focus-within {
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
    }

    .login-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 2rem;
    }

    .error-message {
      margin-top: 1.25rem;
      background: rgba(248, 113, 113, 0.18);
      border: 1px solid rgba(248, 113, 113, 0.4);
      color: #b91c1c;
      padding: 0.75rem 1rem;
      border-radius: 0.75rem;
      font-weight: 500;
    }

    @media (max-width: 768px) {
      .login-wrapper {
        min-height: calc(100vh - 100px);
        padding: 1.5rem;
      }

      .login-container {
        gap: 2rem;
        text-align: center;
      }

      .login-copy p {
        margin-left: auto;
        margin-right: auto;
      }

      .login-actions {
        flex-direction: column;
        gap: 1rem;
      }
    }
  `]
})
export class LoginComponent implements OnInit {
  username = 'jimmy';
  password = 'jimmy@123';
  loading = false;
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.auth.hasValidToken()) {
      this.router.navigate(['/servers']);
    }
  }

  async onLogin() {
    this.errorMessage = '';
    this.loading = true;

    try {
      await this.auth.login(this.username, this.password);
      this.router.navigate(['/servers']);
    } catch {
      this.errorMessage = 'Invalid credentials. Please check your username and password.';
    } finally {
      this.loading = false;
    }
  }
}
