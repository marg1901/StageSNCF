// composant utilisant l'état de l'application souscrit au store via des "selectors".

import { Selector } from '@ngxs/store';
import { CupStateModel } from './cup.model';
import { CupState } from './cup.state';
import { Cup } from 'src/app/model/cup.model';
import { Page } from 'src/app/model/page';

export class CupSelector {
  @Selector([CupState])
  static getCup(state: CupStateModel) {
    return state.model.data;
  }

  @Selector([CupState])
  static getCreateLoading(state: CupStateModel) {
    return state.model.loading;
  }

  @Selector([CupState])
  static getDelete(state: CupStateModel) {
    return state.delete.id;
  }

  // GRID

  @Selector([CupState])
  static getGridErr(state: CupStateModel): any {
    return state.grid.err;
  }

  @Selector([CupState])
  static getGridLoading(state: CupStateModel): boolean {
    return state.grid.loading;
  }

  @Selector([CupState])
  static getGridPage(state: CupStateModel): Cup[] {
    return state.grid.page;
  }

  @Selector([CupState])
  static getGridPageCount(state: CupStateModel): number {
    const pageSize = state.grid.query.size ?? 0;
    const total = state.grid.total || 1;

    if (total <= pageSize) {
      return 1;
    }
    return Math.floor(total / pageSize) + 1;
  }

  @Selector([CupState])
  static getGridPageSize(state: CupStateModel): number {
    return state.grid.query.size ?? 0;
  }

  @Selector([CupState])
  static getGridTotal(state: CupStateModel): number {
    return state.grid.total;
  }
}
