export class Page implements IPage {
  size = 0;
  totalElements = 0;
  totalPages = 0;
  pageNumber = 0;
}
export interface IPage {
  size: number;
  totalElements: number;
  totalPages: number;
  pageNumber: number;
}

export class CorporateEmployee {
  name: string;
  gender: string;
  company: string;
  age: number;

  constructor(name: string, gender: string, company: string, age: number) {
    this.name = name;
    this.gender = gender;
    this.company = company;
    this.age = age;
  }
}

export class PagedData<T> {
  data = new Array<T>();
  page = new Page();
}
