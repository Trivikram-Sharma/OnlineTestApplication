import { Injectable } from '@angular/core';
import test_questions from '../../assets/json/test_questions.json'
import test_answers from '../../assets/json/test_answers.json'
import { Result } from '../components/quiz/quiz.component';


export interface Choice{
  choice_label: string,
  choice_text: string
}

export interface Question{
  id: number,
  questionText: string,
  type: string,
  options: Choice[]
}

export interface Answer{
  question_id: number,
  type: string,
  answers: Choice[]
}

@Injectable({
  providedIn: 'root'
})
export class OnlinetestService {

  constructor() { }
  test:Question[] = test_questions;
  answers: Answer[] = test_answers;

  results:Result[] = [];
  
  updateResult(results:Result[]){
    this.results = results;
  }

  getResults(){
    return this.results;
  }
}
