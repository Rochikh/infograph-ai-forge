import { Download, Edit, Github, Share2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface InfographicData {
  title: string;
  summary: string;
  keyPoints: string[];
  author: string;
  license: string;
  sourceUrl?: string;
}

interface InfographicPreviewProps {
  data: InfographicData;
  onEdit: () => void;
  onPublish: () => void;
  isPublishing?: boolean;
}

const InfographicPreview = ({ data, onEdit, onPublish, isPublishing = false }: InfographicPreviewProps) => {
  const handleDownload = () => {
    // Générer le fichier HTML et le télécharger
    const htmlContent = generateInfographicHTML(data);
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Actions header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-muted/30 rounded-lg">
        <div className="flex items-center space-x-2">
          <Eye className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Aperçu de votre infographie</h2>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Télécharger HTML
          </Button>
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Modifier
          </Button>
          <Button 
            variant="action" 
            size="sm" 
            onClick={onPublish}
            disabled={isPublishing}
          >
            <Github className="h-4 w-4 mr-2" />
            {isPublishing ? "Publication..." : "Publier sur GitHub"}
          </Button>
        </div>
      </div>

      {/* Preview iframe */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-ai/5">
          <CardTitle className="flex items-center justify-between">
            <span>Aperçu interactif</span>
            <Badge variant="secondary">Responsive</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="bg-white">
            <iframe
              title="Aperçu de l'infographie"
              srcDoc={generateInfographicHTML(data)}
              className="w-full h-[600px] border-0"
              sandbox="allow-same-origin"
            />
          </div>
        </CardContent>
      </Card>

      {/* Metadata */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Informations de publication</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-muted-foreground">Auteur :</span>
              <span className="ml-2">{data.author}</span>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Licence :</span>
              <span className="ml-2">{data.license}</span>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Points clés :</span>
              <span className="ml-2">{data.keyPoints.length} éléments</span>
            </div>
            {data.sourceUrl && (
              <div>
                <span className="font-medium text-muted-foreground">Source :</span>
                <a 
                  href={data.sourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ml-2 text-primary hover:underline"
                >
                  Voir l'article original
                </a>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Génère le HTML de l'infographie
const generateInfographicHTML = (data: InfographicData): string => {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.title}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        body { font-family: 'Inter', sans-serif; }
        .gradient-bg { background: linear-gradient(135deg, #1e40af 0%, #7c3aed 50%, #f97316 100%); }
        .card-shadow { box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1); }
        .icon-gradient { background: linear-gradient(135deg, #3b82f6, #8b5cf6); }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.6s ease-out; }
        .animate-delay-1 { animation-delay: 0.1s; }
        .animate-delay-2 { animation-delay: 0.2s; }
        .animate-delay-3 { animation-delay: 0.3s; }
    </style>
</head>
<body class="bg-gray-50 min-h-screen py-8">
    <div class="max-w-4xl mx-auto px-4">
        <!-- Header -->
        <header class="text-center mb-12 animate-fade-in-up">
            <div class="gradient-bg text-white p-8 rounded-2xl card-shadow">
                <h1 class="text-3xl md:text-4xl font-bold mb-4">${data.title}</h1>
                <div class="flex items-center justify-center space-x-4 text-sm opacity-90">
                    <span><i class="fas fa-user mr-2"></i>${data.author}</span>
                    <span><i class="fas fa-creative-commons mr-2"></i>${data.license}</span>
                    <span><i class="fas fa-calendar mr-2"></i>${new Date().toLocaleDateString('fr-FR')}</span>
                </div>
            </div>
        </header>

        <!-- Summary -->
        <section class="mb-12 animate-fade-in-up animate-delay-1">
            <div class="bg-white rounded-xl p-6 card-shadow">
                <div class="flex items-center mb-4">
                    <div class="w-8 h-8 icon-gradient rounded-lg flex items-center justify-center text-white mr-3">
                        <i class="fas fa-book-open"></i>
                    </div>
                    <h2 class="text-xl font-semibold text-gray-800">Résumé</h2>
                </div>
                <p class="text-gray-600 leading-relaxed">${data.summary}</p>
            </div>
        </section>

        <!-- Key Points -->
        <section class="mb-12 animate-fade-in-up animate-delay-2">
            <div class="text-center mb-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-2">Points clés</h2>
                <div class="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded"></div>
            </div>
            
            <div class="grid md:grid-cols-2 gap-6">
                ${data.keyPoints.map((point, index) => `
                    <div class="bg-white rounded-xl p-6 card-shadow hover:shadow-lg transition-shadow">
                        <div class="flex items-start space-x-3">
                            <div class="w-8 h-8 icon-gradient rounded-lg flex items-center justify-center text-white flex-shrink-0 mt-1">
                                <span class="text-sm font-bold">${index + 1}</span>
                            </div>
                            <p class="text-gray-600 leading-relaxed">${point}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>

        <!-- Call to Action -->
        <section class="text-center mb-12 animate-fade-in-up animate-delay-3">
            <div class="gradient-bg text-white p-8 rounded-2xl card-shadow">
                <h3 class="text-xl font-semibold mb-2">Partagez cette infographie</h3>
                <p class="opacity-90 mb-4">Aidez à diffuser ces connaissances importantes</p>
                <div class="flex justify-center space-x-4">
                    <button onclick="shareInfographic()" class="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                        <i class="fas fa-share-alt mr-2"></i>Partager
                    </button>
                    <button onclick="copyLink()" class="bg-white/20 text-white px-6 py-2 rounded-lg font-medium hover:bg-white/30 transition-colors">
                        <i class="fas fa-link mr-2"></i>Copier le lien
                    </button>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="text-center text-gray-500 text-sm">
            <div class="border-t pt-6">
                <p class="mb-2">
                    Créé par <strong>${data.author}</strong> • 
                    Licence <strong>${data.license}</strong>
                </p>
                <p class="flex items-center justify-center space-x-2">
                    <span>Généré avec</span>
                    <i class="fas fa-heart text-red-500"></i>
                    <span>par InfoGraph'IA</span>
                </p>
            </div>
        </footer>
    </div>

    <script>
        function shareInfographic() {
            if (navigator.share) {
                navigator.share({
                    title: '${data.title}',
                    text: '${data.summary.substring(0, 100)}...',
                    url: window.location.href
                });
            } else {
                copyLink();
            }
        }

        function copyLink() {
            navigator.clipboard.writeText(window.location.href).then(() => {
                alert('Lien copié dans le presse-papiers !');
            });
        }

        // Animation au scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-fade-in-up').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        });
    </script>
</body>
</html>`;
};

export default InfographicPreview;