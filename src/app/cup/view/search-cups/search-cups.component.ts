import { Component, OnInit } from '@angular/core';
import { Cup } from '../../../model/cup.model';
import { CupService } from 'src/app/service/cup.service';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngxs/store';
import { CupAction } from '../../../store/cup/cup.action';

@Component({
  selector: 'app-search-cups',
  templateUrl: './search-cups.component.html',
  styleUrls: ['./search-cups.component.scss'],
})
export class SearchCupsComponent implements OnInit {
  cups: Cup[];

  loading: boolean = false;

  isButtonDisable = false;

  constructor(
    private cupService: CupService,
    private japelleCommeJeVeux: ToastrService,
    private store: Store
  ) {
    this.cups = [];
  }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.cupService.readCups().subscribe({
      next: (cups) => {
        (this.cups = cups), (this.loading = false);
      },
      error: (err) => console.error(err),
    });
  }

  dataEmitFromChild(cup: Cup): void {
    console.log(cup);

    if (this.isButtonDisable) {
      return;
    }

    this.isButtonDisable = true;

    this.cupService.deleteCup(cup.id).subscribe({
      next: () => {
        this.load();
        this.japelleCommeJeVeux.success('OK');
        this.isButtonDisable = false;
      },
      error: () => {
        this.japelleCommeJeVeux.error('NO');
      },
    });
  }
}
