import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from './auth/auth-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    CardModule,
    InputTextModule,
  ],
  templateUrl: './app.html'
})
export class App implements OnInit, OnDestroy {
  private readonly handleAuthExpired: EventListener = () => {
    this.auth.logout();
    this.router.navigate(['/login']);
  };

  constructor(private readonly auth: AuthService, private readonly router: Router) { }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('auth-expired', this.handleAuthExpired);
    }
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('auth-expired', this.handleAuthExpired);
    }
  }
}
