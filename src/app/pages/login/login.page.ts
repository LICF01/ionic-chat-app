import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonGrid,
  IonItem,
  IonInput,
  IonIcon,
  IonButton,
  IonCol,
  IonRow,
  IonText,
} from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/types/user';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonInput,
    IonIcon,
    IonButton,
    RouterLink,
    IonText,
    ReactiveFormsModule,
  ],
})
export class LoginPage implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.http
      .post<{
        message: string;
        data: User;
      }>(environment.API_URL + '/login', this.loginForm.value)
      .subscribe((response) => {
        if (response.message === 'success') {
          const data = response.data;
          console.log(data);
          localStorage.setItem('token', data.token);
          this.authService.currentUser.set(data);
          this.router.navigateByUrl('/');
        }
      });
  }
}
