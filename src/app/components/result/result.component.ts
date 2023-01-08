import { Component, OnInit } from '@angular/core';
import { OnlinetestService } from 'src/app/service/onlinetest.service';
import { Result } from '../quiz/quiz.component';
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(private testService:OnlinetestService) { }

  ngOnInit(): void {
  }
  questions = this.testService.test;
  results = this.testService.getResults();
  answers = this.testService.answers;
  current_question(id:any) {
  return this.questions.filter(q => q.id==id)[0];
  }
  current_result(qid:any){
     let results = this.results.filter( r => r.answer.question_id==qid);
     let options = results[0].answer.answers;
     return options;
  }
  corresponding_answer(qid:any){
    return this.answers.filter(a => a.question_id==qid)[0].answers;
  }
  checkAnswer(qid:any){
    let result =  this.results.filter(r => r.answer.question_id==qid)[0];
    return result.correct;
  }

  score = (this.results.filter( r => r.correct).length/this.questions.length);

}
