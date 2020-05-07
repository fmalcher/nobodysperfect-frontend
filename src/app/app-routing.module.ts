import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerComponent } from './player/player.component';
import { ModeratorComponent } from './moderator/moderator.component';
import { ScorePageComponent } from './score-page/score-page.component';
import { InfoPageComponent } from './info-page/info-page.component';


const routes: Routes = [
  { path: '', redirectTo: 'player', pathMatch: 'full' },
  { path: 'player', component: PlayerComponent },
  { path: 'moderator/nbkHG87ivIghj8zuhjvihj', component: ModeratorComponent },
  { path: 'score', component: ScorePageComponent },
  { path: 'info', component: InfoPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
