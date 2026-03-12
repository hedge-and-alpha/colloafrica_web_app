import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() { }

  createSlugFromText(text: string) {
    return text.toLowerCase().split(' ').join('-');
  }

  createTextFromSlug(text: string) {
    return text.split('-').join(' ');
  }

  capitalizeFirstLetterOfWord(text: string) {
    return text[0].toUpperCase() + text.slice(1);
  }

  // transformDate(date: Date | string) {
  //   let isoDate = new Date(date).toISOString();
  //   return isoDate.slice(0, isoDate.indexOf('T'));
  // }
  transformDate(date: Date | string): string {
    const localDate = new Date(date);

    // Extract year, month, and day components
    const year = localDate.getFullYear();
    const month = ('0' + (localDate.getMonth() + 1)).slice(-2); // Months are 0-based
    const day = ('0' + localDate.getDate()).slice(-2);

    // Return in YYYY-MM-DD format
    return `${year}-${month}-${day}`;
  }

  private isValidDate(dateString: string | number | Date) {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  }

  convertLocalDateToISOString(localDate: Date | string | number) {
    if (!this.isValidDate(localDate)) {
      throw new Error('Date must be a valid date');
    }

    localDate = new Date(localDate);

    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, '0');
    const day = String(localDate.getDate()).padStart(2, '0');
    const hours = String(localDate.getHours()).padStart(2, '0');
    const minutes = String(localDate.getMinutes()).padStart(2, '0');
    const seconds = String(localDate.getSeconds()).padStart(2, '0');

    const localISOString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    return localISOString;
  }

  toISODate(date: Date | string | number) {
    return this.convertLocalDateToISOString(date).split('T')[0];
  }

  formatDate(inputDate: string): string {
    const date = new Date(inputDate);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
