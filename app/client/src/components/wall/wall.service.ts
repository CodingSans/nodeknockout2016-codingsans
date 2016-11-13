import { Injectable, Inject }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export interface Channel {
  id?: string;
  name?: string;
  icon?: string;
  public?: boolean;
}

export interface ChannelParams {
  name?: string;
}

export interface Message {
  senderId: string;
  senderName: string;
  updatedAt?: Date;
  when?: Date | string;
  content: string;
  icon?: string;
  latitude?: number;
  longitude?: number;
  position?: any;
  marker?: any;
}

@Injectable()
export class ChannelService {
  public currentChannel: Channel;
  public messageSubject = new Subject();

  constructor (@Inject(Http) private http: Http) {}

  getPublicChannels() : Observable<any> {
    return this.http.get('/api/v2/channel')
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getMessagesForChannel(channelName: string) : Observable<any> {
    return this.http.get(`/api/v2/channel/${channelName}/message`)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  postMessageToChannel(channelName: string, message: string, expiry: Date, position?: any) {
    const body: any = {
      content: message,
      expireAt: expiry,
    };

    if (position) {
      body.latitude = position.latitude;
      body.longitude = position.longitude;
    }
    return this.http.post(`/api/v2/channel/${channelName}/message`, body)
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  addChannel(channelName) {
    return this.http.put(`/api/v2/channel/${channelName}`, {})
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
