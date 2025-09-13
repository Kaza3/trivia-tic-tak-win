import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { STEMQuestion } from '@/types/game';
import { CheckCircle, XCircle, Lightbulb } from 'lucide-react';

interface QuestionModalProps {
  question: STEMQuestion | null;
  isOpen: boolean;
  onAnswer: (isCorrect: boolean) => void;
}

export function QuestionModal({ question, isOpen, onAnswer }: QuestionModalProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  if (!question) return null;

  const handleAnswerSelect = (optionIndex: number) => {
    if (showResult) return;
    
    setSelectedAnswer(optionIndex);
    const correct = optionIndex === question.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    
    // Auto-close after 2 seconds
    setTimeout(() => {
      onAnswer(correct);
      setShowResult(false);
      setSelectedAnswer(null);
    }, 2000);
  };

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'math': return 'bg-blue-500';
      case 'science': return 'bg-green-500';
      case 'technology': return 'bg-purple-500';
      case 'engineering': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'grade6-8': return 'Grade 6-8';
      case 'grade9-10': return 'Grade 9-10';
      case 'grade11-12': return 'Grade 11-12';
      default: return difficulty;
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge className={`${getSubjectColor(question.subject)} text-white`}>
              {question.subject.toUpperCase()}
            </Badge>
            <Badge variant="outline">
              {getDifficultyLabel(question.difficulty)}
            </Badge>
          </div>
          <DialogTitle className="text-lg leading-relaxed">
            {question.question}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3">
          {question.options.map((option, index) => {
            let buttonVariant: "outline" | "default" | "destructive" = "outline";
            let icon = null;
            
            if (showResult) {
              if (index === question.correctAnswer) {
                buttonVariant = "default";
                icon = <CheckCircle className="w-4 h-4 text-success" />;
              } else if (index === selectedAnswer && index !== question.correctAnswer) {
                buttonVariant = "destructive";
                icon = <XCircle className="w-4 h-4" />;
              }
            }
            
            return (
              <Button
                key={index}
                variant={buttonVariant}
                className={`w-full justify-start h-auto p-4 text-left ${
                  showResult && index === question.correctAnswer 
                    ? 'bg-gradient-success border-success' 
                    : ''
                }`}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
              >
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-sm bg-muted px-2 py-1 rounded">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1">{option}</span>
                  {icon}
                </div>
              </Button>
            );
          })}
        </div>

        {showResult && question.explanation && (
          <Card className="bg-muted/50 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-5 h-5 text-warning mt-0.5" />
                <div>
                  <p className="font-medium text-sm mb-1">Explanation:</p>
                  <p className="text-sm text-muted-foreground">{question.explanation}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {showResult && (
          <div className={`text-center p-4 rounded-lg ${
            isCorrect ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
          }`}>
            <div className="flex items-center justify-center gap-2">
              {isCorrect ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <XCircle className="w-5 h-5" />
              )}
              <span className="font-medium">
                {isCorrect ? 'Correct! You can place your X.' : 'Incorrect. Try again next turn!'}
              </span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}