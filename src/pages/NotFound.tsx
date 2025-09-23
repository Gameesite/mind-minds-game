import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <div className="text-center animate-fade-in-up">
        <Card>
          <CardHeader className="pb-4">
            <div className="text-8xl mb-4 text-muted-foreground">🎯</div>
            <h1 className="text-6xl font-bold text-gradient mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
            <p className="text-lg text-muted-foreground">
              Oops! The page you're looking for doesn't exist.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              You tried to access: <code className="bg-muted px-2 py-1 rounded text-sm">{location.pathname}</code>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="btn-game">
                <Link to="/">
                  <Home className="h-4 w-4 mr-2" />
                  Go Home
                </Link>
              </Button>
              
              <Button variant="outline" onClick={() => window.history.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Looking for something specific? Try navigating from the menu or go back to the home page to start a new game.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
