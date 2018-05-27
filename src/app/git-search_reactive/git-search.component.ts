import { Component, OnInit } from '@angular/core';
import { GitSearchService } from "../git-search.service"
import { GitSearch } from "../git-search"
import { ActivatedRoute, Router, ParamMap} from "@angular/router"
import { AdvancedSearchModel } from "../advanced-search-model"

import { FormGroup, FormControl,Validators} from "@angular/forms"

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

  form: FormGroup;
  formControls={};

  constructor(private GitSearchService: GitSearchService, private route: ActivatedRoute, private router:Router) {
    this.modelKeys.forEach((elem)=>{
      let validators=[];
      if(elem==='q'){
        validators.push(Validators.required)
      }
      if(elem==='stars'){
        validators.push(Validators.maxLength(4));
      }
      validators.push(this.noSpecialChars)
      this.formControls[elem]=new FormControl(this.model[elem],validators);  
    });
    this.form=new FormGroup(this.formControls);
  }
  model=new AdvancedSearchModel("","","",null,null,"");
  modelKeys= Object.keys(this.model);

  noSpecialChars(c: FormControl) {
    let REGEXP = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/);

    return REGEXP.test(c.value) ? {
        validateEmail: {
        valid: false
        }
    } : null;
  }

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
    this.GitSearchService.gitSearch(this.searchQuery).subscribe(
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
    //this.router.navigate(["/search/"+ this.searchQuery])
    let search:string=this.form.value["q"];  //this.model.q;
    let params:string ="";
    this.modelKeys.forEach((elem)=>{
      if(elem=="q"){
        return false;
      }
      if(this.form.value[elem]){
        params+="+"+ elem +":"+this.form.value[elem];
      }
      this.searchQuery=search;
      if(params !==""){
        this.searchQuery +=params;
      }
      this.displayQuery=this.searchQuery;
      this.gitSearch(); 
    })

  };

}
