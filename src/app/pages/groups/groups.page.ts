import { Component, OnInit, effect, signal } from '@angular/core';
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
import { ChatService } from 'src/app/services/chat.service';
import { User } from 'src/app/types/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
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
export class GroupsPage {
  user = signal<User | undefined>(undefined);
  groups = signal<any>([]);
  constructor(
    private chatService: ChatService,
    private authService: AuthService,
  ) {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.user.set(user);
    }

    effect(() => {
      this.loadGroups();
    });
  }

  loadGroups() {
    const user = this.user();
    if (!user) return;
    this.chatService.getGroupsByUser(user.id).subscribe({
      next: (response) => {
        console.log(response);
        this.groups.set(response);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
