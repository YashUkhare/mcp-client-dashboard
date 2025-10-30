import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

interface JwtPayload {
  exp?: number;
  [key: string]: unknown;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = `${environment.apiUrl}/auth`;

  async login(username: string, password: string) {
    const res = await axios.post(`${this.base}/login?username=${username}&password=${password}`);
    this.persistSession(res.data.token, res.data.username);
    return res.data;
  }

  logout(opts: { emit?: boolean } = {}) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    if (opts.emit && typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('auth-expired'));
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  hasValidToken(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    if (this.isTokenExpired(token)) {
      this.logout();
      return false;
    }

    return true;
  }

  private persistSession(token: string, username: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', username);
  }

  private isTokenExpired(token: string): boolean {
    const payload = this.decodePayload(token);

    if (!payload?.exp) {
      return false;
    }

    const now = Math.floor(Date.now() / 1000);
    return payload.exp <= now;
  }

  private decodePayload(token: string): JwtPayload | null {
    try {
      const [, payload] = token.split('.');
      if (!payload) {
        return null;
      }

      const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
      const globalScope = globalThis as typeof globalThis & { Buffer?: any; atob?: typeof atob };
      const binary = globalScope.atob
        ? globalScope.atob(normalized)
        : globalScope.Buffer
          ? globalScope.Buffer.from(normalized, 'base64').toString('binary')
          : null;

      if (!binary) {
        return null;
      }
      const decoded = decodeURIComponent(
        binary
          .split('')
          .map((char: string) => `%${`00${char.charCodeAt(0).toString(16)}`.slice(-2)}`)
          .join('')
      );

      return JSON.parse(decoded) as JwtPayload;
    } catch {
      return null;
    }
  }
}
