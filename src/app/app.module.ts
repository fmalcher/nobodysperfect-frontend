import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { PlayerIdleComponent } from './player-idle/player-idle.component';
import { PlayerGiveAnswerComponent } from './player-give-answer/player-give-answer.component';
import { PlayerWaitResultsComponent } from './player-wait-results/player-wait-results.component';
import { PlayerShowResultsFullComponent } from './player-show-results-full/player-show-results-full.component';
import { PlayerChooseAnswerComponent } from './player-choose-answer/player-choose-answer.component';
import { PlayerNameComponent } from './player-name/player-name.component';
import { ModeratorComponent } from './moderator/moderator.component';
import { ModeratorQuestionComponent } from './moderator-question/moderator-question.component';
import { ModeratorAnswersEditComponent } from './moderator-answers-edit/moderator-answers-edit.component';
import { ModeratorOwnAnswerComponent } from './moderator-own-answer/moderator-own-answer.component';
import { ScoreTableComponent } from './score-table/score-table.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    PlayerIdleComponent,
    PlayerGiveAnswerComponent,
    PlayerWaitResultsComponent,
    PlayerShowResultsFullComponent,
    PlayerChooseAnswerComponent,
    PlayerNameComponent,
    ModeratorComponent,
    ModeratorQuestionComponent,
    ModeratorAnswersEditComponent,
    ModeratorOwnAnswerComponent,
    ScoreTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
