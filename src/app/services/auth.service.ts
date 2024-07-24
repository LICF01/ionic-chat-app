import { Injectable, effect, signal } from '@angular/core';
import { User } from '../types/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = signal<User | undefined | null>(undefined);

  constructor(private router: Router) {
    effect(() => {
      const user = this.currentUser();
      if (user === null) {
        this.router.navigateByUrl('/login');
      }
    });
  }

  getCurrentUser() {
    return this.currentUser();
  }

  logout() {
    this.currentUser.set(null);
  }
}
