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

      if (type === 'group') {
        this.chatService.getGroupMessagesByGroup(id).subscribe((response) => {
          const sortedMessages = this.sortMessagesByDate(response);
          console.log(sortedMessages);
          this.groupMessages.set(sortedMessages);
          this.privateMessages.set([]);
        });
      } else if (type === 'user') {
        const senderId = this.user()?.id;
        const receiverId = parseInt(id);
        if (!senderId || !receiverId) return;
        this.chatService
          .getPrivateMessagesByUsers(senderId, receiverId)
          .subscribe((response1) => {
            this.chatService
              .getPrivateMessagesByUsers(receiverId, senderId)
              .subscribe((response2) => {
                const sortedMessages = this.sortMessagesByDate([
                  ...response1,
                  ...response2,
                ]);
                console.log(sortedMessages);
                this.privateMessages.set(sortedMessages);
                this.groupMessages.set([]);
              });
          });
      }
    });
  }

  sortMessagesByDate(messages: any[]): any[] {
    return messages.sort(
      (a, b) => new Date(a.sent_at).getTime() - new Date(b.sent_at).getTime(),
    );
  }
}
