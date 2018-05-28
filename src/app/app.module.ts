import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from "@angular/forms"
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { GitSearchService } from "./git-search.service"
import { GitUsersService} from "./git-users.service";
import { GitCodeSearchService} from "./git-code-search.service";
import { UnifiedSearchService} from "./unified-search.service";
import { GitSearchComponent } from './git-search/git-search.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule, Routes} from "@angular/router";
import { NoSpecialCharactersDirective } from './no-special-characters.directive';
import { RepositoryDisplayComponent } from './repository-display/repository-display.component';
import { CodeDisplayComponent } from './code-display/code-display.component'

const appRoutes: Routes=[
  {path:'', component:HomePageComponent},
  {path:'search', redirectTo:"/search/angular" , pathMatch:'full' },
  {path:'search/:query', component:GitSearchComponent, data:{title: 'Git Search'}},
  {path:"**", component: NotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    GitSearchComponent,
    HomePageComponent,
    NotFoundComponent,
    NoSpecialCharactersDirective,
    RepositoryDisplayComponent,
    CodeDisplayComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [GitSearchService,GitUsersService,GitCodeSearchService, UnifiedSearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
