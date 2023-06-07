import { Component, OnInit } from '@angular/core';
import { Cup } from 'src/app/model/cup.model';
import { CupService } from 'src/app/service/cup.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  cups: Cup[];

  constructor(private cupService: CupService) {
    this.cups = [];
  }
  ngOnInit(): void {
    this.loadCups();
  }

  loadCups() {
    this.cupService.readCups().subscribe({
      next: (cups) => {
        this.cups = cups;
      },
    });
  }

  countGreen(): number {
    return this.cups.filter((e) => e.color === 'VERT').length;
  }

  countRed(): number {
    return this.cups.filter((e) => e.color === 'ROUGE').length;
  }

  countBlue(): number {
    return this.cups.filter((e) => e.color === 'BLEU').length;
  }

  countWhite(): number {
    return this.cups.filter((e) => e.color === 'BLANC').length;
  }

  sumCups(): number {
    return this.cups.length;
  }

  dataPagination(event: any): void {
    console.log(event);
    this.dataPagination = event;
  }
}
