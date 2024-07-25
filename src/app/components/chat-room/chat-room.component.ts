import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IonChip,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonText,
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { GroupMessage, PrivateMessage } from 'src/app/types/message';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
  imports: [IonContent, IonList, IonItem, IonLabel, IonChip, IonText],
  standalone: true,
})
export class ChatRoomComponent implements OnInit {
  groupMessages = signal<GroupMessage[]>([]);
  privateMessages = signal<PrivateMessage[]>([]);
  user = signal<User | undefined>(undefined);

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private authService: AuthService,
  ) {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.user.set(user);
    }
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      let id = params['id'].split('-')[1];
      let type = params['id'].split('-')[0];

      console.log(id, type);
      if (type === 'group') {
        this.chatService.getGroupMessagesByGroup(id).subscribe((response) => {
          this.groupMessages.set(response);
          this.privateMessages.set([]);
        });
      } else if (type === 'user') {
        const senderId = this.user()?.id;
        const receiverId = parseInt(id);
        if (!senderId || !receiverId) return;
        this.chatService
          .getPrivateMessagesByUsers(senderId, receiverId)
          .subscribe((response) => {
            this.privateMessages.set(response);
            this.groupMessages.set([]);
          });
      }
    });
  }
}
