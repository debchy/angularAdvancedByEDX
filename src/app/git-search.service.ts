import { Injectable, Inject } from '@angular/core';
import { GitSearch } from './git-search';
import { HttpClient } from '@angular/common/http';
//import "rxjs/add/operator/toPromise";
import { Observable} from "rxjs/Observable";
import "rxjs/add/operator/publishReplay";
import "rxjs/add/operator/map"

@Injectable()
export class GitSearchService {
  cachedValues: string; //Array<{[query:string]:GitSearch}>=[];
  private search: Observable<GitSearch>;
  constructor(private http:HttpClient) {

   }

  gitSearch= (query:string): Observable<GitSearch> =>{
    if(!this.search){
      this.search=this.http.get<GitSearch>('https://api.github.com/search/repositories?q=' + query)
      .publishReplay(1)
      .refCount();
      
      this.cachedValues=query;
    }
    else if(this.cachedValues!==query){
      this.search=null;
      this.gitSearch(query)
    }
    return this.search;
  }
}
