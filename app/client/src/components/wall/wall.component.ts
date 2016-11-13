import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Channel, ChannelParams, ChannelService } from './wall.service';
import * as _ from 'lodash';
import * as Identicon from 'identicon.js';
import * as md5 from 'blueimp-md5';

@Component({
  selector: 'ds-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css'],
  providers: [ChannelService],
})
export class WallComponent implements OnInit {
  @ViewChild('sideMenu') sideMenu: ElementRef; 
  private currentChannel: Channel = {};
  private channels: Channel[] = [];
  private messages: any[] = [];

  constructor(
    @Inject(ActivatedRoute) private route: ActivatedRoute,
    @Inject(Router) private router: Router,
    @Inject(ChannelService) private channelService: ChannelService
  ) {}

  ngOnInit() {
    this.channelService.getPublicChannels().subscribe((ret) => {
      const channels = ret.data;

      this.route.params.forEach((params: ChannelParams) => {
        debugger;
        const channel = this.setupChannels(params, channels);

        this.currentChannel = channel;
        this.channelService.currentChannel = channel;
      });
    });
    
    this.route.params.subscribe((params: ChannelParams) => {
      if (this.channels.length) {
        debugger;
        if (params.name) {
          const channel = this.setupChannels(params, this.channels);

          this.currentChannel = channel;
          this.channelService.currentChannel = channel;
        } else {
          return this.router.navigate(['/wall', 'general', 'chat']);
        }
      }
    });
  }

  setupChannels(params, channels): any {
    let channelsExtend: Channel[] = _.concat([{ name: 'general', public: true }], channels);
    const channelName = params.name;
    let channel = this.getChannel(channelsExtend, channelName);
    if (!channel) {   
      channelsExtend = _.concat<Channel>(channelsExtend, [{ name: channelName, public: true }]);
    }
    channelsExtend = this.genIcons(channelsExtend);
    channel = this.getChannel(channelsExtend, channelName);
    this.channels = channelsExtend;

    return channel;
  }

  getChannel(channels, channelName) {
    return _.find(channels, (channel: Channel) => {
      return (channelName === channel.name);
    });
  }

  genIcons(channels) {
    return _.map(channels, (channel: Channel) => {
      const hash = md5(channel.name);
      const data = new Identicon(hash).toString();
      const channelObj = _.cloneDeep(channel);
      channelObj.icon = `data:image/png;base64,${data}`;
      return channelObj;
    });
  }

  closeSideMenu() {
    this.sideMenu.nativeElement.className = 'mdl-layout__drawer';
    const element = document.getElementsByClassName('mdl-layout__obfuscator')[0];
    if (element.classList.contains('is-visible')) {
      element.classList.remove('is-visible');
    }
  }
}
