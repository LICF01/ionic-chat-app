import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  IonButton,
  IonChip,
  IonContent,
  IonFooter,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonText,
  IonToolbar,
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { GroupMessage, PrivateMessage } from 'src/app/types/message';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
  imports: [
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonChip,
    IonText,
    IonFooter,
    IonToolbar,
    IonInput,
    IonButton,
    IonIcon,
    ReactiveFormsModule,
  ],
  standalone: true,
})
export class ChatRoomComponent implements OnInit {
  groupMessages = signal<GroupMessage[]>([]);
  privateMessages = signal<PrivateMessage[]>([]);
  user = signal<User | undefined>(undefined);
  roomType = signal<'group' | 'private' | undefined>(undefined);
  messageForm = new FormGroup({
    text: new FormControl(''),
  });
  paramId = signal<number | undefined>(undefined);

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
      this.paramId.set(parseInt(id));

      if (type === 'group') {
        this.getGroupMessages();
      } else if (type === 'user') {
        this.getPrivateMessagesByUsers();
      }
    });
  }

  getGroupMessages() {
    this.roomType.set('group');
    this.chatService
      .getGroupMessagesByGroup(this.paramId() as number)
      .subscribe((response) => {
        const sortedMessages = this.sortMessagesByDate(response);
        console.log(sortedMessages);
        this.groupMessages.set(sortedMessages);
        this.privateMessages.set([]);
      });
  }

  getPrivateMessagesByUsers() {
    this.roomType.set('private');
    const senderId = this.user()?.id;
    const receiverId = this.paramId() as number;
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

  sortMessagesByDate(messages: any[]): any[] {
    return messages.sort(
      (a, b) => new Date(a.sent_at).getTime() - new Date(b.sent_at).getTime(),
    );
  }
  onMessageSubmit() {
    if (!this.messageForm.value.text) return;
    if (this.roomType() === 'group') {
      const message = {
        group_id: parseInt(this.route.snapshot.params['id'].split('-')[1]),
        sender_id: this.user()?.id || 0, // provide a default value
        content: this.messageForm.value.text || '',
      };
      this.chatService.postGroupMessage(message).subscribe((response) => {
        console.log(response);
        this.getGroupMessages();
      });
    }
    if (this.roomType() === 'private') {
      const message = {
        sender_id: this.user()?.id || 0,
        receiver_id: parseInt(this.route.snapshot.params['id'].split('-')[1]),
        content: this.messageForm.value.text || '',
      };
      this.chatService.postPrivateMessage(message).subscribe((response) => {
        console.log(response);
        this.getPrivateMessagesByUsers();
      });
    }
    this.messageForm.reset();
  }
}
