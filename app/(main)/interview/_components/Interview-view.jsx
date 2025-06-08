"use client";

import { generateQuiz, saveQuizResult } from "@/actions/interview";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { BarLoader } from "react-spinners";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import QuizResult from "./QuizResult";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const InterviewView = () => {
  const [quizData, setQuizData] = useState(null);
  const [resultData, setResultData] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Mutation to generate the quiz data
  const generateQuizMutation = useMutation({
    mutationFn: generateQuiz,
    onSuccess: (data) => {
      setQuizData(data);
      setAnswers(new Array(data.length).fill(null)); // Initialize answers with null
      toast.success("Quiz generated successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Mutation to save the quiz result
  const saveResultMutation = useMutation({
    mutationFn: ({ questions, answers, score }) =>
      saveQuizResult(questions, answers, score),
    onSuccess: (data) => {
      toast.success("Quiz result saved successfully!");
      setResultData(data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Function to handle value change in the radio group
  const handleValueChange = (answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = answer; // Update the answer for the current question
    setAnswers(updatedAnswers);
  };

  // Function to handle moving to the next question
  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false); // Reset explanation visibility for the next question
    } else {
      //  last question, handling quiz completion
      finishQuiz();
    }
  };

  // calculating the score based on the answers
  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === quizData[index].correctAnswer) {
        correct += 1; // Increment score for correct answers
      }
    });
    return (correct / quizData.length) * 100;
  };

  // Function to finish the quiz and save the result in database
  const finishQuiz = () => {
    const score = calculateScore();
    saveResultMutation.mutate({ questions: quizData, answers, score });
  };

  // start new quiz
  const startNewQuiz = () => {
    setQuizData(null);
    setResultData(null);
    setAnswers([]);
    setShowExplanation(false);
    setCurrentQuestion(0);
    generateQuizMutation.mutate(); // Regenerate the quiz
  };

  //   If the generateQuizMutation is pending, show a loading spinner
  if (generateQuizMutation.isPending) {
    return <BarLoader width={"100%"} className="mt-4" color="gray" />;
  }

  //showing the quiz result if resultData is available
  if (resultData) {
    return <QuizResult result={resultData} onStartNew={startNewQuiz} />;
  }
  // If quizData is null, show the initial card with instructions
  if (!quizData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Ready to test your knowledge?</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            This quiz contains 10 questions specific to your industry and
            Skills. Take your time and choose the best answer for each question.
          </p>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => {
              generateQuizMutation.mutate();
            }}
            disabled={generateQuizMutation.isLoading}
          >
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const question = quizData[currentQuestion];
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          current {currentQuestion + 1} of {quizData.length}{" "}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>{question.question}</p>
        <RadioGroup
          className="space-y-2"
          onValueChange={handleValueChange}
          value={answers[currentQuestion]}
        >
          {question.options.map((option, index) => (
            <div className="flex items-center space-x-2 " key={index}>
              <RadioGroupItem
                value={option}
                id={`option-${index}`}
                disabled={showExplanation}
                className={""}
              />
              <Label htmlFor={`option-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>

        {showExplanation && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h3 className="font-medium">Explanation:</h3>
            <p className="text-muted-foreground">{question.explanation}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-between w-full">
          {!showExplanation && (
            <Button
              onClick={() => {
                setShowExplanation(true);
              }}
              disabled={!answers[currentQuestion]}
              variant={"outline"}
            >
              Show Explanation
            </Button>
          )}

          <Button
            disabled={!answers[currentQuestion] || saveResultMutation.isPending}
            className={"ml-2"}
            onClick={handleNextQuestion}
          >
            {saveResultMutation.isPending && (
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
            )}
            {currentQuestion < quizData.length - 1
              ? "Next Question"
              : " Finish Quiz"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default InterviewView;
