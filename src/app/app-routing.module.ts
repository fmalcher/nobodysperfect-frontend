import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerComponent } from './player/player.component';


const routes: Routes = [
  { path: '', redirectTo: 'player', pathMatch: 'full' },
  {
    path: 'player',
    component: PlayerComponent,
    children: [
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
