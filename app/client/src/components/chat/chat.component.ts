import { Component, Input, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as _ from 'lodash';
import * as Identicon from 'identicon.js';
import * as moment from 'moment';
import * as md5 from 'blueimp-md5';

import { Channel, ChannelService, Message } from '../wall/wall.service';

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
  private dstructTime: number = 5;
  private currentMessage: string = '';

  constructor(
    @Inject(ChannelService) private channelService: ChannelService,
    @Inject(ActivatedRoute) private route: ActivatedRoute,
    @Inject(Router) private router: Router
  ) {}

  ngOnInit() {
    this.router.routerState.parent(this.route)
      .params.subscribe(params => {
        if (params.name) {
          this.channelName = params.name;
          this.channelService.getMessagesForChannel(this.channelName).subscribe(ret => {
            this.messages = _.map(ret.data, message => {
              return this.formatMessage(message);
            });
          });
        }
      });
  }

  formatMessage(message) {
    const hash = md5(message.senderId);
    const data = new Identicon(hash).toString();
    message.icon = `data:image/png;base64,${data}`;
    message.when = moment(message.updatedAt).calendar();
    return message;
  }

  onKeyEvent(event, messageInput) {
    if (event.keyCode === 13) {
      this.send(messageInput);
    }
  }
  
  toggleDstructTime() {
    switch (this.dstructTime) {
      case 5:
        this.dstructTime = 10;
        break;
      case 10:
        this.dstructTime = 30;
        break;
      case 30:
        this.dstructTime = 5;
        break;
    }
  }

  send(messageInput) {
    this.getLocation().then((position) => {
      const message = messageInput.value;
      messageInput.value = '';
      const expiry = new Date(new Date().getTime() + this.dstructTime * 1000);
      this.channelService.postMessageToChannel(this.channelName, message, expiry, position).subscribe((message) => {
        this.messages.push(this.formatMessage(message.data[0]));
      });
    }).catch(() => {
      const message = messageInput.value;
      messageInput.value = '';
      const expiry = new Date(new Date().getTime() + this.dstructTime * 1000);
      this.channelService.postMessageToChannel(this.channelName, message, expiry).subscribe((message) => {
        this.messages.push(this.formatMessage(message.data[0]));
      });
    })
  }

  getLocation() {
    var timeoutVal = 10 * 1000 * 1000;
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve(position.coords);
        }, reject, { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 });
      } else {
        reject();
      }
    });
  }
}
