import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  createSlugFromText(text: string) {
    return text.toLowerCase().split(' ').join('-');
  }

  createTextFromSlug(text: string) {
    return text.split('-').join(' ');
  }

  capitalizeFirstLetterOfWord(text: string) {
    return text[0].toUpperCase() + text.slice(1);
  }

  transformDate(date: Date | string) {
    let isoDate = new Date(date).toISOString();
    return isoDate.slice(0, isoDate.indexOf('T'));
  }
}
