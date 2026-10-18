# raphaelcardoso.com.br

Site pessoal de Raphael Cardoso. Astro estático, sem backend, publicado no GitHub Pages.

## Desenvolvimento local

Requer Node 22 ou superior.

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # verifica tipos e conteúdo, gera dist/
npm run preview   # serve dist/
```

## Onde editar cada coisa

| O quê | Onde |
|---|---|
| Nome, título, bio curta, texto "Sobre", SEO | `src/data/site.ts` |
| Redes sociais e contato | `src/data/socials.yaml` |
| Especialidades | `src/data/expertise.yaml` |
| Projetos | `src/content/projects/*.md` |
| Artigos | `src/content/writing/*.md` |
| Cores, tipografia, espaçamento | bloco `:root` em `src/styles/global.css` |
| Foto | `src/assets/profile.png` (depois rode `npm run og`) |

Nenhuma dessas mudanças exige alterar componentes. O build falha se um campo obrigatório estiver faltando ou se uma URL for inválida.

### Nova rede social
Acrescente um item em `socials.yaml` com `order` único. O `icon` precisa existir em `src/lib/icons.ts` (github, linkedin, x, instagram, facebook, blog, whatsapp). Para outro ícone, acrescente o nome do [Material Design Icons](https://pictogrammers.com/library/mdi/) ao mapa.

### Novo projeto
Crie `src/content/projects/nome.md`:

```md
---
title: "nome-do-projeto"
category: "Servidores MCP"
description: "Uma ou duas frases."
tags: ["MCP", "TypeScript"]
featured: true          # aparece na página inicial
order: 8
repo: ferronicardoso/nome-do-projeto   # opcional: estrelas e linguagem vêm do GitHub no build
links:                  # opcional
  - label: "Documentação"
    url: https://exemplo.com
---
```

Projeto privado ou corporativo: use `private: true`, omita `repo` e descreva sem dados confidenciais.

Os metadados do GitHub são buscados apenas durante o build. Se a API falhar, o site é gerado normalmente sem estrelas e linguagem.

### Novo artigo
- **Publicado em outro site:** crie `src/content/writing/slug.md` com `title`, `date`, `summary` e `url`. Só o frontmatter é necessário.
- **Publicado aqui:** o mesmo arquivo sem `url`, com o texto em Markdown no corpo. A página sai em `/escrita/slug/`.
- Use `draft: true` para esconder um rascunho.

## Publicação

O workflow `.github/workflows/deploy.yml` faz build e deploy a cada push em `main`, e semanalmente para atualizar estrelas dos repositórios.

Configuração única:
1. Crie o repositório `ferronicardoso.github.io` e envie este código para `main`.
2. Em **Settings → Pages → Build and deployment**, selecione **GitHub Actions**.

### Domínio personalizado (raphaelcardoso.com.br)
`public/CNAME` já contém o domínio. Falta o DNS:
- Domínio raiz (apex): registros `A` para `185.199.108.153`, `185.199.109.153`, `185.199.110.153` e `185.199.111.153`.
- `www`: registro `CNAME` para `ferronicardoso.github.io`.

Depois, em **Settings → Pages**, informe o domínio e ative **Enforce HTTPS** quando o certificado for emitido. Confira os IPs na [documentação do GitHub](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site) antes de configurar.

## Decisões técnicas

- **Astro** entrega HTML sem JavaScript por padrão e traz content collections tipadas, sitemap e otimização de imagem. O único script do site é o do botão de tema.
- **CSS com design tokens**, sem Tailwind: poucos componentes, e os tokens resolvem os temas claro e escuro.
- **Fontes do sistema**: nenhuma requisição externa de fonte.
- **Ícones** resolvidos no build a partir do `@iconify-json/mdi` (dependência de desenvolvimento). Nada de ícones vai como biblioteca para o navegador.
- **GitHub API** somente no build, nunca no navegador.
- **Imagem de compartilhamento** gerada por `npm run og` e versionada em `public/og.png`.
