import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { ResultComponent } from './components/result/result.component';
import { OnlinetestService } from './service/onlinetest.service';

const routes: Routes = [
  {path:'api/quiz', component: QuizComponent},
  {path: 'api/result', component: ResultComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    QuizComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [OnlinetestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
