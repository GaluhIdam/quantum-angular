import { Injectable } from '@angular/core';
import { FilterAplliedDTO } from '../../../../shared/filter-applied/filter-apllied.dto';

@Injectable({
  providedIn: 'root',
})
export class MyMatterService {
  constructor() {}

  /** Data Filter My Matter */
  dataFilterMyMatter(): FilterAplliedDTO[] {
    return [
      {
        name: 'Client Project',
        status: true,
      },
      {
        name: 'Matter Number',
        status: true,
      },
      {
        name: 'Project Name',
        status: true,
      },
      {
        name: 'Matter Description',
        status: true,
      },
      {
        name: 'Matter Category',
        status: true,
      },
      {
        name: 'Practice Area',
        status: true,
      },
      {
        name: 'Practice Group',
        status: true,
      },
      {
        name: 'Matter Type',
        status: true,
      },
      {
        name: 'Fee Structure',
        status: true,
      },
      {
        name: 'Matter PIC',
        status: true,
      },
      {
        name: 'Matter Members',
        status: true,
      },
      {
        name: 'Unbilled Amount',
        status: true,
      },
      {
        name: 'Completion Date',
        status: true,
      },
      {
        name: 'Creation Date',
        status: true,
      },
    ];
  }
}
