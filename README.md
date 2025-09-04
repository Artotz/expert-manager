# 🧑‍💼 Expert Manager

Painel desenvolvido em **Electron + React + TypeScript** para automatizar o lançamento de **tickets** no sistema **Expert Connect**.  
Antes, o processo era feito manualmente no site, um a um. Agora, com integração direta via **API oficial**, é possível abrir múltiplos tickets de forma muito mais rápida, reduzindo drasticamente o esforço operacional.  

---

## 🚀 Tecnologias e Stack

- **Electron** → empacotamento para desktop (Windows, Linux, macOS).  
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
- Interface desktop multiplataforma com **Electron**.  
- Formulários dinâmicos com validação automática.  
- Histórico de lançamentos e feedback em tempo real (sucesso/erro da API).  
- Estilização moderna com **TailwindCSS** + **ShadCN/UI**.  

---

## 📂 Estrutura do Projeto

```
expert-manager/
├── electron/ # Configuração e entrypoint do Electron
├── src/
│ ├── components/ # Componentes reutilizáveis (UI, formulários, tabelas)
│ ├── pages/ # Páginas principais do painel
│ ├── services/ # Conexão com a API Expert Connect
│ ├── hooks/ # Hooks customizados
│ └── utils/ # Funções auxiliares
├── public/ # Arquivos estáticos
├── package.json # Dependências e scripts
└── tailwind.config.js # Configuração do Tailwind
```

---

## 🛠️ Scripts principais

- `npm run dev` → inicia o servidor de desenvolvimento (Vite).  
- `npm run start` → inicia a aplicação desktop via **Electron**.  
- `npm run build:web` → gera a versão web do painel.  
- `npm run build:electron` → gera a build desktop com Electron.  
- `npm run lint` → validação de código com ESLint.  

---

## 🎯 Impacto

Antes do painel, o lançamento de tickets era feito manualmente no site, **um a um**, consumindo muito tempo da equipe.  
Com a integração via **API Expert Connect** e a distribuição como app **desktop multiplataforma**, o processo foi otimizado, permitindo o envio de vários tickets em poucos cliques, aumentando a **produtividade** e reduzindo **erros humanos**.  

---

## 📌 Observação

Este projeto foi desenvolvido como uma solução prática para otimização de processos internos, explorando boas práticas de **desenvolvimento front-end moderno**, integração com **APIs externas** e uso de **Electron** para levar a experiência diretamente ao desktop.  
