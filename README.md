# 🎮 Sistema de Avaliação de Jogos

Projeto desenvolvido como trabalho acadêmico para a Faculdade Metropolitana Unidas (FMU), com o objetivo de criar uma plataforma web onde usuários podem avaliar, comentar e receber recomendações personalizadas de jogos digitais.

> 📍 São Paulo - 2025  
> 👨‍💻 Desenvolvedores:  
> - Claudio Henrique (RA: 2445930)  
> - Gustavo Alves Macedo (RA: 2433475)  
> - Laryssa (RA: 2423877)  
> - Anna Caroline Furtado (RA: 2445913)

---

## 🧠 Visão Geral

A indústria de games cresce exponencialmente, e os jogadores têm cada vez mais dificuldade em escolher títulos compatíveis com seus gostos. O **Sistema de Avaliação de Jogos** propõe uma solução inovadora: combinar avaliações colaborativas da comunidade com um **teste de compatibilidade**, capaz de sugerir jogos com base nas preferências individuais do usuário.

A proposta vai além de sites tradicionais como IGN, Metacritic ou GameSpot, oferecendo uma experiência mais **personalizada, inclusiva e participativa**.

---

## 🎯 Objetivos

### 🎯 Objetivo Geral
Desenvolver uma plataforma online que permita aos usuários compartilhar avaliações, comentar jogos e receber recomendações personalizadas através de um teste interativo.

### 📌 Objetivos Específicos
- Criar uma interface web responsiva e acessível.
- Implementar autenticação segura de usuários.
- Permitir cadastro e visualização de jogos e categorias.
- Criar sistema de notas e comentários para os jogos.
- Desenvolver teste de compatibilidade para recomendações.
- Incluir filtros e mecanismos de busca avançada.
- Implementar moderação de conteúdo.
- Coletar feedback contínuo para melhorias.

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- Angular CLI
- HTML + SCSS
- Responsividade e acessibilidade aprimoradas

### Backend
- Spring Boot (Java)
- API RESTful com autenticação
- Camada de segurança e validação

### Banco de Dados
- H2 - Banco em Memória (com JPA e Spring Data)
- Relacionamentos muitos-para-muitos entre usuários, jogos e categorias

---

## 🔐 Requisitos Funcionais

- Cadastro e login de usuários
- Cadastro e listagem de jogos
- Avaliação com notas e comentários
- Perfil do usuário com histórico e favoritos
- Filtros por gênero, nota, lançamento, etc.
- Sistema de recomendação por teste de compatibilidade
- Moderação de comentários
- Envio de feedbacks

---

## ⚙️ Requisitos Não Funcionais

- Interface responsiva para mobile e desktop
- Acessibilidade (ex: contraste e elementos clicáveis ≥ 54px)
- Armazenamento seguro de senhas
- Baixa latência nas requisições
- Alta disponibilidade e escalabilidade
- Compatibilidade com Chrome, Firefox, Safari e Edge

---

## 🧩 Modelagem do Sistema

### 📌 Entidades Principais:
- `User`: dados pessoais, histórico de avaliações
- `Game`: título, gênero, desenvolvedor, plataformas
- `Category`: tipos de jogos (ação, RPG, etc.)
- Tabelas intermediárias:
  - `user_games`: rating, se o jogo é possuído
  - `game_category`: liga jogos a categorias

---

## 🧪 Teste de Compatibilidade

Sistema de perguntas e respostas que analisa as preferências do usuário e sugere jogos com base em:
- Gêneros preferidos
- Estilo de gameplay
- Jogos favoritos anteriores

---

## 📈 Resultados Esperados

- Ambiente colaborativo e moderado
- Sistema de recomendação mais eficaz que listas genéricas
- Acessibilidade real para todos os usuários
- Incentivo à cultura gamer participativa

---

## 🧾 Referências

1. [IGN](https://br.ign.com/)
2. [GameSpot](https://www.gamespot.com/)
3. [Eurogamer](https://www.eurogamer.pt/)
4. [Metacritic](https://www.metacritic.com/)
5. [OpenCritic](https://opencritic.com/)

---

## 📬 Contato

Para dúvidas, sugestões ou contribuições, entre em contato com os membros do projeto diretamente por este repositório.

---

## 🏁 Licença

Projeto acadêmico - uso restrito ao contexto educacional.
