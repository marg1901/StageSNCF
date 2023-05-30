import { Selector } from '@ngxs/store';
import { CupStateModel } from './cup.model';

export class CupSelector {
  @Selector([CupStateModel])
  static getCup(state: CupStateModel) {
    return state.model.cups;
  }

  // @Selector([CupStateModel])
  // static getLoad(state: CupStateModel) {
  //   return state.model.loading;
  // }
}
