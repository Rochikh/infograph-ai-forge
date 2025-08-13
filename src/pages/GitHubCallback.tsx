import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGitHubAuth } from "@/services/githubAuth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const GitHubCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { handleCallback } = useGitHubAuth();
  const { toast } = useToast();

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    if (error) {
      toast({
        title: "Erreur d'authentification",
        description: "L'authentification GitHub a été annulée ou a échoué.",
        variant: "destructive",
      });
      navigate('/settings');
      return;
    }

    if (code && state) {
      handleCallback(code, state).then(() => {
        toast({
          title: "Connexion réussie",
          description: "Votre compte GitHub a été connecté avec succès !",
        });
        navigate('/settings');
      }).catch((err) => {
        toast({
          title: "Erreur de connexion",
          description: err.message || "Une erreur est survenue lors de la connexion.",
          variant: "destructive",
        });
        navigate('/settings');
      });
    } else {
      navigate('/settings');
    }
  }, [searchParams, handleCallback, navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center">
            <Loader2 className="h-6 w-6 mr-2 animate-spin" />
            Connexion en cours...
          </CardTitle>
          <CardDescription>
            Finalisation de la connexion avec GitHub
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground">
          <p>Veuillez patienter pendant que nous établissons la connexion avec votre compte GitHub.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default GitHubCallback;