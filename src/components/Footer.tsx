import { Brain, Github, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container max-w-6xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Brain className="h-6 w-6 text-ai" />
              <span className="text-lg font-bold bg-gradient-to-r from-primary to-ai bg-clip-text text-transparent">
                InfoGraph'IA
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Transformez vos articles en infographies pédagogiques avec l'intelligence artificielle.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-3">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/create" className="text-muted-foreground hover:text-foreground transition-colors">
                  Créer une infographie
                </Link>
              </li>
              <li>
                <Link to="/my-infographics" className="text-muted-foreground hover:text-foreground transition-colors">
                  Mes infographies
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/settings" className="text-muted-foreground hover:text-foreground transition-colors">
                  Paramètres GitHub
                </Link>
              </li>
              <li>
                <a 
                  href="https://github.com" 
                  className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-3 w-3 mr-1" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Licence */}
          <div>
            <h3 className="font-semibold mb-3">Licence</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Toutes les infographies générées sont sous licence Creative Commons.
            </p>
            <div className="flex items-center text-sm text-muted-foreground">
              <span>Fait avec</span>
              <Heart className="h-3 w-3 mx-1 text-red-500" />
              <span>et de l'IA</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2024 InfoGraph'IA. Généré avec l'intelligence artificielle.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;