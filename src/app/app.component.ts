import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

interface QuizDisplay {
  quizName: string;
  quizQuestions: QuestionDisplay[];
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
  quizzes: QuizDisplay[] = [];
  selectedQuiz: QuizDisplay | undefined = undefined;

  constructor(public quizSvc: QuizService) {}

  ngOnInit(): void {
    const quizzes = this.quizSvc.loadQuizzes();
    console.log(quizzes);

    this.quizzes = quizzes.map(x => ({
      quizName: x.name,
      quizQuestions: x.questions.map((y: any) => ({
        questionName: y.name
      }))
    }));

    console.log(this.quizzes);
  }

  selectQuiz(q: QuizDisplay) {
    this.selectedQuiz = q;
    console.log(this.selectedQuiz);
  }

  saveQuizName() {
    // You can add logic here to save the edited quiz name
    console.log('Quiz name saved:', this.selectedQuiz?.quizName);
  }

  cancelEdit() {
    // You can add logic here to cancel the editing of the quiz name
    console.log('Edit cancelled');
  }
}
