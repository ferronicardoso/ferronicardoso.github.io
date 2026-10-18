import mdi from '@iconify-json/mdi/icons.json' with { type: 'json' };

// Ícones resolvidos no build: nenhum JavaScript ou fonte de ícones vai para o navegador.
// Para um ícone novo, acrescente o nome do Material Design Icons (mdi) abaixo.
const fromMdi: Record<string, string> = {
  github: 'github',
  linkedin: 'linkedin',
  instagram: 'instagram',
  facebook: 'facebook',
  blog: 'rss',
  whatsapp: 'whatsapp',
  external: 'arrow-top-right',
  star: 'star-outline',
  repo: 'source-branch',
  sun: 'weather-sunny',
  moon: 'weather-night',
};

const custom: Record<string, string> = {
  // Logotipo do X (viewBox 24x24).
  x: '<path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>',
};

const icons = mdi.icons as Record<string, { body: string }>;

export function iconBody(name: string): string {
  if (custom[name]) return custom[name];
  const key = fromMdi[name];
  const icon = key ? icons[key] : undefined;
  if (!icon) throw new Error(`Ícone desconhecido: "${name}". Veja src/lib/icons.ts.`);
  return icon.body;
}
