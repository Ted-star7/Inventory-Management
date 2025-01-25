import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor() { }

  public saveToken(token: string): void {
    try {
      sessionStorage.setItem('token', token);
    } catch (error) {
      console.error('Error saving token in session storage:', error);
    }
  }

  public saveUserId(userId: string): void {
    try {
      sessionStorage.setItem('userId', userId);
    } catch (error) {
      console.error('Error saving userId in session storage:', error);
    }
  }

  public saverole(role: string): void {
    try {
      sessionStorage.setItem('role', role);
    } catch (error) {
      console.error('Error saving role in session storage:', error);
    }
  }

  public getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  public getUserId(): string | null {
    return sessionStorage.getItem('userId');
  }

  public getrole(): string | null {
    return sessionStorage.getItem('role');
  }

  public deleteSessions(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('role');
  }

  public isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
