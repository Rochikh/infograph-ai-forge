import { Brain, Github, Menu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-6xl items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="relative">
            <Brain className="h-8 w-8 text-ai" />
            <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-action" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-ai bg-clip-text text-transparent">
            InfoGraph'IA
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors ${
              isActive("/") ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Accueil
          </Link>
          <Link
            to="/create"
            className={`text-sm font-medium transition-colors ${
              isActive("/create") ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Créer une infographie
          </Link>
          <Link
            to="/my-infographics"
            className={`text-sm font-medium transition-colors ${
              isActive("/my-infographics") ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Mes infographies
          </Link>
          <Link
            to="/settings"
            className={`text-sm font-medium transition-colors ${
              isActive("/settings") ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Paramètres GitHub
          </Link>
          <Link
            to="/about"
            className={`text-sm font-medium transition-colors ${
              isActive("/about") ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            À propos
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Github className="h-4 w-4 mr-2" />
            Connecter GitHub
          </Button>
          <Button variant="action" size="sm" asChild>
            <Link to="/create">Créer</Link>
          </Button>
          
          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;