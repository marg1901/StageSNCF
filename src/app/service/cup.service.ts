import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cup } from '../model/cup.model';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { NewCup } from '../model/newCup.model';
import { Page } from '../model/page';
import { PaginateCups } from '../model/cup/paginate-cups';
import { Pageable } from '../model/pageable';

@Injectable({
  providedIn: 'root',
})
export class CupService {
  constructor(private client: HttpClient) {}

  URL: string = 'http://localhost:3000/cups';
  cups: Cup[] = [];

  createCup(cup: NewCup): Observable<void> {
    return this.client.post<void>('http://localhost:3000/cups', cup);
  }

  readCups(): Observable<Cup[]> {
    return this.client.get<Cup[]>(this.URL);
  }

  deleteCup(id: string): Observable<void> {
    return this.client.delete<void>('http://localhost:3000/cups/' + id);
  }

  paginateCups(query: Pageable): Observable<HttpResponse<Cup[]>> {
    const params = new HttpParams({
      fromObject: {
        page: query.page ?? 0,
        limit: query.size ?? 0,
        sort: query.sort ?? '',
        order: query.order ?? '',
      },
    });
    return this.client.get<Cup[]>(this.URL, { params, observe: 'response' });
  }
}
