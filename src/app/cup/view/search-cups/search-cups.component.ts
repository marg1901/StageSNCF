import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Cup } from '../../../model/cup.model';
import { CupService } from 'src/app/service/cup.service';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngxs/store';
import { CupAction } from '../../../store/cup/cup.action';
import { CupSelector } from 'src/app/store/cup/cup.selectors';
import { WcsGridColumnSortChangeEventDetails } from 'wcs-core';

@Component({
  selector: 'app-search-cups',
  templateUrl: './search-cups.component.html',
  styleUrls: ['./search-cups.component.scss'],
})
export class SearchCupsComponent implements OnInit {
  count: number = 0;
  cups: Cup[] = [];
  loading: boolean = false;
  size: number = 0;
  total: number = 0;

  isButtonDisable = false;

  constructor(private toastr: ToastrService, private store: Store) {
    // select err
    this.store.select(CupSelector.getGridErr).subscribe((error) => {
      if (error != null) {
        this.toastr.error('Erreur lors du chargement des données du tableau');
      }
    });

    // select loading
    this.store
      .select(CupSelector.getGridLoading)
      .subscribe((value) => (this.loading = value));

    // select page
    this.store
      .select(CupSelector.getGridPage)
      .subscribe((value) => (this.cups = value));

    // select page count
    this.store
      .select(CupSelector.getGridPageCount)
      .subscribe((value) => (this.count = value));

    // select page size
    this.store
      .select(CupSelector.getGridPageSize)
      .subscribe((value) => (this.size = value));

    // select total
    this.store
      .select(CupSelector.getGridTotal)
      .subscribe((value) => (this.total = value));
  }

  gridPaginationChange(event: any): void {
    this.store.dispatch(
      new CupAction.PaginateGrid(
        event.detail.pagination.currentPage + 1, // la premiere page mockoon = 1. Mais attention, sur Spring, premiere page = 0
        event.detail.pagination.pageSize
      )
    );
  }

  gridSort(event: any): void {
    const property = event.detail.column.path ?? event.detail.column.id;
    const sort = event.detail.order;

    if (sort !== 'none') {
      this.store.dispatch(new CupAction.SortGrid(property, sort));
    }
  }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.store.dispatch(new CupAction.Read());
  }

  dataEmitFromChild(cup: Cup): void {
    if (this.isButtonDisable) {
      return;
    }

    this.isButtonDisable = true;
    this.store.dispatch(new CupAction.Delete(cup.id)).subscribe({
      next: () => {
        this.load();
        this.toastr.success('OK');
        this.isButtonDisable = false;
      },
      error: () => {
        this.toastr.error('NO');
      },
    });
  }
}
