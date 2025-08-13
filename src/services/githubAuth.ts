import { useState, useEffect } from 'react';

// Types pour GitHub OAuth
export interface GitHubUser {
  id: number;
  login: string;
  name: string;
  email: string;
  avatar_url: string;
  html_url: string;
}

export interface GitHubAuthConfig {
  clientId: string;
  redirectUri: string;
  scope: string;
}

// Configuration GitHub OAuth
const GITHUB_CONFIG: GitHubAuthConfig = {
  clientId: import.meta.env.VITE_GITHUB_CLIENT_ID || 'demo-client-id',
  redirectUri: `${window.location.origin}/auth/github/callback`,
  scope: 'user:email,repo,public_repo'
};

// Mode démo pour le développement local
const DEMO_MODE = !import.meta.env.VITE_GITHUB_CLIENT_ID || import.meta.env.VITE_GITHUB_CLIENT_ID === 'demo-client-id';

export class GitHubAuthService {
  /**
   * Redirige vers GitHub pour l'authentification OAuth
   */
  static initiateAuth(): void {
    if (DEMO_MODE) {
      // Mode démo - simuler une connexion réussie
      this.simulateDemoAuth();
      return;
    }

    const params = new URLSearchParams({
      client_id: GITHUB_CONFIG.clientId,
      redirect_uri: GITHUB_CONFIG.redirectUri,
      scope: GITHUB_CONFIG.scope,
      response_type: 'code',
      state: this.generateState()
    });

    const authUrl = `https://github.com/login/oauth/authorize?${params.toString()}`;
    window.location.href = authUrl;
  }

  /**
   * Simule une authentification réussie en mode démo
   */
  private static simulateDemoAuth(): void {
    const demoUser: GitHubUser = {
      id: 12345,
      login: 'demo-user',
      name: 'Utilisateur Démo',
      email: 'demo@example.com',
      avatar_url: 'https://github.com/github.png',
      html_url: 'https://github.com/demo-user'
    };

    const demoToken = 'demo-token-' + Date.now();

    localStorage.setItem('github_access_token', demoToken);
    localStorage.setItem('github_user', JSON.stringify(demoUser));

    // Déclencher un événement pour mettre à jour l'état
    window.dispatchEvent(new CustomEvent('github-auth-success', { 
      detail: { user: demoUser, token: demoToken } 
    }));
    
    // Rediriger vers les paramètres
    window.location.href = '/settings';
  }

  /**
   * Génère un state aléatoire pour la sécurité OAuth
   */
  private static generateState(): string {
    const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('github_oauth_state', state);
    return state;
  }

  /**
   * Vérifie le state OAuth pour éviter les attaques CSRF
   */
  static verifyState(state: string): boolean {
    const storedState = localStorage.getItem('github_oauth_state');
    localStorage.removeItem('github_oauth_state');
    return storedState === state;
  }

