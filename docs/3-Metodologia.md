
# Metodologia

<span style="color:red">Pré-requisitos: <a href="2-Especificação do Projeto.md"> Documentação de Especificação</a></span>

Para conseguirmos estabelecer melhor o fluxo de trabalho, a cada etapa do projeto devemos a coluna, "To Do" do project para cadastrarmos as issues dos cards da etapa em andamento. Feito isso, quando um integrante iniciar o trabalho em uma issue nova, deve mover o card para a coluna "In Progress" e posteriormente para "Done" e feito isso concluir a issue.

Em Caso de Dificuldades na execução da tarefa, o integrante pode mencionar os demais integrantes do grupo nos comentários da issue em questão para que os demais vejam as dificuldades e possamos trabalhar em equipe para solucionar problemas do projeto.


## Controle de Versão

A ferramenta de controle de versão adotada no projeto foi o [Git](https://git-scm.com/), sendo que o [Github](https://github.com)
foi utilizado para hospedagem do repositório.

O projeto segue a seguinte convenção para o nome de branchs:

- `main`: versão estável já testada do software
- `staging`: versão em testes do software
- `dev`: versão de desenvolvimento do software
- `<iniciaisdonome>_<implementacao>`: branch para testes pessoais e futuramente mergeadas em `dev` para que os demais participantes do grupo possam trabalhar com as mudanças

Para poder trabalhar com as versões de código, sugerimos o uso do software "Virtual Studio Code" da Microsoft, juntamente com a ferramenta da linha de comando do `git` para facilitar a transição entre branchs e a subída do cógido. Seguem links para download/instruções.

> **Links Úteis**:
> - [VirtualStudioCode] (https://code.visualstudio.com/download)
> - [GitHubCLI] (https://cli.github.com/)
> - [GitCLI] (https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
> - [TutorialDeGit] (https://www.youtube.com/watch?v=UbJLOn1PAKw)

após instalar a linha de comando do git use o comando `gh auth login` autenticar com o seu usuário do git, para as configurações do login, é mais simples usar o HTTPS, para utilizar o token de acesso, você pode gerá-lo em (https://github.com/settings/tokens).

Quanto à gerência de issues, o projeto adota a seguinte convenção para
etiquetas:

- `documentation`: melhorias ou acréscimos à documentação
- `bug`: uma funcionalidade encontra-se com problemas
- `enhancement`: uma funcionalidade precisa ser melhorada
- `feature`: uma nova funcionalidade precisa ser introduzida

Pensando na integridade do código, cada integrante do grupo deve trabalhar em sua branch pessoal usando como base a branch de `dev`, e quando estiver com a tarefa concluída, deve fazer o merge para a branch `dev`. Para que as mudanças passem da branch de desenvolvimento para a staging, é necessária o conscentimento de outro integrande do grupo, pois este irá analisar de forma "não viciada" o merge em questão. Após testada e aprovada pelos demais integrantes do grupo as mudanças vão para a branch `main`.

Os commit de cada push de código, devem explicar de forma clara a implementação feita para que todos consigam entender as mudanças feitas simplismente lendo o commit.

> **Links Úteis**:
> - [Tutorial GitHub](https://guides.github.com/activities/hello-world/)
> - [Git e Github](https://www.youtube.com/playlist?list=PLHz_AreHm4dm7ZULPAmadvNhH6vk9oNZA)
> - [Comparando fluxos de trabalho](https://www.atlassian.com/br/git/tutorials/comparing-workflows)
> - [Understanding the GitHub flow](https://guides.github.com/introduction/flow/)
> - [The gitflow workflow - in less than 5 mins](https://www.youtube.com/watch?v=1SXpE08hvGs)

## Gerenciamento de Projeto

### Divisão de Papéis

Apresente a divisão de papéis entre os membros do grupo.

> **Links Úteis**:

> - [11 Passos Essenciais para Implantar Scrum no seu
> Projeto](https://mindmaster.com.br/scrum-11-passos/)

### Processo

Coloque  informações sobre detalhes da implementação do Scrum seguido pelo grupo. O grupo poderá fazer uso de ferramentas on-line para acompanhar o andamento do projeto, a execução das tarefas e o status de desenvolvimento da solução.

> **Links Úteis**:
> - [Project management, made simple](https://github.com/features/project-management/)
> - [Sobre quadros de projeto](https://docs.github.com/pt/github/managing-your-work-on-github/about-project-boards)
> - [Como criar Backlogs no Github](https://www.youtube.com/watch?v=RXEy6CFu9Hk)
> - [Tutorial Slack](https://slack.com/intl/en-br/)

### Ferramentas

As ferramentas empregadas no projeto são:

- Editor de código: [Visual Studio Code](https://code.visualstudio.com/)
- Ferramentas para comunicação: [Microsoft Teams](https://www.microsoft.com/pt-br/microsoft-teams/group-chat-software), [WhatsApp](https://www.whatsapp.com/?lang=pt_br)
- Ferramentas de diagramação

O editor de código foi escolhido porque ele possui uma integração com o sistema de controle de versão, pelo pouco consumo de recursos e simplicidade.
As ferramentas de comunicação utilizadas foram selecionadas por ferramentas úteis de integração de grupo, e por serem amplamente utilizadas no meio empresarial.
Por fim, para criar diagramas utilizamos essa ferramenta por melhor captar as necessidades da nossa solução.

Liste quais ferramentas foram empregadas no desenvolvimento do projeto, justificando a escolha delas, sempre que possível.

> **Possíveis Ferramentas que auxiliarão no gerenciamento**:
> - [Slack](https://slack.com/)
> - [Github](https://github.com/)
