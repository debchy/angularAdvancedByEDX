import { Injectable } from '@angular/core';
import { UnifiedSearch} from "./unified-search";
import { GitSearchService} from "./git-search.service";
import { GitCodeSearchService} from "./git-code-search.service";
import { GitSearch} from "./git-search";
import { GitCodeSearch} from "./git-code-search"
import { Observable} from "rxjs/Observable";
import "rxjs/add/observable/forkJoin";
import "rxjs/add/operator/map"
// import "rxjs/add/observable/combineLatest"
// import "rxjs/add/observable/concat"

@Injectable()
export class UnifiedSearchService {

  constructor(private searchService:GitSearchService, private codeService:GitCodeSearchService) { }

  unifiedSearch:Function=(query:string) : Observable<UnifiedSearch> =>{
    return Observable.forkJoin(this.searchService.gitSearch(query),this.codeService.codeSearch(query))
    .map((response: [GitSearch,GitCodeSearch])=>{
      return {
        "repositories": response[0],
        "code": response[1]
      }
    })
  }
}
