import { Component, OnInit, effect, signal } from '@angular/core';
import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
  IonTabs,
  IonTabBar,
  IonTabButton,
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonTabs,
    IonTabBar,
    IonTabButton,
  ],
})
export class HomePage {
  user = signal<User | undefined>(undefined);
  constructor(private authService: AuthService) {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.user.set(user);
    }
  }

  logout = () => this.authService.logout();
}
