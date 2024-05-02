import { Component , OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

interface QuizDisplay {
  quizName: string;
  quizQuestions: QuestionsDisplay[];
}

interface QuestionsDisplay {
  questionName: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'quiz-editor';

  constructor(
    public quizScv: QuizService) {
  }
    ngOnInit() {
      const quizzes = this.quizScv.loadQuizzes();
      console.log(quizzes);

      this.quizzes = quizzes.map(x => ({
        quizName: x.name
        , quizQuestions: x.questions.map((y: any) => ({
          questionName: y.name
        }))
      }));
    }

    quizzes: QuizDisplay[] = [];

    selectedQuiz: QuizDisplay | undefined = undefined; 
    selectQuiz = (q: QuizDisplay) => {
      this.selectedQuiz = q;
    };
    addNewQuiz = () => {
      const newQuiz = {
        quizName: "Untitled",
        quizQuestions: []
      };
  
      this.quizzes = [
        ...this.quizzes,
        newQuiz
      ]
  
      this.selectedQuiz = newQuiz;
   }
  
}
  

