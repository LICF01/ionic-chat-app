import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  URL = environment.API_URL + '/users';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(this.URL);
  }
}
