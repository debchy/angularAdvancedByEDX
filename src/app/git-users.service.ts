import { Injectable, Inject } from '@angular/core';
import { GitUsers } from "./git-users";
import { HttpClient } from '@angular/common/http';
import "rxjs/add/operator/toPromise"

@Injectable()
export class GitUsersService {
  cachedValues: Array<{[query:string]:GitUsers}>=[];

  constructor(private HttpClient: HttpClient) {

   }
   
   getUser=(query: string):Promise<GitUsers> =>{
      let promise=new Promise<GitUsers>((resolve,reject)=>{
        if(this.cachedValues[query]){
          resolve(this.cachedValues[query]) ;
        }else{
          this.HttpClient.get("https://api.github.com/search/users?q="+ query)
          .toPromise()
          .then(
            (response)=>{
              resolve(response as GitUsers); 
            },
            (error)=>{
              resolve(error);
            }            
          );
        }

      });
      return promise;
   }
}
