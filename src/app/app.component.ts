import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

interface QuizDisplay {
  quizName: string;
  quizQuestions: QuestionDisplay[];
  markedForDelete: boolean;
}

interface QuestionDisplay {
  questionName: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'quiz-editor';

  constructor(
    public quizSvc: QuizService
  ) {
  }

  errorLoadingQuizzes = false;

  loadQuizzesFromCloud = async () => {

    try {
      const quizzes = await this.quizSvc.loadQuizzes() ?? [];
      console.log(quizzes);
    this.quizzes = quizzes.map(x => ({
       quizName: x.name
     , quizQuestions: x.questions.map((y: any) => ({
        questionName: y.name
      })),
        markedForDelete: false
      }));
    }
    catch (err) {
      console.error(err);
      this.errorLoadingQuizzes = true;
    }
  };

  ngOnInit() {
    this.loadQuizzesFromCloud();
    console.log(this.quizzes);
  }
 //   const quizzes = this.quizSvc.loadQuizzes() ?? [];
 //   console.log(quizzes);

 //   quizzes.subscribe({
//      next: data => {
 //       console.log(data);
 //       this.quizzes = data.map( x => ({
 //         quizName: x.name,
  //        quizQuestions: x.questions.map(y => ({
 //           questionName: y.name
//          })),
 //         markedForDelete: false
 //       }));

//      },
//      error: err => {
 //       console.error(err.error);
 //       this.errorLoadingQuizzes = true;
 //     }}
  //  );

   // ngOnInit() {
   //   this.
   // }

  //  this.quizzes = quizzes.map(x => ({
  //    quizName: x.name
  //    , quizQuestions: x.questions.map((y: any) => ({
  //      questionName: y.name
  //    }))
  //    , markedForDelete: false
  //  }));



  quizzes: QuizDisplay[] = [];

  selectedQuiz: QuizDisplay | undefined = undefined;

  selectQuiz = (q: QuizDisplay) => {
    this.selectedQuiz = q;
    console.log(this.selectedQuiz);
  };

  addNewQuiz = () => {
    const newQuiz = {
      quizName: "Untitled Quiz"
      , quizQuestions: []
      , markedForDelete: false
    };

    this.quizzes = [
      ...this.quizzes
      , newQuiz 
    ];

    this.selectedQuiz = newQuiz;
  };

  addNewQuestion = () => {
    
    if (this.selectedQuiz) {
      this.selectedQuiz.quizQuestions = [
        ...this.selectedQuiz.quizQuestions
        , {
          questionName: "Untitled Question"
        }
      ];
    }
  };

  removeQuestion = (questionToRemove: QuestionDisplay) => {
    if (this.selectedQuiz) {
      this.selectedQuiz.quizQuestions = this.selectedQuiz.quizQuestions.filter(x => x !== questionToRemove);
    }
  };


  jsPromisesOne = () => {
    const n = this.quizSvc.getMagicNumber(true);
    console.log(n)

    n.then(
      number => {
        console.log(number);
      }
    )
  };

  jsPromisesTwo = async () => {
    try {
    const x = await this.quizSvc.getMagicNumber(true);
    console.log(x);
   }

   catch (err) {
    console.error(err);
   }
  };

}