  /**
   * Échange le code OAuth contre un token d'accès
   */
  static async exchangeCodeForToken(code: string): Promise<string> {
    try {
      // En production, cet appel doit passer par votre backend pour sécuriser le client_secret
      const response = await fetch('/api/auth/github/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          client_id: GITHUB_CONFIG.clientId,
          redirect_uri: GITHUB_CONFIG.redirectUri,
        }),
      });

      if (!response.ok) {
        throw new Error('Échec de l\'échange du code OAuth');
      }

      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error('Erreur lors de l\'échange du code OAuth:', error);
      throw error;
    }
  }

  /**
   * Récupère les informations de l'utilisateur GitHub
   */
  static async getUserInfo(accessToken: string): Promise<GitHubUser> {
    try {
      const response = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      if (!response.ok) {
        throw new Error('Impossible de récupérer les informations utilisateur');
      }

      const user = await response.json();
      
      // Récupérer l'email si il n'est pas public
      if (!user.email) {
        const emailResponse = await fetch('https://api.github.com/user/emails', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/vnd.github.v3+json',
          },
        });

        if (emailResponse.ok) {
          const emails = await emailResponse.json();
          const primaryEmail = emails.find((email: any) => email.primary);
          user.email = primaryEmail?.email || '';
        }
      }

      return user;
    } catch (error) {
      console.error('Erreur lors de la récupération des informations utilisateur:', error);
      throw error;
    }
  }

  /**
   * Créé un repository GitHub
   */
  static async createRepository(accessToken: string, name: string, description: string): Promise<any> {
    try {
      const response = await fetch('https://api.github.com/user/repos', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          public: true,
          auto_init: true,
          has_pages: true,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Impossible de créer le repository');
      }

      return response.json();
    } catch (error) {
      console.error('Erreur lors de la création du repository:', error);
      throw error;
    }
  }

  /**
   * Active GitHub Pages pour un repository
   */
  static async enableGitHubPages(accessToken: string, owner: string, repo: string): Promise<any> {
    try {
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/pages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: {
            branch: 'main',
            path: '/'
          }
        }),
      });

      if (response.status === 409) {
        // GitHub Pages déjà activé
        return { message: 'GitHub Pages déjà activé' };
      }

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Impossible d\'activer GitHub Pages');
      }

      return response.json();
    } catch (error) {
      console.error('Erreur lors de l\'activation de GitHub Pages:', error);
      throw error;
    }
  }

  /**
   * Commit des fichiers vers un repository
   */
  static async commitFiles(
    accessToken: string, 
    owner: string, 
    repo: string, 
    files: { path: string; content: string }[],
    message: string
  ): Promise<any> {
    try {
      // Récupérer le SHA du dernier commit
      const branchResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/ref/heads/main`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      if (!branchResponse.ok) {
        throw new Error('Impossible de récupérer les informations de la branche');
      }

      const branchData = await branchResponse.json();
      const latestCommitSha = branchData.object.sha;

      // Créer un blob pour chaque fichier
      const blobs = await Promise.all(files.map(async (file) => {
        const blobResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/blobs`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: file.content,
            encoding: 'utf-8',
          }),
        });

        if (!blobResponse.ok) {
          throw new Error(`Impossible de créer le blob pour ${file.path}`);
        }

        const blobData = await blobResponse.json();
        return {
          path: file.path,
          mode: '100644',
          type: 'blob',
          sha: blobData.sha,
        };
      }));

      // Créer un tree
      const treeResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          base_tree: latestCommitSha,
          tree: blobs,
        }),
      });

      if (!treeResponse.ok) {
        throw new Error('Impossible de créer le tree');
      }

      const treeData = await treeResponse.json();

      // Créer un commit
      const commitResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/commits`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          tree: treeData.sha,
          parents: [latestCommitSha],
        }),
      });

      if (!commitResponse.ok) {
        throw new Error('Impossible de créer le commit');
      }

      const commitData = await commitResponse.json();

      // Mettre à jour la référence
      const refResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/refs/heads/main`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sha: commitData.sha,
        }),
      });

      if (!refResponse.ok) {
        throw new Error('Impossible de mettre à jour la référence');
      }

      return commitData;
    } catch (error) {
      console.error('Erreur lors du commit:', error);
      throw error;
    }
  }
}

// Hook pour gérer l'authentification GitHub
export const useGitHubAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Vérifier si un token existe dans le localStorage
    const storedToken = localStorage.getItem('github_access_token');
    const storedUser = localStorage.getItem('github_user');

    if (storedToken && storedUser) {
      setAccessToken(storedToken);
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }

    // Écouter l'événement d'authentification démo
    const handleDemoAuth = (event: CustomEvent) => {
      const { user, token } = event.detail;
      setAccessToken(token);
      setUser(user);
      setIsAuthenticated(true);
      setIsLoading(false);
    };

    window.addEventListener('github-auth-success', handleDemoAuth as EventListener);

    return () => {
      window.removeEventListener('github-auth-success', handleDemoAuth as EventListener);
    };
  }, []);

  const login = () => {
    setIsLoading(true);
    setError(null);
    GitHubAuthService.initiateAuth();
  };

  const logout = () => {
    localStorage.removeItem('github_access_token');
    localStorage.removeItem('github_user');
    setAccessToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const handleCallback = async (code: string, state: string) => {
    if (!GitHubAuthService.verifyState(state)) {
      setError('État OAuth invalide');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const token = await GitHubAuthService.exchangeCodeForToken(code);
      const userInfo = await GitHubAuthService.getUserInfo(token);

      localStorage.setItem('github_access_token', token);
      localStorage.setItem('github_user', JSON.stringify(userInfo));

      setAccessToken(token);
      setUser(userInfo);
      setIsAuthenticated(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isAuthenticated,
    user,
    accessToken,
    isLoading,
    error,
    login,
    logout,
    handleCallback,
  };
};