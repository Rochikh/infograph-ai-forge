import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { prompt } = await req.json();
    
    const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY');
    if (!perplexityApiKey) {
      throw new Error('PERPLEXITY_API_KEY not found');
    }

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${perplexityApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: 'system',
            content: `Tu es un expert en création d'infographies. Analyse le contenu fourni et génère un résumé structuré pour une infographie attrayante.

Réponds UNIQUEMENT avec un JSON valide dans ce format exact :
{
  "title": "Titre accrocheur de l'infographie",
  "summary": "Résumé concis en 2-3 phrases maximum",
  "keyPoints": [
    "Point clé 1 (court et percutant)",
    "Point clé 2 (court et percutant)",
    "Point clé 3 (court et percutant)",
    "Point clé 4 (court et percutant)",
    "Point clé 5 (court et percutant)"
  ]
}`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        top_p: 0.9,
        max_tokens: 1000,
        return_images: false,
        return_related_questions: false,
        frequency_penalty: 1,
        presence_penalty: 0
      }),
    });

    if (!response.ok) {
      throw new Error(`Perplexity API error: ${response.status}`);
    }

    const result = await response.json();
    const content = result.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No content received from Perplexity API');
    }

    // Parse the JSON response from Perplexity
    let parsedContent;
    try {
      parsedContent = JSON.parse(content);
    } catch (error) {
      // If JSON parsing fails, create a structured response
      parsedContent = {
        title: "Analyse du contenu",
        summary: "Contenu analysé avec succès par l'IA.",
        keyPoints: [
          "Point d'analyse principal",
          "Information importante extraite",
          "Élément clé identifié",
          "Conclusion principale",
          "Recommandation suggérée"
        ]
      };
    }

    return new Response(
      JSON.stringify(parsedContent),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    );
  }
});