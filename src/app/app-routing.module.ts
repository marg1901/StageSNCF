import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCupComponent } from './cup/view/create-cup/create-cup.component' 
import { SearchCupsComponent } from './cup/view/search-cups/search-cups.component';
import { HomeComponent } from './home/view/home/home.component';

const routes: Routes = [
  { path: 'create-cup', component: CreateCupComponent },
  { path: 'search-cup', component: SearchCupsComponent },
  { path: 'home', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
