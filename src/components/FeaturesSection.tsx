import { Brain, FileText, Github, Image, Palette, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: FileText,
    title: "Analyse intelligente",
    description: "Collez simplement le lien de votre article ou uploadez une image avec titre. Notre IA extrait automatiquement les points clés.",
    gradient: "from-primary to-primary-light"
  },
  {
    icon: Brain,
    title: "IA Perplexity",
    description: "Utilise la puissance de Perplexity pour résumer le contenu et identifier les éléments les plus importants.",
    gradient: "from-ai to-ai-light"
  },
  {
    icon: Palette,
    title: "Design moderne",
    description: "Génère automatiquement des infographies avec une mise en page responsive, des couleurs vives et une typographie moderne.",
    gradient: "from-action to-action-light"
  },
  {
    icon: Image,
    title: "Pictogrammes intégrés",
    description: "Ajoute automatiquement des icônes et pictogrammes parlants pour illustrer vos points clés de manière visuelle.",
    gradient: "from-success to-emerald-500"
  },
  {
    icon: Github,
    title: "Publication GitHub",
    description: "Déploie automatiquement votre infographie sur GitHub Pages avec commit et activation de la page publique.",
    gradient: "from-purple-500 to-purple-600"
  },
  {
    icon: Zap,
    title: "Rapide et efficace",
    description: "De l'article à l'infographie publiée en quelques minutes seulement. Signature automatique et licence Creative Commons.",
    gradient: "from-orange-500 to-red-500"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container max-w-6xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Comment ça{" "}
            <span className="bg-gradient-to-r from-primary to-ai bg-clip-text text-transparent">
              fonctionne
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            De votre article à votre infographie publiée, tout est automatisé grâce à l'intelligence artificielle
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 group hover:shadow-lg">
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;