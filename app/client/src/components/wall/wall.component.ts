import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as _ from 'lodash';
import * as Identicon from 'identicon.js';
import * as md5 from 'blueimp-md5';

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
export class WallComponent implements OnInit {
  @ViewChild('sideMenu') sideMenu: ElementRef;

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

  @ViewChild('myDialog') myDialog: ElementRef;

  constructor(
    @Inject(ActivatedRoute) private route: ActivatedRoute,
    @Inject(Router) private router: Router
  ) {
    _.forEach(this.channels, (channel: Channel) => {
      const hash = md5(channel.name);
      const data = new Identicon(hash).toString();
      channel.icon = `data:image/png;base64,${data}`;
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: ChannelParams) => {
      if (params.name) {
        const channel = _.find(this.channels, (channel: Channel) => {
          return (params.name === channel.name);
        });
        if (!channel) {
          return this.router.navigate(['/wall']);
        }

        this.currentChannel = channel;
      } else {
        return this.router.navigate(['/wall', this.channels[0].name]);
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

  openDialog() {
    this.closeSideMenu();
    if (this.myDialog.nativeElement.showModal) {
      this.myDialog.nativeElement.showModal();
    } else {
      console.log('Browser not supported for dialog.');
    }
  }

  closeDialog() {
    this.myDialog.nativeElement.close();
  }
}
