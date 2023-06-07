import { Pageable } from '../pageable';

export interface PaginateCups extends Pageable {
  cup?: string[];
}
