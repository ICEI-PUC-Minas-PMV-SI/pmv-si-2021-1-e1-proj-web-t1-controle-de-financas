# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="1-Documentação de Contexto.md"> Documentação de Contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto

## Personas

Joaquim, 35 anos, trabalha como autônomo e recebe seu dinheiro em espécie diariamente após o serviço. Ele tem muita dificuldade de controlar suas finanças e com isso acumulou muitas dívidas, atualmente ele procura uma forma de controlar seus gastos para sair dessa situação e futuramente poupar para comprar seu imóvel próprio.

Beatriz, 26 anos, trabalha em uma agência de publicidade e recebe seu dinheiro mensalmente no mesmo período, ela também faz trabalhos como freelancer e mantém várias contas abertas para receber pagamentos. Ela possui muita dificuldade de gerenciamento das contas e cartões de crédito, sobrando muito pouco ou as vezes não sobrando nada do dinheiro do mês. Beatriz tem o sonho de viajar, porém por falta de controle, nunca tem dinheiro sobrando para este fim.

## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO...         | QUERO/PRECISO ...                              |PARA ...                                |
|-------------------|------------------------------------------------|----------------------------------------|
|Joaquim            | Registrar despesas e receitas                  | Quitar minhas dívidas                  |
|Beatriz            | Registro de movimentações para várias contas   | Administrar melhor meu dinheiro        |

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

|ID    | Descrição do Requisito                                                                     | Prioridade |
|------|--------------------------------------------------------------------------------------------|------------|
|RF-001| Permitir que o usuário faça os lançamentos de receitas e despesas                          | ALTA       | 
|RF-002| Permitir que o usuário tenha acesso ao saldo como resultado das operações em local visível | ALTA       |
|RF-003| Permitir que o usuário cadastre e gerencie mais de uma carteira simultaneamente            | MEDIA      |
|RF-004| Permitir que o usuário tenha acesso ao saldo mensal das operações em local visivel         | MEDIA      |
|RF-005| Permitir que o usuário faça o uso de categorias pré-definidas                              | BAIXA      |
|RF-006| Gráficos para visualização das receitas e despesas do mês                                  | BAIXA      |


### Requisitos não Funcionais

|ID     | Descrição do Requisito                                            |Prioridade |
|-------|-------------------------------------------------------------------|-----------|
|RNF-001| Sistema deve ser executado por meio de um navegador de internet   | ALTA      |
|RNF-002| Deve processar requisições do usuário em no máximo 3s             | MÉDIA     |
|RNF-003| O sistema deve ser responsivo para rodar em um dispositivos móvel | BAIXA     |

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                                                                          |
|--|----------------------------------------------------------------------------------------------------|
|01| O projeto deverá ser entregue até o prazo final estipulado pelo orientador do projeto              |
|02| Deverão ser feitas reuniões semanais para apresentar o andamento do projeto                        |
|03| Back-end, caso necessário, somente deverá ser desenvolvido com uma linguagem de programação C-Like |
