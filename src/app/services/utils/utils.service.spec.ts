import { TestBed } from '@angular/core/testing';

import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create slug from given text', () => {
    const text = 'I love utils service';
    const slug = 'i-love-utils-service';

    expect(service.createSlugFromText(text)).toEqual(slug);
  });

  it('should capitalize first letter of sentence or first word', () => {
    const text = 'love utils service';
    const capitalized = 'Love utils service';

    expect(service.capitalizeFirstLetterOfWord(text)).toEqual(capitalized);
    expect(service.capitalizeFirstLetterOfWord(text)).not.toEqual(
      'lOve utiLs serviCe'
    );
    expect(service.capitalizeFirstLetterOfWord('utils')).toEqual('Utils');
  });

  it('should create text from given slug', () => {
    const text = 'i love utils service';
    const slug = 'i-love-utils-service';

    expect(service.createTextFromSlug(slug)).toEqual(text);
  });
});
