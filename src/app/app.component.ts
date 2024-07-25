import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';

import {
  personOutline,
  lockClosedOutline,
  chatbubblesOutline,
  exitOutline,
  peopleOutline,
  sendOutline,
} from 'ionicons/icons';
import { AuthService } from './services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
  ) {
    addIcons({
      personOutline,
      lockClosedOutline,
      chatbubblesOutline,
      exitOutline,
      peopleOutline,
      sendOutline,
    });
  }

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    console.log(currentUser);
    if (!currentUser) {
      this.router.navigateByUrl('/login');
    }
    // this.http
    //   .get<{ user: User }>('https://api.realworld.io/api/user')
    //   .subscribe({
    //     next: (response) => this.authService.currentUser.set(response.user),
    //     error: () => {
    //       this.authService.currentUser.set(null);
    //     },
    //   });
  }
}
