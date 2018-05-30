import { Component, OnInit } from '@angular/core';
//import { GitSearchService } from "../git-search.service";
import { UnifiedSearchService } from "../unified-search.service";
//import { GitSearch } from "../git-search"
import { UnifiedSearch} from "../unified-search"
import { ActivatedRoute, Router, ParamMap} from "@angular/router"
import { AdvancedSearchModel } from "../advanced-search-model"

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
  searchResult: UnifiedSearch;
  searchQuery: string;
  displayQuery: string;
  favorites:Array<number>=[];

  constructor(private UnifiedSearchService: UnifiedSearchService, private route: ActivatedRoute, private router:Router) {
  }
  model=new AdvancedSearchModel("","","",null,null,"");
  modelKeys= Object.keys(this.model);

  ngOnInit() {
    
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
    this.UnifiedSearchService.unifiedSearch(this.searchQuery).subscribe(
      (response)=>
      {
        console.log(response);
        this.searchResult=response;
      },
      (error)=>{
        alert("Error= " +error.statusText);
      }
    );
  }
  checkType = (key) => {
    return typeof key === 'string' ? 'text' : typeof key;
  }

  handleFavorite=(id)=>{
    console.log('event received in parent component')
    return this.favorites.push(id);
  }

  sendQuery=(f)=>{
    console.log(f);
    this.searchResult=null;
    //this.router.navigate(["/search/"+ this.searchQuery])
    let search:string= this.model.q;
    let params:string ="";
    this.modelKeys.forEach((elem)=>{
      if(elem=="q"){
        return false;
      }
      if(this.model[elem]){
        params+="+"+ elem +":"+this.model[elem];
      }
    })
    this.searchQuery=search;
    if(params !==""){
      this.searchQuery +=params;
    }

    this.displayQuery=this.searchQuery;
    this.gitSearch(); 
  };

}
