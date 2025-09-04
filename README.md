# 🧑‍💼 Expert Manager

Painel web desenvolvido para automatizar o lançamento de **tickets** no sistema **Expert Connect**, que antes era feito manualmente e de forma individual no site.  
Com esta aplicação, é possível realizar a abertura de tickets em massa via **API oficial**, reduzindo drasticamente o esforço operacional e aumentando a eficiência da equipe.  

---

## 🚀 Tecnologias e Stack

- **React + TypeScript** → base do front-end.  
- **Vite** → bundler e ambiente de desenvolvimento rápido.  
- **TailwindCSS** → estilização moderna e responsiva.  
- **ShadCN/UI** → componentes acessíveis e prontos para produção.  
- **Lucide React** → ícones leves e personalizáveis.  
- **Axios / Fetch API** → comunicação com a API do Expert Connect.  
- **React Hook Form + Zod** → gerenciamento de formulários e validação.  

---

## ✨ Funcionalidades

- Lançamento de tickets em massa diretamente via **API Expert Connect**.  
- Redução significativa do esforço manual na criação de tickets.  
- Formulários dinâmicos com validação automática.  
- Interface simples e intuitiva para a equipe operacional.  
- Histórico de lançamentos e feedback de erros/sucessos da API.  
- Estilização moderna com **Tailwind** + **ShadCN/UI**.  

---

## 📂 Estrutura do Projeto

```
expert-manager/
 ├── src/
 │   ├── components/     # Componentes reutilizáveis (UI, formulários, tabelas)
 │   ├── pages/          # Páginas principais do painel
 │   ├── services/       # Conexão com a API Expert Connect
 │   ├── hooks/          # Hooks customizados
 │   └── utils/          # Funções auxiliares
 ├── public/             # Arquivos estáticos
 ├── package.json        # Dependências e scripts
 └── tailwind.config.js  # Configuração do Tailwind
```

---

## 🛠️ Scripts principais

- `npm run dev` → inicia o servidor de desenvolvimento (Vite).  
- `npm run build` → gera a versão de produção.  
- `npm run lint` → validação de código com ESLint.  
- `npm run preview` → pré-visualiza a build de produção.  

---

## 🎯 Impacto

Antes do painel, o lançamento de tickets era feito manualmente no site, **um a um**, consumindo muito tempo da equipe.  
Com a integração via **API Expert Connect**, o processo foi otimizado, permitindo o envio de vários tickets em poucos cliques, aumentando a **produtividade** e reduzindo **erros humanos**.  

---

## 📌 Observação

Este projeto foi desenvolvido como uma solução prática para otimização de processos internos, explorando boas práticas de **desenvolvimento front-end moderno**, integração com **APIs externas** e uso de **bibliotecas UI avançadas**.  
