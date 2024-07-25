import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { GroupMessage, PrivateMessage } from '../types/message';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private groupsURL = environment.API_URL + '/group-members-by-user/';
  private privatesURL = environment.API_URL + '/private-messages-by-user/';
  private groupMessagesByGroup =
    environment.API_URL + '/group-messages-by-group/';

  constructor(private http: HttpClient) {}

  getGroupsByUser(userId: number) {
    return this.http.get(this.groupsURL + userId);
  }

  getPrivateMessagesByUsers(senderId: number, receiverId: number) {
    return this.http.get<PrivateMessage[]>(
      this.privatesURL + senderId + '/' + receiverId,
    );
  }

  getGroupMessagesByGroup(groupId: number) {
    return this.http.get<GroupMessage[]>(this.groupMessagesByGroup + groupId);
  }
}
