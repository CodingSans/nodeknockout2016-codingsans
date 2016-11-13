import { Component } from '@angular/core';
import * as _ from 'lodash';
import * as Identicon from 'identicon.js';

interface Channel {
  id?: string;
  name?: string;
  icon?: string;
}

interface ChannelParams {
  name?: string;
}

@Component({
  selector: 'ds-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent {
  private currentChannel: Channel = {};
  private channels: Channel[] = [{
    id: '1',
    name: 'Topito',
  }, {
    id: '2',
    name: 'Kekito',
  }, {
    id: '3',
    name: 'Burrito',
  }];

  constructor() {
    // TODO add MD5, close navi on menu click
    _.forEach(this.channels, (channel: Channel) => {
      const data = new Identicon().toString();
      channel.icon = `data:image/png;base64,${data}`;
    });

    this.currentChannel = this.channels[0];
  }
}
