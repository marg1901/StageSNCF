import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
})
export class BadgeComponent {
  @Input()
  color: string = 'WHITE';

  getClass(): string {
    if (this.color === 'VERT') {
      return 'badge--vert';
    } else if (this.color === 'BLEU') {
      return 'badge--bleu';
    } else if (this.color === 'ROUGE') {
      return 'badge--rouge';
    } else {
      return '';
    }
  }
}
