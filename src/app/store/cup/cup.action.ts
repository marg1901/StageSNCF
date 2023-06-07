import { HttpResponse } from '@angular/common/http';
import { Cup } from 'src/app/model/cup.model';
import { NewCup } from 'src/app/model/newCup.model';
import { Page } from 'src/app/model/page';

export namespace CupAction {
  // CREATE

  export class Create {
    static readonly type = '[Cup] Create';
    constructor(public data: NewCup) {}
  }

  export class CreateSuccess {
    static readonly type = '[Cup] Create Success';

    constructor(public data: NewCup) {}
  }

  export class CreateFailure {
    static readonly type = '[Cup] Create Failure';
    constructor(public err: any) {}
  }

  // DELETE

  export class Delete {
    static readonly type = '[Cup] Delete';

    constructor(public id: string) {}
  }

  export class DeleteSuccess {
    static readonly type = '[Cup] Delete Success';

    constructor(public id: string) {}
  }

  export class DeleteFailure {
    static readonly type = '[Cup] Delete Failure';

    constructor(public err: any) {}
  }

  //READ

  export class Read {
    static readonly type = '[Cup] Read';

    constructor() {}
  }

  export class ReadSuccess {
    static readonly type = '[Cup] Read Success';

    constructor(public data: HttpResponse<Cup[]>) {}
  }

  export class ReadFailure {
    static readonly type = '[Cup] Read Failure';

    constructor(public err: any) {}
  }

  //PAGINATION

  export class PaginateGrid {
    static readonly type = '[Cup] PaginateGrid';

    constructor(public page: number, public size: number) {}
  }

  //TRI

  export class SortGrid {
    static readonly type = '[Cup] SortGrid';

    constructor(public name: string, public order: string) {}
  }
}
