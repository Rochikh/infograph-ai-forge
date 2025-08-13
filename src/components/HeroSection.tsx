import { ArrowRight, Brain, FileText, Image, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-20 -right-20 w-96 h-96 bg-gradient-to-br from-primary/20 to-ai/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-br from-action/20 to-ai/20 rounded-full blur-3xl" />

      <div className="container relative max-w-6xl py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-ai/10 border border-primary/20">
              <Sparkles className="h-4 w-4 text-action mr-2" />
              <span className="text-sm font-medium text-primary">
                Propulsé par l'IA Perplexity
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Transformez vos{" "}
                <span className="bg-gradient-to-r from-primary via-ai to-action bg-clip-text text-transparent">
                  articles
                </span>{" "}
                en infographies
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                InfoGraph'IA utilise l'intelligence artificielle pour extraire les points clés 
                de vos articles et génère automatiquement des infographies modernes et pédagogiques, 
                prêtes à être publiées sur GitHub Pages.
              </p>
            </div>

            {/* Features highlights */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center">
                  <FileText className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-sm font-medium">Analyse automatique</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-ai to-ai-light rounded-lg flex items-center justify-center">
                  <Brain className="h-4 w-4 text-ai-foreground" />
                </div>
                <span className="text-sm font-medium">IA Perplexity</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-action to-action-light rounded-lg flex items-center justify-center">
                  <Image className="h-4 w-4 text-action-foreground" />
                </div>
                <span className="text-sm font-medium">Design moderne</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-success to-emerald-500 rounded-lg flex items-center justify-center">
                  <ArrowRight className="h-4 w-4 text-success-foreground" />
                </div>
                <span className="text-sm font-medium">Publication automatique</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="action" size="lg" asChild className="group">
                <Link to="/create">
                  Créer votre première infographie
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/about">En savoir plus</Link>
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative lg:order-2">
            <div className="relative">
              <img
                src={heroImage}
                alt="Interface InfoGraph'IA montrant la génération d'infographies par IA"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              {/* Overlay effects */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-action/20 rounded-2xl" />
              <div className="absolute -inset-4 bg-gradient-to-r from-primary via-ai to-action opacity-20 blur-xl rounded-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;