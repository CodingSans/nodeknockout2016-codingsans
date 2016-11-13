import { Component, Input, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
export class ChatComponent implements OnInit {
  private channel: Channel;
  private messages: Message[];
  private channelName: string;

  constructor(
    @Inject(ChannelService) private channelService: ChannelService,
    @Inject(ActivatedRoute) private route: ActivatedRoute,
    @Inject(Router) private router: Router
  ) {
    // _.forEach(this.messages, (message: Message) => {
    //   const hash = md5(message.from);
    //   const data = new Identicon(hash).toString();
    //   message.icon = `data:image/png;base64,${data}`;
    //   message.when = moment(message.when).calendar();
    // });

  }

  ngOnInit() {
    this.router.routerState.parent(this.route)
      .params.subscribe(params => {
        if (params.name) {
          this.channelName = params.name;
          this.channelService.getMessagesForChannel(this.channelName).subscribe(ret => {
            this.messages = ret.data;
          });
        }
      });
  }

  onKeyEvent(event) {
    if (event.keyCode === 13) {
      const message = (<HTMLInputElement>event.target).value;
      this.channelService.postMessageToChannel(this.channelName, message).subscribe((message) => {
        this.messages.push(message.data[0]);
      });
    }
  }
}
