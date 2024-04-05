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
  quizzes: QuizDisplay[] = [];
  selectedQuiz: QuizDisplay | undefined = undefined;
  newQuestion: string = '';

  constructor(public quizSvc: QuizService) {}

  ngOnInit(): void {
    this.loadQuizzes();
  }
  
  loadQuizzes() {
    const quizzes = this.quizSvc.loadQuizzes();
    this.quizzes = quizzes.map(x => ({
      quizName: x.name,
      quizQuestions: x.questions.map((y: any) => ({
        questionName: y.name
      })),
      markedForDelete: false
    }));
  };

  selectQuiz(q: QuizDisplay) {
    this.selectedQuiz = q;
    console.log(this.selectedQuiz);
  }

  saveQuizName() {
    console.log('Quiz name saved:', this.selectedQuiz?.quizName);
  }

  cancelEdit() {
    console.log('Edit cancelled');
  }

  addNewQuiz = () => {
    const newQuiz: QuizDisplay = {
      quizName: 'Untitled Quiz',
      quizQuestions: [],
      markedForDelete: false
    };
    this.quizzes = [...this.quizzes, newQuiz];
    this.selectedQuiz = newQuiz;
  }

  addNewQuestion = () => {
    if (this.newQuestion.trim() !== '') {
      if (this.selectedQuiz) {
        this.selectedQuiz.quizQuestions.push({ questionName: this.newQuestion });
        this.newQuestion = '';
      }
    }
  }

  removeQuestion(index: number) {
    if (this.selectedQuiz) {
      this.selectedQuiz.quizQuestions.splice(index, 1);
    }
  }
}
