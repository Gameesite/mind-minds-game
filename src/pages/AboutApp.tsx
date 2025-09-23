import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Palette, Zap, Gamepad2, Settings, Trophy } from 'lucide-react';

export default function AboutApp() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
          About the App
        </h1>
        <p className="text-lg text-muted-foreground">
          Discover what makes Tic Tac Toe Master special
        </p>
      </div>

      {/* Main Description */}
      <Card className="mb-8 animate-fade-in-scale">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Next-Level Tic Tac Toe</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none text-foreground">
          <p className="text-lg leading-relaxed mb-6">
            This application brings <strong>Tic Tac Toe to a whole new level</strong>. Choose between different board sizes, challenge a smart AI that adapts to your skills, and enjoy a smooth interface with animations and sound effects.
          </p>
          
          <p className="text-lg leading-relaxed mb-6">
            Whether you want a quick casual match or a deep strategic challenge, this app is designed to deliver fun and excitement. Our advanced AI algorithms provide a worthy opponent at every skill level, while the beautiful modern interface makes every game a pleasure to play.
          </p>

          <p className="text-lg leading-relaxed">
            From the classic 3x3 grid to the challenging 6x6 master level, each board size offers a unique experience with carefully tuned AI that will test your strategic thinking and keep you coming back for more.
          </p>
        </CardContent>
      </Card>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="animate-fade-in-scale">
          <CardHeader>
            <Brain className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="text-lg">Smart AI Algorithms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Each board size uses a different AI algorithm for the best experience:
            </p>
            <div className="space-y-1">
              <Badge variant="outline" className="text-xs">3x3: Minimax Alpha-Beta</Badge>
              <Badge variant="outline" className="text-xs">4x4-5x5: Heuristic Search</Badge>
              <Badge variant="outline" className="text-xs">6x6: Monte Carlo Tree</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in-scale">
          <CardHeader>
            <Settings className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="text-lg">Difficulty Levels</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Four difficulty levels to match your skill:
            </p>
            <div className="space-y-1">
              <Badge variant="outline" className="text-xs">😊 Easy</Badge>
              <Badge variant="outline" className="text-xs">🤔 Medium</Badge>
              <Badge variant="outline" className="text-xs">😤 Hard</Badge>
              <Badge variant="outline" className="text-xs">🔥 Impossible</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in-scale">
          <CardHeader>
            <Palette className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="text-lg">Beautiful Design</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Modern, responsive interface with smooth animations, dark/light theme support, and customizable font sizes for the perfect visual experience.
            </p>
          </CardContent>
        </Card>

        <Card className="animate-fade-in-scale">
          <CardHeader>
            <Zap className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="text-lg">Performance Optimized</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Web Workers ensure the UI stays responsive during AI calculations. Adjustable thinking time lets you control the pace of the game.
            </p>
          </CardContent>
        </Card>

        <Card className="animate-fade-in-scale">
          <CardHeader>
            <Gamepad2 className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="text-lg">Multiple Board Sizes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              From classic 3x3 to challenging 6x6 boards. Each size offers a unique strategic experience with different win conditions and complexity levels.
            </p>
          </CardContent>
        </Card>

        <Card className="animate-fade-in-scale">
          <CardHeader>
            <Trophy className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="text-lg">Immersive Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Sound effects, winning animations, and visual feedback create an engaging game experience that celebrates your victories and motivates you to improve.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Technical Highlights */}
      <Card className="animate-fade-in-up">
        <CardHeader>
          <CardTitle className="text-center">Technical Excellence</CardTitle>
          <CardDescription className="text-center">
            Built with modern web technologies for optimal performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Frontend Technologies</h3>
              <div className="space-y-2">
                <Badge variant="secondary">React 18 with TypeScript</Badge>
                <Badge variant="secondary">Tailwind CSS for styling</Badge>
                <Badge variant="secondary">Radix UI components</Badge>
                <Badge variant="secondary">Responsive design patterns</Badge>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">AI & Performance</h3>
              <div className="space-y-2">
                <Badge variant="secondary">Web Workers for AI processing</Badge>
                <Badge variant="secondary">Minimax with Alpha-Beta pruning</Badge>
                <Badge variant="secondary">Monte Carlo Tree Search</Badge>
                <Badge variant="secondary">Heuristic evaluation functions</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}