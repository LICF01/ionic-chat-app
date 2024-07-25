import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  URL = environment.API_URL + '/users';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>(this.URL);
  }
}
