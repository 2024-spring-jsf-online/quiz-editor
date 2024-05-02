import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor() { }

    loadQuizes = () => {

    const quizzesFromWeb any[] = [
      {
        name: 'quiz 01'
        , questions: [
          {
          name: 'question 01'
          }
          ,{
            name: 'question 02'
          }
          
        ]
      }
      ,{
        name: 'quiz 02'
        , questions: []
      }
    ]
  };
}
