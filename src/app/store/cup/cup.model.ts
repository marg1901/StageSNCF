//REDUCER

import { Cup } from 'src/app/model/cup.model';
import { PaginateCups } from 'src/app/model/cup/paginate-cups';
import { NewCup } from 'src/app/model/newCup.model';
import { Page } from 'src/app/model/page';
import { Pageable } from 'src/app/model/pageable';

export interface CupStateModel {
  model: {
    data?: NewCup;
    loading: boolean;
  };

  delete: {
    loading: boolean;
    id?: string;
  };

  grid: {
    err: any; // erreur de chargement
    loading: boolean; // indicateur de chargement
    page: Cup[]; // cups pour une page
    query: Pageable; // requête de pagination
    total: number; // nombre total de cups
  };
}

export const defaultCupState: CupStateModel = {
  model: {
    loading: false,
  },

  delete: {
    loading: false,
  },

  grid: {
    err: null,

    page: [],

    total: 0,

    query: {
      page: 1,
      size: 5,
    },

    loading: false,
  },
};
