import { Component, ViewChild, ElementRef, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Channel, ChannelService, Message } from '../wall/wall.service';
import * as _ from 'lodash';

@Component({
  selector: 'ds-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @ViewChild('mapElement') mapElement: ElementRef;
  private messages: Message[];
  private channelName: string;

  constructor(
    @Inject(ChannelService) private channelService: ChannelService,
    @Inject(ActivatedRoute) private route: ActivatedRoute,
    @Inject(Router) private router: Router
  ) {}

  ngOnInit() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 4,
      center: { lat: 47.5, lng: 19 },
    });

    this.router.routerState.parent(this.route)
      .params.subscribe(params => {
        if (params.name) {
          this.channelName = params.name;
          this.channelService.getMessagesForChannel(this.channelName).subscribe(ret => {
            var bounds = new google.maps.LatLngBounds();
            this.messages = _.map(ret.data, (message: Message) => {
              if (message.latitude && message.longitude) {
                message.position = { lat: message.latitude, lng: message.longitude };
                bounds.extend(message.position);
                message.marker = new google.maps.Marker({
                  position: message.position,
                  map: this.map,
                });
              }
              return message;
            });
            this.map.fitBounds(bounds);
          });
        }
      });
  }
}
