import { Component, Input, Inject } from '@angular/core';
import * as _ from 'lodash';
import * as Identicon from 'identicon.js';
import * as moment from 'moment';
import * as md5 from 'blueimp-md5';

import { Channel, ChannelService } from '../wall/wall.service';

interface Message {
  from: string;
  when: Date | string;
  message: string;
  icon?: string;
}

@Component({
  selector: 'ds-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChannelService],
})
export class ChatComponent {
  @Input() channel: Channel;
  @Input() messages: Message[];

  constructor(
    @Inject(ChannelService) private channelService: ChannelService
  ) {
    _.forEach(this.messages, (message: Message) => {
      const hash = md5(message.from);
      const data = new Identicon(hash).toString();
      message.icon = `data:image/png;base64,${data}`;
      message.when = moment(message.when).calendar();
    });
  }

  onKeyEvent(event) {
    if (event.keyCode === 13) {
      const message = (<HTMLInputElement>event.target).value;
      this.channelService.postMessageToChannel(this.channel.name, message).subscribe((message) => {
        debugger;
      });
    }
  }
}
