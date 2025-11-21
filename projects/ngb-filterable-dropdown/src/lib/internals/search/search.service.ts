import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  debounceSearch<T>(source: Observable<T>, time: number = 300): Observable<T> {
    return source.pipe(debounceTime(time));
  }
}

