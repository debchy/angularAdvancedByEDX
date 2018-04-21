import { Component } from '@angular/core';
//import {  GitSearchService } from "./git-search.service"
import {  GitUsersService} from "./git-users.service"
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[GitUsersService]
})
export class AppComponent implements OnInit { 
  
  constructor(  private GitUsersService: GitUsersService){
    
  }
  ngOnInit(){
    

    // this.GitUsersService.getUser("debchy").then(
    //   (response)=>{
    //     alert("Total User found: "+ response.total_count);
    //   },
    //   (error)=>{
    //     alert("Error= "+ error.statusText);
    //   }
    // );
  }  
  title = 'My First App';
}
