import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.scss'],
})
export class IndicatorComponent implements OnInit {
  @Input() countCups: number = 0;
  @Input() totalCups: number = 0;
  @Input() colorCups: string = 'BLANC';

  ngOnInit(): void {}

  getPercent(): number {
    if (this.totalCups === 0) {
      return 0;
    } else {
      return Math.round((this.countCups * 100) / this.totalCups);
    }
  }

  getClassColor(): string {
    if (this.colorCups === 'VERT') {
      return 'indicator--vert';
    } else if (this.colorCups === 'BLEU') {
      return 'indicator--bleu';
    } else if (this.colorCups === 'ROUGE') {
      return 'indicator--rouge';
    } else {
      return '';
    }
  }
}
