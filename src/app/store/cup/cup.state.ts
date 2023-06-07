// Les ‘reducers’ ne sont que des fonctions n‘ayant qu’un seul rôle. Grâce à une action qu’ils reçoivent, les ‘reducers’ retournent le nouvel état du ‘Store’.

import { State, StateContext } from '@ngxs/store';
import { CupService } from 'src/app/service/cup.service';
import { CupStateModel, defaultCupState } from './cup.model';
import { Action } from '@ngxs/store';
import { CupAction } from './cup.action';
import { NewCup } from 'src/app/model/newCup.model';
import { Observable, catchError, switchMap, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Cup } from 'src/app/model/cup.model';
import { state } from '@angular/animations';

@Injectable()
@State<CupStateModel>({
  name: 'cup',
  defaults: defaultCupState,
})
export class CupState {
  constructor(private cupService: CupService) {}

  // CREATE
  @Action(CupAction.Create)
  createCup(
    { dispatch, patchState }: StateContext<CupStateModel>,
    payload: CupAction.Create
  ) {
    patchState({
      model: {
        data: payload.data,
        loading: true,
      },
    });

    return this.cupService
      .createCup(payload.data)
      .pipe(tap(() => dispatch(new CupAction.CreateSuccess(payload.data))))
      .pipe(
        catchError((err) => {
          dispatch(new CupAction.CreateFailure(err));
          throw err;
        })
      );
  }

  @Action(CupAction.CreateSuccess)
  createCupSuccess(
    { dispatch, patchState }: StateContext<CupStateModel>,
    payload: CupAction.CreateSuccess
  ) {
    patchState({
      model: { data: payload.data, loading: false },
    });
  }

  @Action(CupAction.CreateFailure)
  createCupFailure(
    { dispatch, patchState }: StateContext<CupStateModel>,
    payload: CupAction.CreateFailure
  ) {
    patchState({
      model: { loading: false },
    });
  }

  // DELETE

  @Action(CupAction.Delete)
  deleteCup(
    { dispatch, patchState }: StateContext<CupStateModel>,
    payload: CupAction.Delete
  ) {
    patchState({
      delete: { id: payload.id, loading: true },
    });
    return this.cupService
      .deleteCup(payload.id)
      .pipe(tap(() => dispatch(new CupAction.DeleteSuccess(payload.id))))
      .pipe(
        catchError((err) => {
          dispatch(new CupAction.DeleteFailure(err));
          throw err;
        })
      );
  }

  @Action(CupAction.DeleteSuccess)
  deleteCupSuccess(
    { dispatch, patchState }: StateContext<CupStateModel>,
    payload: CupAction.DeleteSuccess
  ) {
    patchState({
      delete: { id: payload.id, loading: false },
    });
  }

  @Action(CupAction.DeleteFailure)
  deleteCupFailure(
    { dispatch, patchState }: StateContext<CupStateModel>,
    payload: CupAction.DeleteFailure
  ) {
    patchState({
      delete: { loading: false },
    });
  }

  //READ

  @Action(CupAction.Read)
  readCup(
    { dispatch, patchState, getState }: StateContext<CupStateModel>,
    payload: CupAction.Read
  ) {
    const state = getState();

    patchState({
      grid: {
        ...state.grid,
        page: [],
        loading: true,
      },
    });

    return this.cupService
      .paginateCups(state.grid.query)
      .pipe(
        switchMap((response) => dispatch(new CupAction.ReadSuccess(response)))
      )
      .pipe(
        catchError((err) => {
          dispatch(new CupAction.ReadFailure(err));
          throw err;
        })
      );
  }

  @Action(CupAction.ReadSuccess)
  readCupSuccess(
    { dispatch, patchState, getState }: StateContext<CupStateModel>,
    payload: CupAction.ReadSuccess
  ) {
    const state = getState();
    const total = parseInt(payload.data.headers.get('X-Total-Count') ?? '0');

    patchState({
      grid: {
        ...state.grid,
        err: null,
        loading: false,
        page: payload.data.body ?? [],
        total: total,
      },
    });
  }

  @Action(CupAction.ReadFailure)
  readCupFailure(
    { dispatch, patchState, getState }: StateContext<CupStateModel>,
    payload: CupAction.ReadFailure
  ) {
    const state = getState();

    patchState({
      grid: {
        ...state.grid,
        err: payload.err,
        loading: false,
        page: [],
        total: 0,
      },
    });
  }

  //PAGINATION

  @Action(CupAction.PaginateGrid)
  paginateGrid(
    { dispatch, getState, patchState }: StateContext<CupStateModel>,
    payload: CupAction.PaginateGrid
  ) {
    const state = getState();

    patchState({
      grid: {
        ...state.grid,
        query: {
          ...state.grid.query,
          page: payload.page,
          size: payload.size,
        },
      },
    });

    return dispatch(new CupAction.Read());
  }
  //TRI

  @Action(CupAction.SortGrid)
  sortGrid(
    { dispatch, getState, patchState }: StateContext<CupStateModel>,
    payload: CupAction.SortGrid
  ) {
    const state = getState();

    patchState({
      grid: {
        ...state.grid,
        query: {
          ...state.grid.query,
          sort: payload.name,
          order: payload.order,
        },
      },
    });

    dispatch(new CupAction.Read());
  }
}
