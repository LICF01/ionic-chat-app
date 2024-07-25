import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/angular/standalone';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/types/user';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,

    IonCard,
    IonCardHeader,
    IonCardTitle,
  ],
})
export class UsersPage implements OnInit {
  users = signal<User[]>([]);
  constructor(
    private usersService: UsersService,
    private router: Router,
    private authService: AuthService,
  ) {
    this.usersService.getUsers().subscribe({
      next: (response) => {
        const users = response.filter(
          (user) => user.id !== this.authService.getCurrentUser()?.id,
        );
        this.users.set(users);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  ngOnInit() {}

  onUserClick(user: User) {
    this.router.navigate(['/users/', `user-${user.id}`]);
  }
}
