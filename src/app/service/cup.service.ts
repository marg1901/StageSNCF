import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cup } from '../model/cup.model';
import { HttpClient } from '@angular/common/http';
import { NewCup } from '../model/newCup.model';

@Injectable({
  providedIn: 'root',
})
export class CupService {
  constructor(private client: HttpClient) {}

  cups: Cup[] = [];

  createCup(cup: NewCup): Observable<void> {
    return this.client.post<void>('http://localhost:3000/cups', cup);
  }

  readCups(): Observable<Cup[]> {
    return this.client.get<Cup[]>('http://localhost:3000/cups');
  }

  deleteCup(id: string): Observable<void> {
    return this.client.delete<void>('http://localhost:3000/cups/' + id);
  }
}
