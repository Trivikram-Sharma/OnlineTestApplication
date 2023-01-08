import { Component, OnInit } from '@angular/core';
import { OnlinetestService,Answer,Choice } from 'src/app/service/onlinetest.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
export interface Result{
  answer:Answer,
  correct:boolean
}
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(private testService: OnlinetestService,private router:Router) {
   }

  ngOnInit(): void {
  }

  //all questions objects of test
  questions = this.testService.test;
  //all answer objects of test
  answers = this.testService.answers;
  //values, answers submitted in the form
  values = [];
  //results going to be displayed in the result section
  results:Result[] = [];


  populateResults(expected:Answer[],actual:any){
    for(let i=0;i<expected.length;i++){
      //declaring the present question's id, as variable at the beginning of loop, for reusability
      let current_question = expected[i].question_id;
      if(current_question==(i+1)){
        //validating single choice questions
        if(expected[i].type==="single choice"){
          //If the actual answers have a key i+1
          if(actual[current_question] && expected[i].answers.length==1){
              //checking if the answers match
              if(actual[current_question] == expected[i].answers[0].choice_label){
                let result:Result = {answer:expected[i],correct:true};
                this.results.push(result);
              }
              else{
                ///Retrieving the given wrong answer
                let wrong_choice:Choice[] = this.questions[i].options.filter(option => option.choice_label == actual[current_question]);
                let result:Result = {
                  answer:{
                    question_id:current_question,
                    type:expected[i].type,
                    answers:wrong_choice
                  },
                  correct:false
                }
                this.results.push(result);
              }
          }
        }
        //validating multiple choice questions
        if(expected[i].type == "Multiple choice"){
          //construct the keys to be searched in the given answers(in the actual 4a,4b,4c,4d etc.)//not used
          let keys = [];
          let correct_options = [];
          for(let j=0;j<expected[i].answers.length;j++){
              keys.push(current_question+expected[i].answers[j].choice_label);
              correct_options.push(expected[i].answers[j]);
            }
          //constructing the keys of all the choices of the question which are answered(in the actual 4a,4b,4c,4d etc.)
          let given_keys = [];
          let given_options:Choice[] = [];
          for(let k=0;k<this.questions[i].options.length;k++){
            let temp_key = this.questions[i].id+this.questions[i].options[k].choice_label;
            if(actual[temp_key]==true){
              given_keys.push(temp_key);
              given_options.push(this.questions[i].options[k]);
            }
          }

          /*checking length of both keys and given_keys*/
          if(keys.length==given_keys.length){
            //Initializing a flag, in order to check that the options are indeed exactly matching, besides the number of options being same
            let exact_match = true;
            for(let op=0;op<given_options.length;op++){
              if(!correct_options.some(option => option.choice_label==given_options[op].choice_label&&option.choice_text==given_options[op].choice_text)){
                exact_match = false;
                break;
              }
            }
            //If exact match, the given answer is correct and added to results. Otherwise the given answer is wrong and added to results.
            //the field below, correct: exact_match indicates whether the answer is correct or not.
              let result = {
                answer:{
                  question_id: expected[i].question_id,
                  type: expected[i].type,
                  answers: given_options
                },
                correct:exact_match
              };
              this.results.push(result);
          }
          else{
            //If lengths don't match, the given answer is wrong and added to results
            let wrong_answer = {answer:{
              question_id: expected[i].question_id,
              type: expected[i].type,
              answers: given_options
            },
            correct:false}
            this.results.push(wrong_answer);
          }
        }
      }
    }
  
  return this.results;
  }
  submit(questionForm:NgForm){
    this.values = questionForm.form.value;
    if(questionForm.invalid){
      console.log("Form is invalid!");
    }
    else{
      console.log("Form is valid!");
      this.results = this.populateResults(this.answers,this.values);
      this.testService.updateResult(this.results);
      console.log("results",this.results);
      this.router.navigate(['/api/result']);
    }
  }
}
  