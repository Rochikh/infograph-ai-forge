import { Brain, Github, Heart, Lightbulb, Sparkles, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-4xl py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            À propos d'{" "}
            <span className="bg-gradient-to-r from-primary via-ai to-action bg-clip-text text-transparent">
              InfoGraph'IA
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Une application innovante qui démocratise la création d'infographies pédagogiques 
            grâce à l'intelligence artificielle
          </p>
        </div>

        {/* Mission */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Lightbulb className="h-6 w-6 mr-3 text-action" />
              Notre mission
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              InfoGraph'IA est né d'un constat simple : créer des infographies attrayantes et pédagogiques 
              demande du temps, des compétences en design et des outils coûteux. Nous avons voulu démocratiser 
              cette création en rendant le processus automatique et accessible à tous.
            </p>
            <p>
              Notre application utilise l'intelligence artificielle Perplexity pour analyser vos contenus, 
              en extraire les points essentiels, et génère automatiquement des infographies modernes 
              que vous pouvez partager immédiatement.
            </p>
          </CardContent>
        </Card>

        {/* How it works */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Comment ça fonctionne</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 mx-auto bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>1. Analyse IA</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Perplexity analyse votre article ou image et extrait automatiquement 
                  les points clés et le résumé
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 mx-auto bg-gradient-to-br from-ai to-ai-light rounded-xl flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-ai-foreground" />
                </div>
                <CardTitle>2. Génération</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Notre système génère une infographie moderne avec votre contenu, 
                  des pictogrammes et une mise en page responsive
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 mx-auto bg-gradient-to-br from-action to-action-light rounded-xl flex items-center justify-center mb-4">
                  <Github className="h-6 w-6 text-action-foreground" />
                </div>
                <CardTitle>3. Publication</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Votre infographie est automatiquement déployée sur GitHub Pages 
                  avec votre signature et licence Creative Commons
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Technologies */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Zap className="h-6 w-6 mr-3 text-ai" />
              Technologies utilisées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Intelligence Artificielle</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• API Perplexity pour l'analyse et la synthèse</li>
                  <li>• OCR Tesseract.js pour les images</li>
                  <li>• Traitement automatique du langage naturel</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Développement</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Frontend : React, TypeScript, TailwindCSS</li>
                  <li>• Backend : Node.js, Express</li>
                  <li>• Intégration : GitHub OAuth 2.0 & REST API</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Values */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Heart className="h-6 w-6 mr-3 text-red-500" />
              Nos valeurs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-action">Accessibilité</h3>
                  <p className="text-sm text-muted-foreground">
                    Rendre la création d'infographies accessible à tous, 
                    sans compétences techniques requises
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-primary">Pédagogie</h3>
                  <p className="text-sm text-muted-foreground">
                    Favoriser l'apprentissage et la transmission de connaissances 
                    par la visualisation
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-ai">Innovation</h3>
                  <p className="text-sm text-muted-foreground">
                    Utiliser l'IA pour automatiser les tâches répétitives 
                    et libérer la créativité
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-success">Partage libre</h3>
                  <p className="text-sm text-muted-foreground">
                    Encourager le partage de connaissances avec des licences 
                    Creative Commons
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="text-center bg-gradient-to-br from-muted/50 to-accent/50">
          <CardContent className="py-12">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">
                Prêt à créer votre première infographie ?
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Transformez vos idées en visualisations percutantes en quelques minutes
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="action" size="lg" asChild>
                  <a href="/create">Commencer maintenant</a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="/my-infographics">Voir des exemples</a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default About;