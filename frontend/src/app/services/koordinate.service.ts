import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class KoordinateService {

  private apiUrl = 'https://nominatim.openstreetmap.org/search';

  constructor(private http: HttpClient) { }

  koordinate(address: string): Observable<any> {
    const params = {
      q: address,
      format: 'json'
    };

    return this.http.get<any>(this.apiUrl, { params });
  }
}
