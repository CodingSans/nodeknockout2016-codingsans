import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'ds-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @ViewChild('mapElement') mapElement: ElementRef;

  ngOnInit() {
    var hungary = {lat: 47.497832, lng: 19.045497};
    var map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 4,
      center: hungary
    });
    var marker = new google.maps.Marker({
      position: hungary,
      map: map
    });
  }
}
