import { Button } from '@/components/ui/button';
import { CellValue } from '@/types/game';
import { X, Circle } from 'lucide-react';

interface GameBoardProps {
  board: CellValue[];
  onCellClick: (index: number) => void;
  disabled?: boolean;
}

export function GameBoard({ board, onCellClick, disabled }: GameBoardProps) {
  const renderCell = (value: CellValue, index: number) => {
    let icon = null;
    let colorClass = '';
    
    if (value === 'X') {
      icon = <X className="w-8 h-8" />;
      colorClass = 'text-game-x';
    } else if (value === 'O') {
      icon = <Circle className="w-8 h-8" />;
      colorClass = 'text-game-o';
    }

    return (
      <Button
        key={index}
        variant="outline"
        className={`
          aspect-square h-20 w-20 border-2 border-border
          bg-game-cell hover:bg-game-cell-hover
          disabled:opacity-100 transition-all duration-200
          ${colorClass}
        `}
        onClick={() => onCellClick(index)}
        disabled={disabled || value !== null}
      >
        {icon}
      </Button>
    );
  };

  return (
    <div className="mx-auto max-w-xs">
      <div className="grid grid-cols-3 gap-2 p-4 bg-game-board rounded-xl shadow-game">
        {board.map((value, index) => renderCell(value, index))}
      </div>
    </div>
  );
}