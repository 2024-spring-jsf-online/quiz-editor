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
  loading = true; // Initialize loading state

  constructor(public quizSvc: QuizService) {}

  ngOnInit() {
    this.loadQuizzes();
  }

  quizzes: QuizDisplay[] = [];
  selectedQuiz: QuizDisplay | undefined = undefined;

  loadQuizzes() {
    this.loading = true; // Set loading to true when loading quizzes
    const quizzes = this.quizSvc.loadQuizzes();
    if (Array.isArray(quizzes)) {
      this.quizzes = quizzes.map(x => ({
        quizName: x.name,
        quizQuestions: x.questions.map((y: any) => ({
          questionName: y.name
        })),
        markedForDelete: false
      }));
      this.loading = false; // Set loading to false when quizzes are loaded successfully
    } else {
      console.error('Error loading quizzes: Invalid data format');
      this.loading = false; // Set loading to false in case of error
    }
  }

  selectQuiz(q: QuizDisplay) {
    this.selectedQuiz = q;
    console.log(this.selectedQuiz);
  }

  addNewQuiz() {
    const newQuiz = {
      quizName: 'Untitled Quiz',
      quizQuestions: [],
      markedForDelete: false
    };

    this.quizzes = [...this.quizzes, newQuiz];
    this.selectedQuiz = newQuiz;
  }

  addNewQuestion() {
    if (this.selectedQuiz) {
      this.selectedQuiz.quizQuestions = [
        ...this.selectedQuiz.quizQuestions,
        {
          questionName: 'Untitled Question'
        }
      ];
    }
  }

  removeQuestion(questionToRemove: QuestionDisplay) {
    if (this.selectedQuiz) {
      this.selectedQuiz.quizQuestions = this.selectedQuiz.quizQuestions.filter(
        x => x !== questionToRemove
      );
    }
  }
}
