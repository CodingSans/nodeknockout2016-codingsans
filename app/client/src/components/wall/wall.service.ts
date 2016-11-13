import { Injectable, Inject }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export interface Channel {
  id?: string;
  name?: string;
  icon?: string;
}

export interface ChannelParams {
  name?: string;
}

@Injectable()
export class ChannelService {
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
}
