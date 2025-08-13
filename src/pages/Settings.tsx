import { useState } from "react";
import { CheckCircle, Github, Settings as SettingsIcon, User, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Settings = () => {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [githubUser, setGithubUser] = useState({
    username: "",
    name: "",
    email: "",
    avatar: ""
  });

  const handleGithubConnect = () => {
    // Simulation de la connexion OAuth GitHub
    setIsConnected(true);
    setGithubUser({
      username: "johndoe",
      name: "John Doe",
      email: "john.doe@email.com",
      avatar: "https://github.com/johndoe.png"
    });
    
    toast({
      title: "GitHub connecté",
      description: "Votre compte GitHub a été connecté avec succès",
    });
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setGithubUser({
      username: "",
      name: "",
      email: "",
      avatar: ""
    });
    
    toast({
      title: "GitHub déconnecté",
      description: "Votre compte GitHub a été déconnecté",
    });
  };

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
                {isConnected && (
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
              {!isConnected ? (
                <div className="space-y-4">
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Vous devez connecter votre compte GitHub pour pouvoir publier vos infographies sur GitHub Pages.
                    </AlertDescription>
                  </Alert>
                  
                  <Button 
                    variant="action" 
                    onClick={handleGithubConnect}
                    className="w-full sm:w-auto"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    Connecter avec GitHub
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                    <img 
                      src={githubUser.avatar} 
                      alt="Avatar GitHub"
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{githubUser.name}</h3>
                      <p className="text-sm text-muted-foreground">@{githubUser.username}</p>
                      <p className="text-sm text-muted-foreground">{githubUser.email}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleDisconnect}
                    >
                      Déconnecter
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Repository Settings */}
          {isConnected && (
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
          {isConnected && (
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