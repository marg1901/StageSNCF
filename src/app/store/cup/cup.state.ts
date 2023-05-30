import { State, StateContext } from '@ngxs/store';
import { CupService } from 'src/app/service/cup.service';
import { CupStateModel } from './cup.model';
import { Action } from '@ngxs/store';
import { CupAction } from './cup.action';
import { NewCup } from 'src/app/model/newCup.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
@State<CupStateModel>({
  name: 'cup',
})
export class CupState {
  constructor(private cupService: CupService) {}

  @Action(CupAction.Create)
  createCup(
    { dispatch, patchState }: StateContext<CupStateModel>,
    payload: CupAction.Create
  ) {
    patchState({});
    this.cupService.createCup(payload.data).subscribe({
      next: () => dispatch(new CupAction.CreateSuccess()),
      error: (err: any) => dispatch(new CupAction.CreateFailure(err)),
    });
  }
}
