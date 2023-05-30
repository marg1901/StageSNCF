import { NewCup } from 'src/app/model/newCup.model';

export namespace CupAction {
  export class Create {
    static readonly type = '[Cup] Ceate';
    constructor(public data: NewCup) {}
  }

  export class CreateSuccess {
    static readonly type = '[Cup] Create Success';
    constructor() {}
  }

  export class CreateFailure {
    static readonly type = '[Cup] Create Failure';
    constructor(public err: any) {}
  }

  export class Loader {
    static readonly type = '[Cup] Refresh';
    constructor() {}
  }
}
