import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { soundManager } from '@/lib/sounds';

type Player = 'X' | 'O' | null;
type GameResult = 'win' | 'draw' | null;

interface GameState {
  board: Player[];
  currentPlayer: Player;
  gameResult: GameResult;
  winner: Player;
  winningCells: number[];
}

interface GameBoardProps {
  size: number;
  difficulty: string;
  aiDelay: number;
}

export const GameBoard = ({ size, difficulty, aiDelay }: GameBoardProps) => {
  const { toast } = useToast();
  const [gameState, setGameState] = useState<GameState>({
    board: Array(size * size).fill(null),
    currentPlayer: 'X',
    gameResult: null,
    winner: null,
    winningCells: [],
  });
  const [isAiThinking, setIsAiThinking] = useState(false);

  const checkWinner = useCallback((board: Player[], boardSize: number): { winner: Player; winningCells: number[] } => {
    const winCondition = boardSize === 3 ? 3 : boardSize === 4 ? 4 : boardSize;

    // Check rows
    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col <= boardSize - winCondition; col++) {
        const cells = [];
        for (let i = 0; i < winCondition; i++) {
          cells.push(row * boardSize + col + i);
        }
        const values = cells.map(cell => board[cell]);
        if (values.every(val => val && val === values[0])) {
          return { winner: values[0], winningCells: cells };
        }
      }
    }

    // Check columns
    for (let col = 0; col < boardSize; col++) {
      for (let row = 0; row <= boardSize - winCondition; row++) {
        const cells = [];
        for (let i = 0; i < winCondition; i++) {
          cells.push((row + i) * boardSize + col);
        }
        const values = cells.map(cell => board[cell]);
        if (values.every(val => val && val === values[0])) {
          return { winner: values[0], winningCells: cells };
        }
      }
    }

    // Check diagonals
    for (let row = 0; row <= boardSize - winCondition; row++) {
      for (let col = 0; col <= boardSize - winCondition; col++) {
        // Top-left to bottom-right
        const cells1 = [];
        for (let i = 0; i < winCondition; i++) {
          cells1.push((row + i) * boardSize + col + i);
        }
        const values1 = cells1.map(cell => board[cell]);
        if (values1.every(val => val && val === values1[0])) {
          return { winner: values1[0], winningCells: cells1 };
        }

        // Top-right to bottom-left
        const cells2 = [];
        for (let i = 0; i < winCondition; i++) {
          cells2.push((row + i) * boardSize + col + winCondition - 1 - i);
        }
        const values2 = cells2.map(cell => board[cell]);
        if (values2.every(val => val && val === values2[0])) {
          return { winner: values2[0], winningCells: cells2 };
        }
      }
    }

    return { winner: null, winningCells: [] };
  }, []);

  // Minimax algorithm with alpha-beta pruning for impossible mode
  const minimax = useCallback((board: Player[], depth: number, isMaximizing: boolean, alpha: number, beta: number, boardSize: number): number => {
    const { winner } = checkWinner(board, boardSize);
    
    if (winner === 'O') return 10 - depth; // AI wins
    if (winner === 'X') return depth - 10; // Player wins
    if (board.every(cell => cell !== null) || depth >= 6) return 0; // Draw or max depth

    if (isMaximizing) {
      let maxEval = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = 'O';
          const evaluation = minimax(board, depth + 1, false, alpha, beta, boardSize);
          board[i] = null;
          maxEval = Math.max(maxEval, evaluation);
          alpha = Math.max(alpha, evaluation);
          if (beta <= alpha) break; // Alpha-beta pruning
        }
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = 'X';
          const evaluation = minimax(board, depth + 1, true, alpha, beta, boardSize);
          board[i] = null;
          minEval = Math.min(minEval, evaluation);
          beta = Math.min(beta, evaluation);
          if (beta <= alpha) break; // Alpha-beta pruning
        }
      }
      return minEval;
    }
  }, [checkWinner]);

  const makeAiMove = useCallback((board: Player[], boardSize: number, difficultyLevel: string): number => {
    const availableMoves = board.map((cell, index) => cell === null ? index : null).filter(move => move !== null) as number[];
    
    if (availableMoves.length === 0) return -1;

    switch (difficultyLevel) {
      case 'easy':
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
      
      case 'medium':
        // Try to win or block
        for (const move of availableMoves) {
          const testBoard = [...board];
          testBoard[move] = 'O';
          const { winner } = checkWinner(testBoard, boardSize);
          if (winner === 'O') return move;
        }
        
        for (const move of availableMoves) {
          const testBoard = [...board];
          testBoard[move] = 'X';
          const { winner } = checkWinner(testBoard, boardSize);
          if (winner === 'X') return move;
        }
        
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
      
      case 'hard':
        // Enhanced logic for hard mode
        for (const move of availableMoves) {
          const testBoard = [...board];
          testBoard[move] = 'O';
          const { winner } = checkWinner(testBoard, boardSize);
          if (winner === 'O') return move;
        }
        
        for (const move of availableMoves) {
          const testBoard = [...board];
          testBoard[move] = 'X';
          const { winner } = checkWinner(testBoard, boardSize);
          if (winner === 'X') return move;
        }
        
        // Prefer center and corners
        const center = Math.floor(boardSize / 2) * boardSize + Math.floor(boardSize / 2);
        if (availableMoves.includes(center)) return center;
        
        const corners = [0, boardSize - 1, boardSize * (boardSize - 1), boardSize * boardSize - 1];
        const availableCorners = corners.filter(corner => availableMoves.includes(corner));
        if (availableCorners.length > 0) {
          return availableCorners[Math.floor(Math.random() * availableCorners.length)];
        }
        
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
      
      case 'impossible':
        // Advanced Minimax with alpha-beta pruning and strategic opening
        const emptySpots = board.filter(spot => spot === null).length;
        
        // Opening move strategy - vary between center and corners
        if (emptySpots === boardSize * boardSize - 1) { // First AI move
          const center = Math.floor(boardSize / 2) * boardSize + Math.floor(boardSize / 2);
          const corners = [0, boardSize - 1, boardSize * (boardSize - 1), boardSize * boardSize - 1];
          const strategicMoves = [center, ...corners].filter(move => availableMoves.includes(move));
          
          // Randomly choose between center (60%) and corners (40%) to add unpredictability
          if (Math.random() < 0.6 && availableMoves.includes(center)) {
            return center;
          } else if (strategicMoves.length > 0) {
            return strategicMoves[Math.floor(Math.random() * strategicMoves.length)];
          }
        }
        
        // Use Minimax for all other moves
        let bestScore = -Infinity;
        let bestMoves: number[] = [];
        
        for (const move of availableMoves) {
          const testBoard = [...board];
          testBoard[move] = 'O';
          const score = minimax(testBoard, 0, false, -Infinity, Infinity, boardSize);
          
          if (score > bestScore) {
            bestScore = score;
            bestMoves = [move];
          } else if (score === bestScore) {
            bestMoves.push(move);
          }
        }
        
        // Add slight randomness to prevent predictable patterns
        if (bestMoves.length > 1 && Math.random() < 0.15) {
          // 15% chance to pick a good but not best move to add variety
          const goodMoves = availableMoves.filter(move => {
            const testBoard = [...board];
            testBoard[move] = 'O';
            const score = minimax(testBoard, 0, false, -Infinity, Infinity, boardSize);
            return score >= bestScore - 2; // Within 2 points of best
          });
          return goodMoves[Math.floor(Math.random() * goodMoves.length)];
        }
        
        return bestMoves[Math.floor(Math.random() * bestMoves.length)];
      
      default:
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }
  }, [checkWinner, minimax]);

  const handleCellClick = useCallback((index: number) => {
    if (gameState.board[index] || gameState.gameResult || isAiThinking) return;

    // Play click sound
    soundManager.play('click');

    const newBoard = [...gameState.board];
    newBoard[index] = gameState.currentPlayer;

    const { winner, winningCells } = checkWinner(newBoard, size);
    
    if (winner) {
      setGameState({
        board: newBoard,
        currentPlayer: gameState.currentPlayer,
        gameResult: 'win',
        winner,
        winningCells,
      });
      
      // Play win sound
      soundManager.play('win');
      
      toast({
        title: winner === 'X' ? 'You Win!' : 'AI Wins!',
        description: `${winner} wins the game!`,
        duration: 3000,
      });
      
      return;
    }

    if (newBoard.every(cell => cell !== null)) {
      setGameState({
        board: newBoard,
        currentPlayer: gameState.currentPlayer,
        gameResult: 'draw',
        winner: null,
        winningCells: [],
      });
      
      // Play draw sound
      soundManager.play('draw');
      
      toast({
        title: "It's a Draw!",
        description: "Nobody wins this round.",
        duration: 3000,
      });
      
      return;
    }

    setGameState({
      board: newBoard,
      currentPlayer: 'O',
      gameResult: null,
      winner: null,
      winningCells: [],
    });

    // AI move
    setIsAiThinking(true);
    setTimeout(() => {
      const aiMove = makeAiMove(newBoard, size, difficulty);
      if (aiMove !== -1) {
        const aiBoard = [...newBoard];
        aiBoard[aiMove] = 'O';

        const { winner: aiWinner, winningCells: aiWinningCells } = checkWinner(aiBoard, size);
        
        if (aiWinner) {
          setGameState({
            board: aiBoard,
            currentPlayer: 'X',
            gameResult: 'win',
            winner: aiWinner,
            winningCells: aiWinningCells,
          });
          
          toast({
            title: 'AI Wins!',
            description: 'AI wins the game!',
            duration: 3000,
          });
        } else if (aiBoard.every(cell => cell !== null)) {
          setGameState({
            board: aiBoard,
            currentPlayer: 'X',
            gameResult: 'draw',
            winner: null,
            winningCells: [],
          });
          
          toast({
            title: "It's a Draw!",
            description: "Nobody wins this round.",
            duration: 3000,
          });
        } else {
          setGameState({
            board: aiBoard,
            currentPlayer: 'X',
            gameResult: null,
            winner: null,
            winningCells: [],
          });
        }
      }
      setIsAiThinking(false);
    }, aiDelay);
  }, [gameState, size, difficulty, aiDelay, checkWinner, makeAiMove, toast, isAiThinking]);

  const resetGame = () => {
    setGameState({
      board: Array(size * size).fill(null),
      currentPlayer: 'X',
      gameResult: null,
      winner: null,
      winningCells: [],
    });
    setIsAiThinking(false);
  };

  useEffect(() => {
    resetGame();
  }, [size, difficulty]);

  return (
    <div className="space-y-6">
      {/* Game Status */}
      <div className="text-center space-y-2">
        {gameState.gameResult ? (
          <div className="animate-fade-in-scale">
            {gameState.gameResult === 'win' ? (
              <p className={gameState.winner === 'X' ? 'status-win' : 'text-destructive font-bold'}>
                {gameState.winner === 'X' ? 'You Win! 🎉' : 'AI Wins! 🤖'}
              </p>
            ) : (
              <p className="status-draw">It's a Draw! 🤝</p>
            )}
          </div>
        ) : (
          <div>
            {isAiThinking ? (
              <p className="text-muted-foreground animate-pulse">AI is thinking...</p>
            ) : (
              <p className="text-foreground">
                {gameState.currentPlayer === 'X' ? 'Your turn' : "AI's turn"}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Game Board */}
      <div className="flex justify-center">
        <div 
          className="grid gap-2 p-4 bg-gradient-to-br from-card to-card/50 rounded-xl shadow-soft"
          style={{ 
            gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
            maxWidth: size <= 4 ? '400px' : '500px'
          }}
        >
          {gameState.board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleCellClick(index)}
              disabled={cell !== null || gameState.gameResult !== null || isAiThinking}
              className={`
                btn-cell aspect-square flex items-center justify-center
                ${gameState.winningCells.includes(index) ? 'winner-line' : ''}
                ${cell === 'X' ? 'text-game-x' : cell === 'O' ? 'text-game-o' : ''}
                ${size === 3 ? 'text-3xl h-16' : size === 4 ? 'text-2xl h-14' : size === 5 ? 'text-xl h-12' : 'text-lg h-10'}
              `}
            >
              {cell}
            </button>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <div className="text-center">
        <Button 
          onClick={resetGame}
          className="btn-game"
        >
          Play Again
        </Button>
      </div>
    </div>
  );
};