import { Component, Input } from '@angular/core';
import * as _ from 'lodash';
import * as Identicon from 'identicon.js';
import * as moment from 'moment';
import * as md5 from 'blueimp-md5';

interface Message {
  from: string;
  when: Date | string;
  message: string;
  icon?: string;
}

@Component({
  selector: 'ds-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  @Input() messages: Message[];

  constructor() {
    _.forEach(this.messages, (message: Message) => {
      const hash = md5(message.from);
      const data = new Identicon(hash).toString();
      message.icon = `data:image/png;base64,${data}`;
      message.when = moment(message.when).calendar();
    });
  }
}
