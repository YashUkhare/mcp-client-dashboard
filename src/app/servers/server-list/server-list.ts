import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import api from '../../core/interceptors/axios-config';
import { AuthService } from '../../auth/auth-service';

@Component({
  selector: 'app-server-list',
  standalone: true,
  imports: [CommonModule, TableModule, CardModule, ButtonModule],
  templateUrl: './server-list.html',
  styles: [`
    .dashboard-wrapper {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      padding: 1.5rem;
      background: radial-gradient(circle at top left, #1f2937, #0f172a);
      border-radius: 1.5rem;
      box-shadow: 0 25px 50px -25px rgba(15, 23, 42, 0.75);
      color: #f8fafc;
    }

    .dashboard-header {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      background: rgba(15, 23, 42, 0.55);
      border-radius: 1.25rem;
      padding: 1.5rem;
      border: 1px solid rgba(148, 163, 184, 0.15);
    }

    .header-title {
      margin: 0;
      font-size: 1.75rem;
      font-weight: 700;
      letter-spacing: 0.02em;
    }

    .header-subtitle {
      margin: 0.35rem 0 0;
      color: rgba(226, 232, 240, 0.75);
      max-width: 24rem;
    }

    .timestamp {
      margin-top: 0.75rem;
      font-size: 0.85rem;
      color: rgba(226, 232, 240, 0.65);
    }

    .metrics {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .metric-pill {
      padding: 0.45rem 0.9rem;
      border-radius: 999px;
      background: rgba(148, 163, 184, 0.2);
      font-weight: 600;
      letter-spacing: 0.01em;
    }

    .metric-pill.online {
      background: rgba(34, 197, 94, 0.25);
      color: #bbf7d0;
    }

    .metric-pill.total {
      background: rgba(59, 130, 246, 0.25);
      color: #bfdbfe;
    }

    .server-card {
      border-radius: 1.25rem;
      overflow: hidden;
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(148, 163, 184, 0.12);
      color: #0f172a;
    }

    .table-container {
      padding: 0.5rem 0.75rem 1rem;
    }

    :host ::ng-deep .server-card .p-card-header {
      font-weight: 600;
      font-size: 1.2rem;
      padding: 1.25rem 1.75rem 0;
      color: #f8fafc;
      background: transparent;
      border: none;
    }

    :host ::ng-deep .server-card .p-card-body {
      padding: 1.5rem;
      background: rgba(15, 23, 42, 0.35);
    }

    :host ::ng-deep .server-table thead tr {
      background: rgba(148, 163, 184, 0.15);
      color: #e2e8f0;
    }

    :host ::ng-deep .server-table tbody tr {
      transition: transform 0.15s ease, background 0.15s ease;
    }

    :host ::ng-deep .server-table tbody tr:hover {
      transform: translateY(-2px);
      background: rgba(59, 130, 246, 0.08);
    }

    .status-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      display: inline-block;
      margin-right: 0.5rem;
    }

    .status-dot.online {
      background: #22c55e;
      box-shadow: 0 0 12px rgba(34, 197, 94, 0.7);
    }

    .status-dot.offline {
      background: #ef4444;
      box-shadow: 0 0 12px rgba(239, 68, 68, 0.6);
    }

    .badge {
      display: inline-flex;
      align-items: center;
      padding: 0.35rem 0.75rem;
      border-radius: 0.65rem;
      background: rgba(59, 130, 246, 0.2);
      color: #ccd9f5;
      font-weight: 600;
      letter-spacing: 0.02em;
    }

    .empty-state {
      padding: 2.5rem 1rem;
      text-align: center;
      color: #94a3b8;
    }

    .empty-state i {
      font-size: 2.3rem;
      margin-bottom: 0.75rem;
      display: block;
    }

    .error-banner {
      margin-top: 1rem;
      background: rgba(239, 68, 68, 0.12);
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: #fecaca;
      padding: 0.75rem 1rem;
      border-radius: 0.85rem;
    }

    @media (max-width: 768px) {
      .dashboard-wrapper {
        padding: 1rem;
      }

      .dashboard-header {
        flex-direction: column;
        align-items: flex-start;
      }

      .metrics {
        width: 100%;
        justify-content: space-between;
      }
    }
  `]
})
export class ServerListComponent implements OnInit {
  servers: any[] = [];
  loading = false;
  errorMessage = '';
  lastRefreshed: Date | null = null;

  constructor(private readonly auth: AuthService, private readonly router: Router) {}

  ngOnInit(): void {
    this.loadServers();
  }

  async loadServers(): Promise<void> {
    this.loading = true;
    this.errorMessage = '';

    try {
      const res = await api.get('/mcp/servers');
      this.servers = res.data ?? [];
      this.lastRefreshed = new Date();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        return;
      }
      console.error('Error fetching servers:', error);
      this.errorMessage = 'Unable to load servers right now. Please try again shortly.';
    } finally {
      this.loading = false;
    }
  }

  get onlineCount(): number {
    return this.servers.filter((server: any) => server?.connected).length;
  }

  onLogout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
