# Nexus Spark: Chatbot com Gemini e Next.js

## Sobre o Projeto

Nexus Spark é um chatbot desenvolvido com Next.js e integrado ao modelo de linguagem de grande porte Gemini, da Google AI. Este projeto foi realizado como parte da minha participação no evento "Imersão Inteligência Artificial", que explora o potencial da IA e do Gemini na criação de projetos inovadores.

O objetivo do projeto é fornecer uma experiência de conversação fluida e informativa para os usuários, aproveitando as capacidades avançadas de processamento de linguagem natural do Gemini. O projeto também inclui autenticação de usuários com Firebase para oferecer uma experiência mais personalizada e segura.

## Diretiva do Modelo

A diretiva do modelo é usada para orientar o comportamento do modelo de linguagem Gemini. Neste caso, a diretiva define a persona do modelo como um sistema de agendamento de consultas para o Dr. Octávio, um especialista em Direito Civil.

O sistema é projetado para coletar informações do usuário, verificar a disponibilidade do Dr. Octávio, agendar consultas, criar eventos de agenda, enviar notificações de agendamento e coletar feedback do usuário.

A diretiva também enfatiza a importância da segurança e privacidade, incluindo a anonimização de dados sensíveis e a conformidade com as diretrizes da LGPD.

Além disso, a diretiva fornece exemplos de interações para orientar o modelo em como responder a várias solicitações do usuário.

## Funcionalidades

- Conversação natural: O Gemini permite que o chatbot compreenda e responda a perguntas e instruções de forma natural, simulando uma conversa humana.
- Integração com Next.js: O framework Next.js oferece uma base sólida para o desenvolvimento do chatbot, permitindo a criação de interfaces de usuário dinâmicas e responsivas.
- Autenticação com Firebase: O Firebase é utilizado para gerenciar a autenticação de usuários, permitindo que eles se registrem, façam login e acessem recursos personalizados.

## Tecnologias Utilizadas

- Next.js: Framework React para desenvolvimento web.
- @google/generative-ai: Biblioteca para acesso à API do Gemini.
- Firebase: Plataforma para autenticação e outros serviços backend.
- Material-UI: Biblioteca de componentes React para um desenvolvimento ágil e fácil.

## Como Executar

1. Clone o repositório: `git clone https://github.com/oc-garcia/nexus-spark.git`
2. Instale as dependências: `npm install`
3. Configure as credenciais da API do Gemini e do Firebase em um .env
4. Inicie o servidor de desenvolvimento: `npm run dev`
5. Acesse o chatbot em http://localhost:3000

## Deploy

O projeto está implantado e pode ser acessado em [https://nexus-spark.vercel.app/](https://nexus-spark.vercel.app/).

## Próximos Passos

- **Integração com Google Calendar**: Implementar uma funcionalidade para que os usuários possam utilizar o Gemini para realizar operações CRUD (criar, ler, atualizar e excluir) em seus calendários do Google. Isso permitiria agendar consultas e gerenciar eventos de forma ainda mais intuitiva, usando comandos de linguagem natural.
- **Correção de Bug de Login**: Resolver um bug que atualmente impede o login de usuários em navegadores de dispositivos da Apple, garantindo compatibilidade com diferentes plataformas e ampliando o alcance do chatbot.
- **Explorar outras capacidades do Gemini**: Investigar e implementar outras funcionalidades do Gemini, como geração de texto, tradução e resumo, para enriquecer a experiência do usuário e oferecer um chatbot ainda mais versátil.

## Nota

A base do front-end deste projeto foi aproveitada de outro projeto de minha autoria. Esta decisão foi tomada para otimizar o tempo de desenvolvimento. Você pode acessar o código do projeto original em [https://github.com/oc-garcia/health-team-admin-next](https://github.com/oc-garcia/health-team-admin-next).

## Contribuição

Contribuições são bem-vindas! Para contribuir com o projeto, siga estas etapas:

1. Faça um fork do repositório.
2. Crie um branch para sua feature ou correção: `git checkout -b minha-feature`
3. Faça as alterações necessárias.
4. Envie um pull request.

## Licença

Este projeto está licenciado sob a licença MIT.
