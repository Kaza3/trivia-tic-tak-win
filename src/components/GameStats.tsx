import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { GameState } from '@/types/game';
import { Trophy, Target, Brain, TrendingUp } from 'lucide-react';

interface GameStatsProps {
  gameState: GameState;
}

export function GameStats({ gameState }: GameStatsProps) {
  const { score, questionsAnswered, correctAnswers } = gameState;
  const accuracy = questionsAnswered > 0 ? (correctAnswers / questionsAnswered) * 100 : 0;
  const totalGames = score.player + score.computer + score.draws;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Game Score */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Trophy className="w-4 h-4 text-warning" />
            Game Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>You</span>
              <span className="font-bold text-success">{score.player}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Computer</span>
              <span className="font-bold text-destructive">{score.computer}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Draws</span>
              <span className="font-bold text-muted-foreground">{score.draws}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Question Accuracy */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            Accuracy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-primary">
                {accuracy.toFixed(0)}%
              </span>
              <span className="text-sm text-muted-foreground">
                {correctAnswers}/{questionsAnswered}
              </span>
            </div>
            <Progress value={accuracy} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Learning Progress */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Brain className="w-4 h-4 text-success" />
            Learning
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-success">
              {correctAnswers}
            </div>
            <div className="text-sm text-muted-foreground">
              Correct answers
            </div>
            <div className="text-xs text-muted-foreground">
              Keep learning to improve!
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Win Rate */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-warning" />
            Win Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-warning">
              {totalGames > 0 ? ((score.player / totalGames) * 100).toFixed(0) : 0}%
            </div>
            <div className="text-sm text-muted-foreground">
              {totalGames} games played
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}