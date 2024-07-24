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
  users = signal<any>([]);
  constructor(private usersService: UsersService) {
    this.usersService.getUsers().subscribe({
      next: (response) => {
        this.users.set(response);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  ngOnInit() {}
}
