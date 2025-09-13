import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GameBoard } from '@/components/GameBoard';
import { QuestionModal } from '@/components/QuestionModal';
import { GameStats } from '@/components/GameStats';
import { GameState, STEMQuestion } from '@/types/game';
import { checkWinner, isBoardFull, getBestMove } from '@/utils/gameLogic';
import { getRandomQuestion } from '@/data/questions';
import { RefreshCw, Brain, Gamepad2 } from 'lucide-react';

const Index = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: Array(9).fill(null),
    currentPlayer: 'X',
    status: 'playing',
    score: { player: 0, computer: 0, draws: 0 },
    questionsAnswered: 0,
    correctAnswers: 0
  });
  
  const [currentQuestion, setCurrentQuestion] = useState<STEMQuestion | null>(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [pendingMove, setPendingMove] = useState<number | null>(null);
  const [usedQuestions, setUsedQuestions] = useState<string[]>([]);

  const handleCellClick = (index: number) => {
    if (gameState.board[index] !== null || gameState.status !== 'playing' || gameState.currentPlayer !== 'X') {
      return;
    }

    // Show question before allowing player move
    const question = getRandomQuestion(usedQuestions);
    setCurrentQuestion(question);
    setShowQuestion(true);
    setPendingMove(index);
    setUsedQuestions(prev => [...prev, question.id]);
  };

  const handleQuestionAnswer = (isCorrect: boolean) => {
    setShowQuestion(false);
    setGameState(prev => ({
      ...prev,
      questionsAnswered: prev.questionsAnswered + 1,
      correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0)
    }));

    if (isCorrect && pendingMove !== null) {
      // Place player's X
      const newBoard = [...gameState.board];
      newBoard[pendingMove] = 'X';
      
      const winner = checkWinner(newBoard);
      if (winner === 'X') {
        setGameState(prev => ({
          ...prev,
          board: newBoard,
          status: 'won',
          score: { ...prev.score, player: prev.score.player + 1 }
        }));
      } else if (isBoardFull(newBoard)) {
        setGameState(prev => ({
          ...prev,
          board: newBoard,
          status: 'draw',
          score: { ...prev.score, draws: prev.score.draws + 1 }
        }));
      } else {
        // Computer's turn
        const computerMove = getBestMove(newBoard);
        if (computerMove !== -1) {
          newBoard[computerMove] = 'O';
          
          const computerWinner = checkWinner(newBoard);
          if (computerWinner === 'O') {
            setGameState(prev => ({
              ...prev,
              board: newBoard,
              status: 'lost',
              score: { ...prev.score, computer: prev.score.computer + 1 }
            }));
          } else if (isBoardFull(newBoard)) {
            setGameState(prev => ({
              ...prev,
              board: newBoard,
              status: 'draw',
              score: { ...prev.score, draws: prev.score.draws + 1 }
            }));
          } else {
            setGameState(prev => ({ ...prev, board: newBoard }));
          }
        }
      }
    }
    
    setPendingMove(null);
    setCurrentQuestion(null);
  };

  const resetGame = () => {
    setGameState(prev => ({
      ...prev,
      board: Array(9).fill(null),
      currentPlayer: 'X',
      status: 'playing'
    }));
    setUsedQuestions([]);
  };

  const getStatusMessage = () => {
    switch (gameState.status) {
      case 'won': return 'Congratulations! You won! 🎉';
      case 'lost': return 'Computer wins this round! 🤖';
      case 'draw': return "It's a draw! 🤝";
      default: return 'Answer STEM questions to place your X!';
    }
  };

  const getStatusColor = () => {
    switch (gameState.status) {
      case 'won': return 'bg-gradient-success';
      case 'lost': return 'bg-gradient-warning';
      case 'draw': return 'bg-muted';
      default: return 'bg-gradient-primary';
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-gradient-hero rounded-full">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              STEM Tic-Tac-Toe
            </h1>
            <div className="p-3 bg-gradient-hero rounded-full">
              <Gamepad2 className="w-8 h-8 text-white" />
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Challenge your mind! Answer STEM questions correctly to place your moves and beat the AI.
          </p>
        </div>

        {/* Game Stats */}
        <GameStats gameState={gameState} />

        {/* Game Area */}
        <div className="grid lg:grid-cols-3 gap-6 items-start">
          {/* Game Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Game Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className={`p-4 rounded-lg text-center text-white ${getStatusColor()}`}>
                <p className="font-medium">{getStatusMessage()}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Your Turn:</span>
                  <Badge variant={gameState.currentPlayer === 'X' ? 'default' : 'secondary'}>
                    Player (X)
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Computer:</span>
                  <Badge variant="outline">AI (O)</Badge>
                </div>
              </div>

              <Button 
                onClick={resetGame}
                className="w-full"
                variant="outline"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                New Game
              </Button>
            </CardContent>
          </Card>

          {/* Game Board */}
          <div className="flex justify-center">
            <GameBoard
              board={gameState.board}
              onCellClick={handleCellClick}
              disabled={gameState.status !== 'playing' || showQuestion}
            />
          </div>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">How to Play</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">1</span>
                <p>Click on an empty cell to answer a STEM question</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">2</span>
                <p>Answer correctly to place your X</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">3</span>
                <p>Computer places O automatically</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">4</span>
                <p>Get three in a row to win!</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Question Modal */}
        <QuestionModal
          question={currentQuestion}
          isOpen={showQuestion}
          onAnswer={handleQuestionAnswer}
        />
      </div>
    </div>
  );
};

export default Index;
