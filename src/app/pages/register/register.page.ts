import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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
import { User } from '../../types/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
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
  standalone: true,
})
export class RegisterPage implements OnInit {
  registerForm = new FormGroup(
    {
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', Validators.required),
    },
    { validators: this.passwordmatch.bind(this) },
  );

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {}

  passwordmatch(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword
      ? null
      : { passwordMismatchError: true };
  }

  onSubmit() {
    if (this.registerForm.invalid) return;
    this.http
      .post<{ user: User }>('https://api.realworld.io/api/users', {
        user: {
          username: this.registerForm.get('username')?.value,
          email: this.registerForm.get('email')?.value,
          password: this.registerForm.get('password')?.value,
        },
      })
      .subscribe((response) => {
        // localStorage.setItem('token', response.user.token);
        this.authService.currentUser.set(response.user);
        this.router.navigateByUrl('/');
      });
  }
}
