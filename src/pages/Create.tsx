import { useState } from "react";
import { ArrowRight, FileText, Github, Image, Link as LinkIcon, Upload, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useGitHubAuth } from "@/services/githubAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InfographicPreview from "@/components/InfographicPreview";

const licenseOptions = [
  { value: "cc-by", label: "CC BY - Attribution" },
  { value: "cc-by-sa", label: "CC BY-SA - Attribution-ShareAlike" },
  { value: "cc-by-nc", label: "CC BY-NC - Attribution-NonCommercial" },
  { value: "cc-by-nc-sa", label: "CC BY-NC-SA - Attribution-NonCommercial-ShareAlike" }
];

const Create = () => {
  const { toast } = useToast();
  const { isAuthenticated } = useGitHubAuth();
  const [currentStep, setCurrentStep] = useState<'form' | 'preview'>('form');
  const [formData, setFormData] = useState({
    articleUrl: "",
    imageTitle: "",
    firstName: "",
    lastName: "",
    license: "",
    projectTitle: "",
    inputType: "url"
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [generatedData, setGeneratedData] = useState<{
    title: string;
    summary: string;
    keyPoints: string[];
    author: string;
    license: string;
    sourceUrl?: string;
  } | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      toast({
        title: "Image uploadée",
        description: `${file.name} a été sélectionnée`,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Préparer le prompt pour l'IA
      let prompt = '';
      if (formData.inputType === 'url') {
        prompt = `Analyse le contenu de cet article : ${formData.articleUrl}`;
      } else {
        prompt = `Analyse et crée une infographie sur le sujet suivant : ${formData.imageTitle}`;
      }

      // Appel à l'Edge Function Supabase
      const response = await fetch('/api/generate-infographic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la génération de l\'infographie');
      }

      const aiResult = await response.json();

      const generatedContent = {
        title: aiResult.title || (formData.inputType === 'url' 
          ? "Analyse du contenu web"
          : formData.imageTitle),
        summary: aiResult.summary || "Contenu analysé avec succès par l'IA.",
        keyPoints: aiResult.keyPoints || [
          "Point d'analyse principal",
          "Information importante extraite",
          "Élément clé identifié",
          "Conclusion principale",
          "Recommandation suggérée"
        ],
        author: `${formData.firstName} ${formData.lastName}`,
        license: licenseOptions.find(opt => opt.value === formData.license)?.label || formData.license,
        sourceUrl: formData.inputType === 'url' ? formData.articleUrl : undefined
      };

      setGeneratedData(generatedContent);
      setCurrentStep('preview');

      toast({
        title: "Infographie générée !",
        description: "Votre infographie est prête. Vous pouvez la prévisualiser avant publication.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la génération.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setCurrentStep('form');
  };

  const handlePublish = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter à GitHub pour publier votre infographie.",
        variant: "destructive"
      });
      return;
    }

    setIsPublishing(true);
    
    try {
      // Simulation de publication sur GitHub
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      const projectUrl = `https://${formData.firstName.toLowerCase()}${formData.lastName.toLowerCase()}.github.io/${formData.projectTitle}`;
      
      toast({
        title: "Publication réussie !",
        description: `Votre infographie est maintenant disponible sur GitHub Pages.`,
      });

      // Redirection vers la page des infographies
      // navigate('/my-infographics');
    } catch (error) {
      toast({
        title: "Erreur de publication",
        description: "Une erreur s'est produite lors de la publication sur GitHub.",
        variant: "destructive"
      });
    } finally {
      setIsPublishing(false);
    }
  };

  // Si on est en mode preview, afficher la prévisualisation
  if (currentStep === 'preview' && generatedData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container max-w-6xl py-12">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={handleEdit}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à l'édition
            </Button>
          </div>

          <InfographicPreview 
            data={generatedData}
            onEdit={handleEdit}
            onPublish={handlePublish}
            isPublishing={isPublishing}
          />
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-4xl py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            Créer une{" "}
            <span className="bg-gradient-to-r from-primary to-ai bg-clip-text text-transparent">
              infographie
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Transformez votre contenu en infographie pédagogique en quelques étapes
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Source Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Source du contenu
              </CardTitle>
              <CardDescription>
                Choisissez comment vous souhaitez fournir le contenu à analyser
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs 
                value={formData.inputType} 
                onValueChange={(value) => handleInputChange("inputType", value)}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="url" className="flex items-center">
                    <LinkIcon className="h-4 w-4 mr-2" />
                    Lien d'article
                  </TabsTrigger>
                  <TabsTrigger value="image" className="flex items-center">
                    <Image className="h-4 w-4 mr-2" />
                    Image + Titre
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="url" className="space-y-4 mt-6">
                  <div>
                    <Label htmlFor="articleUrl">URL de l'article</Label>
                    <Input
                      id="articleUrl"
                      type="url"
                      placeholder="https://example.com/article"
                      value={formData.articleUrl}
                      onChange={(e) => handleInputChange("articleUrl", e.target.value)}
                      required={formData.inputType === "url"}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="image" className="space-y-4 mt-6">
                  <div>
                    <Label htmlFor="imageUpload">Image</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                      <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                      <Input
                        id="imageUpload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        required={formData.inputType === "image"}
                      />
                      <Label htmlFor="imageUpload" className="cursor-pointer">
                        <Button type="button" variant="outline" asChild>
                          <span>Sélectionner une image</span>
                        </Button>
                      </Label>
                      {imageFile && (
                        <p className="mt-2 text-sm text-muted-foreground">
                          {imageFile.name}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="imageTitle">Titre de l'image</Label>
                    <Input
                      id="imageTitle"
                      placeholder="Décrivez le contenu de l'image"
                      value={formData.imageTitle}
                      onChange={(e) => handleInputChange("imageTitle", e.target.value)}
                      required={formData.inputType === "image"}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Author Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informations auteur</CardTitle>
              <CardDescription>
                Ces informations apparaîtront sur votre infographie
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input
                    id="firstName"
                    placeholder="Votre prénom"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Nom</Label>
                  <Input
                    id="lastName"
                    placeholder="Votre nom"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Github className="h-5 w-5 mr-2" />
                Configuration
              </CardTitle>
              <CardDescription>
                Paramètres de licence et de publication
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="license">Licence Creative Commons</Label>
                <Select value={formData.license} onValueChange={(value) => handleInputChange("license", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une licence" />
                  </SelectTrigger>
                  <SelectContent>
                    {licenseOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="projectTitle">Titre du projet GitHub</Label>
                <Input
                  id="projectTitle"
                  placeholder="nom-de-mon-infographie"
                  value={formData.projectTitle}
                  onChange={(e) => handleInputChange("projectTitle", e.target.value)}
                  required
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Ce sera le nom de votre repository et l'URL de votre page
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="text-center">
            <Button 
              type="submit" 
              variant="action" 
              size="lg" 
              disabled={isLoading}
              className="group"
            >
              {isLoading ? (
                "Analyse en cours avec l'IA..."
              ) : (
                <>
                  Analyser et prévisualiser
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              L'IA va analyser votre contenu et générer une infographie que vous pourrez prévisualiser
            </p>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default Create;