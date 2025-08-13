import { CheckCircle, Github, Settings as SettingsIcon, User, AlertTriangle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useGitHubAuth } from "@/services/githubAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Settings = () => {
  const { toast } = useToast();
  const { isAuthenticated, user, isLoading, error, login, logout } = useGitHubAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-4xl py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 flex items-center">
            <SettingsIcon className="h-8 w-8 mr-3" />
            Paramètres{" "}
            <span className="bg-gradient-to-r from-primary to-ai bg-clip-text text-transparent ml-2">
              GitHub
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Configurez votre connexion GitHub pour publier vos infographies
          </p>
        </div>

        <div className="space-y-8">
          {/* GitHub Connection Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Github className="h-5 w-5 mr-2" />
                Connexion GitHub
                {isAuthenticated && (
                  <Badge className="ml-2 bg-success text-success-foreground">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Connecté
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                Connectez votre compte GitHub pour publier automatiquement vos infographies
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert className="mb-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              {!isAuthenticated ? (
                <div className="space-y-4">
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Vous devez connecter votre compte GitHub pour pouvoir publier vos infographies sur GitHub Pages.
                      <br />
                      <strong>Note :</strong> Cette fonctionnalité nécessite la configuration d'une GitHub App OAuth. 
                      En attendant, vous pouvez créer manuellement vos repositories.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Configuration requise :</h4>
                    <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                      <li>Créer une GitHub App OAuth dans les paramètres développeur</li>
                      <li>Configurer l'URL de callback : <code className="bg-background px-1 rounded">{window.location.origin}/auth/github/callback</code></li>
                      <li>Ajouter les permissions : <code className="bg-background px-1 rounded">user:email, repo, public_repo</code></li>
                      <li>Configurer le Client ID dans les variables d'environnement</li>
                    </ol>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="action" 
                      onClick={login}
                      disabled={isLoading}
                      className="flex-1"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      {isLoading ? "Connexion..." : "Connecter avec GitHub"}
                    </Button>
                    
                    <Button variant="outline" asChild>
                      <a 
                        href="https://github.com/settings/applications/new" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Créer GitHub App
                      </a>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                    <img 
                      src={user?.avatar_url} 
                      alt="Avatar GitHub"
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{user?.name}</h3>
                      <p className="text-sm text-muted-foreground">@{user?.login}</p>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={logout}
                    >
                      Déconnecter
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Repository Settings */}
          {isAuthenticated && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <SettingsIcon className="h-5 w-5 mr-2" />
                  Paramètres de publication
                </CardTitle>
                <CardDescription>
                  Configurez comment vos infographies seront publiées
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="defaultRepo">Repository par défaut</Label>
                  <Input
                    id="defaultRepo"
                    placeholder="infographies"
                    defaultValue="infographies"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Nom du repository où seront stockées vos infographies
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="githubPages">Configuration GitHub Pages</Label>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">GitHub Pages activé</p>
                        <p className="text-sm text-muted-foreground">
                          Vos infographies seront automatiquement publiées
                        </p>
                      </div>
                      <Badge className="bg-success text-success-foreground">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Actif
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Permissions */}
          {isAuthenticated && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Permissions accordées
                </CardTitle>
                <CardDescription>
                  Permissions GitHub nécessaires au fonctionnement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Créer des repositories", granted: true },
                    { name: "Écrire dans les repositories", granted: true },
                    { name: "Activer GitHub Pages", granted: true },
                    { name: "Lire les informations du profil", granted: true }
                  ].map((permission, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm">{permission.name}</span>
                      {permission.granted ? (
                        <Badge className="bg-success text-success-foreground">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Accordée
                        </Badge>
                      ) : (
                        <Badge variant="destructive">Non accordée</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Settings;