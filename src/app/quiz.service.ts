import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor() {}

  loadQuizzes = () => {
    const quizzesFromWeb: any[] = [
      {
        name: 'Quiz 1',
        questions: [
          {
            name: 'question 1',
          },
          {
            name: 'question 2',
          },
        ],
      },
      {
        name: 'Quiz 2',
        questions: [
          {
            name: 'q1',
          },
          {
            name: 'q2',
          },
        ],
      },
    ];

    return quizzesFromWeb;
  };
}
