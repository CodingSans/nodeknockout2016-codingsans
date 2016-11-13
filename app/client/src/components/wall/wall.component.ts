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
    this.channelService.getPublicChannels().subscribe((channels) => {
      this.channels = channels.data;
    });
    this.route.params.subscribe((params: ChannelParams) => {
      if (this.channels.length) {
        if (params.name) {
          const channel = _.find(this.channels, (channel: Channel) => {
            return (params.name === channel.name);
          });

          if (!channel) {
            return this.router.navigate(['/wall']);
          }

          _.forEach(this.channels, (channel: Channel) => {
            const hash = md5(channel.name);
            const data = new Identicon(hash).toString();
            channel.icon = `data:image/png;base64,${data}`;
          });

          this.currentChannel = channel;

          this.channelService.getMessagesForChannel(this.currentChannel.name).subscribe(messages => {
            this.messages = messages.data;
          });
        } else {
          return this.router.navigate(['/wall', this.channels[0].name]);
        }
      }
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
