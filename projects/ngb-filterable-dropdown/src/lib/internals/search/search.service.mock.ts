import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class MockSearchService {
  debounceSearch<T>(source: Observable<T>, _time: number = 300): Observable<T> {
    // Return the source observable without debouncing for tests
    return source;
  }
}

