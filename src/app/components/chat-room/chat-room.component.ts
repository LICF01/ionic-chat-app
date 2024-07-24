import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IonChip,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { GroupMessage, PrivateMessage } from 'src/app/types/message';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
  imports: [IonContent, IonList, IonItem, IonLabel, IonChip],
  standalone: true,
})
export class ChatRoomComponent implements OnInit {
  messages = signal<GroupMessage[]>([]);
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
          this.messages.set(response);
        });
      } else if (type === 'user') {
        // this.chatService.getPrivateMessagesByUsers()
      }
    });
  }
}
