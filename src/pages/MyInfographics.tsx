import { Calendar, ExternalLink, Eye, Github, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Données mockées pour l'exemple
const mockInfographics = [
  {
    id: "1",
    title: "L'IA peut être intégrée de manière responsable dans les salles de classe",
    url: "https://ia-classe.rochane.fr/",
    createdAt: "2024-01-15",
    status: "published",
    license: "CC BY-SA",
    views: 234,
    githubRepo: "ia-classe-infographie"
  },
  {
    id: "2", 
    title: "Les impacts du changement climatique sur l'agriculture",
    url: "https://climat-agriculture.rochane.fr/",
    createdAt: "2024-01-10",
    status: "published",
    license: "CC BY",
    views: 156,
    githubRepo: "climat-agriculture"
  },
  {
    id: "3",
    title: "Cybersécurité : Guide des bonnes pratiques",
    url: "",
    createdAt: "2024-01-08",
    status: "generating",
    license: "CC BY-NC",
    views: 0,
    githubRepo: "cybersecurite-guide"
  }
];

const MyInfographics = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-success text-success-foreground">Publié</Badge>;
      case "generating":
        return <Badge variant="secondary">En génération</Badge>;
      default:
        return <Badge variant="outline">Brouillon</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-6xl py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            Mes{" "}
            <span className="bg-gradient-to-r from-primary to-ai bg-clip-text text-transparent">
              infographies
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Retrouvez toutes vos infographies générées et gérez leur publication
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl font-bold text-primary">
                {mockInfographics.filter(i => i.status === "published").length}
              </CardTitle>
              <CardDescription>Infographies publiées</CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl font-bold text-ai">
                {mockInfographics.reduce((total, i) => total + i.views, 0)}
              </CardTitle>
              <CardDescription>Vues totales</CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl font-bold text-action">
                {mockInfographics.filter(i => i.status === "generating").length}
              </CardTitle>
              <CardDescription>En cours de génération</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Infographics List */}
        <div className="space-y-6">
          {mockInfographics.map((infographic) => (
            <Card key={infographic.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CardTitle className="text-lg">{infographic.title}</CardTitle>
                      {getStatusBadge(infographic.status)}
                    </div>
                    <CardDescription className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(infographic.createdAt).toLocaleDateString('fr-FR')}
                      </span>
                      <span>Licence: {infographic.license}</span>
                      {infographic.status === "published" && (
                        <span className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {infographic.views} vues
                        </span>
                      )}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {infographic.status === "published" && infographic.url && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={infographic.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Voir l'infographie
                      </a>
                    </Button>
                  )}
                  
                  <Button variant="outline" size="sm" asChild>
                    <a 
                      href={`https://github.com/username/${infographic.githubRepo}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      Repository GitHub
                    </a>
                  </Button>
                  
                  {infographic.status === "published" && (
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Partager
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {mockInfographics.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-muted to-accent rounded-xl flex items-center justify-center">
                  <Eye className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Aucune infographie</h3>
                  <p className="text-muted-foreground mb-4">
                    Vous n'avez pas encore créé d'infographie. Commencez dès maintenant !
                  </p>
                  <Button variant="action" asChild>
                    <a href="/create">Créer ma première infographie</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MyInfographics;