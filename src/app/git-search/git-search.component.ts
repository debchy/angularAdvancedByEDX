import { Component, OnInit } from '@angular/core';
import { GitSearchService } from "../git-search.service"
import { GitSearch } from "../git-search"
import { ActivatedRoute, Router, ParamMap} from "@angular/router"

@Component({
  selector: 'app-git-search',
  templateUrl: './git-search.component.html',
  styleUrls: ['./git-search.component.css']
  // template: `
  //   <p>
  //     git-search works!
  //   </p>`,
  // styles: ['p { background: red; }']
})
export class GitSearchComponent implements OnInit {
  title: string;
  searchResult: GitSearch;
  searchQuery: string;
  displayQuery: string;

  constructor(private GitSearchService: GitSearchService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    
    // this.GitSearchService.gitSearch(this.searchQuery).then(
    //   (response)=>
    //   {
    //     this.searchResult=response;
    //   },
    //   (error)=>{
    //     alert("Error= " +error.statusText);
    //   }
    // );

    this.route.data.subscribe(
      (result)=>{ 
        this.title=result.title;
      }
    );

    this.route.paramMap.subscribe(
      (result)=>{
        this.searchQuery=result.get("query");
        this.displayQuery=result.get("query");
        this.gitSearch();
      }
    );
  }

  gitSearch=()=>{
    this.GitSearchService.gitSearch(this.searchQuery).then(
      (response)=>
      {
        this.searchResult=response;
      },
      (error)=>{
        alert("Error= " +error.statusText);
      }
    );
  }

  sendQuery=()=>{
    this.searchResult=null;
    this.router.navigate(["/search/"+ this.searchQuery])
  };

}
