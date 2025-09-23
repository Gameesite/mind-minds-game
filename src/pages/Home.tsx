import { useState } from 'react';
import { GameBoard } from '@/components/GameBoard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import heroImage from '@/assets/hero-game.jpg';
import aiBackground from '@/assets/ai-background.jpg';

export default function Home() {
  const [boardSize, setBoardSize] = useState(3);
  const [difficulty, setDifficulty] = useState('medium');
  const [aiDelay, setAiDelay] = useState(1000);

  const getAiAlgorithm = (size: number) => {
    switch (size) {
      case 3:
        return 'Minimax with Alpha-Beta';
      case 4:
      case 5:
        return 'Heuristic Depth-Limited';
      case 6:
        return 'Monte Carlo Tree Search';
      default:
        return 'Advanced Heuristic';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${heroImage})`,
          minHeight: '60vh'
        }}
      >
        <div className="container mx-auto px-4 py-16 text-center text-white">
          <div className="max-w-4xl mx-auto animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Tic Tac Toe <span className="text-primary-glow">Master</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Challenge AI with different board sizes and difficulties. Each size uses a unique AI algorithm!
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Badge className="bg-white/20 text-white border-white/30">🧠 Advanced AI</Badge>
              <Badge className="bg-white/20 text-white border-white/30">🎨 Beautiful Design</Badge>
              <Badge className="bg-white/20 text-white border-white/30">⚡ Lightning Fast</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl -mt-16 relative z-10">

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Game Settings */}
        <Card className="lg:col-span-1 animate-fade-in-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🎮 Game Settings
            </CardTitle>
            <CardDescription>
              Customize your game experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Board Size */}
            <div className="space-y-2">
              <Label htmlFor="board-size">Board Size</Label>
              <Select value={boardSize.toString()} onValueChange={(value) => setBoardSize(parseInt(value))}>
                <SelectTrigger id="board-size">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3x3 (Classic)</SelectItem>
                  <SelectItem value="4">4x4 (Advanced)</SelectItem>
                  <SelectItem value="5">5x5 (Expert)</SelectItem>
                  <SelectItem value="6">6x6 (Master)</SelectItem>
                </SelectContent>
              </Select>
              <Badge variant="secondary" className="text-xs">
                🤖 {getAiAlgorithm(boardSize)}
              </Badge>
            </div>

            {/* Difficulty */}
            <div className="space-y-2">
              <Label htmlFor="difficulty">AI Difficulty</Label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger id="difficulty">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">😊 Easy</SelectItem>
                  <SelectItem value="medium">🤔 Medium</SelectItem>
                  <SelectItem value="hard">😤 Hard</SelectItem>
                  <SelectItem value="impossible">🔥 Impossible</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* AI Delay */}
            <div className="space-y-2">
              <Label htmlFor="ai-delay">AI Thinking Time</Label>
              <Select value={aiDelay.toString()} onValueChange={(value) => setAiDelay(parseInt(value))}>
                <SelectTrigger id="ai-delay">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">⚡ Instant</SelectItem>
                  <SelectItem value="1000">🕐 1 second</SelectItem>
                  <SelectItem value="2000">🕑 2 seconds</SelectItem>
                  <SelectItem value="5000">🕔 5 seconds</SelectItem>
                  <SelectItem value="10000">🕙 10 seconds</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Game Info */}
            <div className="pt-4 border-t border-border">
              <h4 className="font-medium mb-2">How to Play:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• You are X, AI is O</li>
                <li>• Get {boardSize === 3 ? '3' : boardSize === 4 ? '4' : boardSize} in a row to win</li>
                <li>• Diagonal, horizontal, or vertical</li>
                <li>• Beat the AI if you can! 😉</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Game Board */}
        <div className="lg:col-span-2">
          <Card className="animate-fade-in-scale">
            <CardContent className="p-6">
              <GameBoard 
                size={boardSize} 
                difficulty={difficulty} 
                aiDelay={aiDelay} 
              />
            </CardContent>
          </Card>
        </div>
      </div>

        {/* Features */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 animate-fade-in-up">
          <Card className="text-center">
            <CardHeader>
              <div className="text-3xl mb-2">🧠</div>
              <CardTitle className="text-lg">Smart AI</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Different AI algorithms for each board size, from Minimax to MCTS
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="text-3xl mb-2">🎨</div>
              <CardTitle className="text-lg">Beautiful Design</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Modern UI with smooth animations and responsive design
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="text-3xl mb-2">⚡</div>
              <CardTitle className="text-lg">Fast & Smooth</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Web Workers keep the UI responsive during AI calculations
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}