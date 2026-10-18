export interface RepoMeta {
  stars: number;
  language: string | null;
  pushedAt: string;
}

const cache = new Map<string, Promise<RepoMeta | null>>();

// Consulta a API pública do GitHub só durante o build. Qualquer falha devolve null
// e o site é gerado normalmente com o conteúdo dos arquivos.
export function getRepoMeta(repo: string): Promise<RepoMeta | null> {
  let hit = cache.get(repo);
  if (!hit) {
    hit = fetchMeta(repo);
    cache.set(repo, hit);
  }
  return hit;
}

async function fetchMeta(repo: string): Promise<RepoMeta | null> {
  try {
    const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      headers,
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      stargazers_count: number;
      language: string | null;
      pushed_at: string;
    };
    return { stars: data.stargazers_count, language: data.language, pushedAt: data.pushed_at };
  } catch {
    return null;
  }
}
