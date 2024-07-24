import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  groupsURL = environment.API_URL + '/group-members-by-user/';
  privatesURL = environment.API_URL + '/private-messages-by-user/';

  constructor(private http: HttpClient) {}

  getGroupsByUser(userId: number) {
    return this.http.get(this.groupsURL + userId);
  }

  getPrivateMessagesByUsers(senderId: number, receiverId: number) {
    return this.http.get(this.privatesURL + senderId + '/' + receiverId);
  }
}
