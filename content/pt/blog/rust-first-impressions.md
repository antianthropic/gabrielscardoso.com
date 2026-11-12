---
title: Rust - primeiras impressões com essa linguagem irritantemente elegante

description: Ou "como uma linguagem conseguiu me fazer admirar um compilador enquanto ele se recusava a compilar meu código".

date: '2026-11-12'

tags:
  - rust
  - cargo
  - programming

translated: true
---

Trabalho com desenvolvimento de software há alguns anos. Durante esse tempo, passei por diferentes linguagens, paradigmas, frameworks, ecossistemas. Pascal, Python, JavaScript, TypeScript, PHP e, principalmente, Go e Solidity fizeram parte da minha trajetória profissional. Cada uma dessas linguagens, à sua maneira, contribuiu para a forma como penso e escrevo software atualmente.

E então resolvi aprender Rust.

(Quer dizer, eu tentei há alguns anos, achei legal, vi o poder do Cargo e achei tudo muito interessante, mas, no final, voltei para as linguagens que já conhecia e não dediquei tanto tempo para o Rust)

Não foi exatamente o meu primeiro contato, mas existe uma diferença considerável entre conhecer os argumentos a favor da linguagem e efetivamente começar a utilizá-la para alguma coisa. No meu caso, o interesse é ainda maior porque posso aplicar Rust a diferentes áreas nas quais já trabalho.

Rust é uma linguagem peculiar. Ela consegue ser bonita, elegante, expressiva e absolutamente irritante, tudo isso no mesmo bloco de código.

E talvez por isso eu esteja tão fascinado.

## Primeiras impressões: bonitinha, mas ordinária!

Existe uma dimensão estética na programação que, embora frequentemente negligenciada, considero importante. Não me refiro simplesmente à quantidade de caracteres necessários para escrever determinada operação ou à preferência subjetiva por chaves, parênteses, ponto e vírgula e quebras de linha.

Refiro-me à maneira como uma linguagem expressa suas intenções.

Go, por exemplo, é uma linguagem que admiro pela simplicidade. Sua sintaxe é deliberadamente limitada, sua filosofia favorece a previsibilidade e existe um esforço evidente para evitar abstrações desnecessárias. É uma linguagem pragmática, construída para resolver problemas sem transformar cada decisão em um exercício filosófico.

Rust parece seguir outra direção.

Há algo particularmente elegante em sua maneira de combinar tipos algébricos, pattern matching, traits, expressões e controle explícito sobre recursos.

Vamos considerar o exemplo abaixo:

```rust
enum Status {
  Pending,
  Processing,
  Completed,
  Failed(String),
}

fn describe(status: &Status) -> &str {
  match status {
    Status::Pending => "Pending",
    Status::Processing => "Processing",
    Status::Completed => "Completed",
    Status::Failed(message) => message.as_str(),
  }
}
```

Não há nada especialmente revolucionário nesse exemplo. O que me chama atenção é a naturalidade com que Rust representa estados distintos e obriga o programador a considerar cada possibilidade.

O `match` não é apenas uma alternativa mais agradável ao `switch`. Combinado com enum, ele permite representar e decompor estruturas de dados de maneira expressiva, com verificação de exaustividade pelo compilador.

No JavaScript/TypeScript/ECMAScript (Deus Meu!), seria perfeitamente possível representar esses estados utilizando objetos e strings. Em PHP, poderíamos utilizar enums e match (particularmente, ainda gosto de combinar enums com traits para encapsular comportamentos). Em Go, constantes e tipos definidos resolveriam boa parte do problema.

Mas o Rust? Ele oferece uma combinação particularmente interessante entre expressividade e garantias estáticas. E isso aparece por toda parte.

## Cargo: como assim tudo já vem pronto?

A sintaxe do Rust por si só já é algo fantático, mas o Cargo, isso sim conquista a adminiração de qualquer programador imediatamente.

Sinceramente, para quem vem do escossistema JavaScript sabe muito bem a experiência de inicializar um projeto, configurar o gerenciador de pacotes, escolher ferramentas de linting, configurar formatação, definir scripts, organizar testes, escolher a ferramenta de testes, e quais outras dependências serão necessárias para manter tudo funcionando, e manter tudo isso funcionando.

É verdade que o ecossistema evoluiu consideravelmente. Ferramentas como Deno, PNPM (meu favorito), Bun, Yarn, frameworks modernos, etc. Tudo isso facilitou o processo mas existe uma fragmentação histórica difícil de ignorar (Vue, React, Angular, Webpack, Vite, Express, Fastify, NestJS, AdonisJS, eu poderia ficar aqui _ad aeternum_).

No PHP, o Composer é excelente. Mas ele não pretende ser uma ferramenta integrada para todo o ciclo de desenvolvimento. Normalmente também precisamos combiná-lo com PHPUnit ou Pest, PHPStan, PHP-CS-Fixer e outras ferramentas.

Go, por outro lado, já oferece uma experiência muito mais coesa. _go mod_, _go test_, _go fmt_ e _go vet_. Tudo muito mais previsível.

E é justamente por gostar dessa filosofia que o Cargo me impressionou tanto.

```sh
cargo new hello-rust
cd hello-rust

cargo run
cargo test
cargo fmt
cargo clippy
cargo doc --open
```

É difícil não apreciar isso. Ainda mais para alguém pragmático.

Criar um projeto, gerenciar dependências, compilar, executar, testar, formatar, executar análises estáticas e gerar documentação fazem parte de uma experiência integrada, não o oposto. Algumas dessas funcionalidades são disponibilizadas por componentes oficiais adicionais, como `rustfmt` e `Clippy`, mas a interface permanece consistente. Não é como se eu precisasse para cada microprocesso ter de me ocupar em configurar tudo novamente (sim, JavaScript, estou falando de ti).

O arquivo Cargo.toml também merece reconhecimento.

```toml
[package]
name = "hello-rust"
version = "0.1.0"
edition = "2024"

[dependencies]
serde = { version = "1", features = ["derive"] }
serde_json = "1"
```

Simples, legível e declarativo.

O Cargo não inventou o gerenciamento de dependências, tampouco tornou obsoletas as ferramentas de outros ecossistemas. Mas a maneira como reúne tantas responsabilidades em uma experiência consistente é impressionante.

É o tipo de ferramenta que faz você se perguntar por que algumas tarefas aparentemente triviais precisam ser tão fragmentadas em outros ambientes.

> Uma curiosidade é o fato que, eu como Desenvolvedor Blockchain, já havia tido contato com arquivos `.toml` por já lidar com o framework Foundry, e também com o gerenciador uv do Python, e todos foram desenvolvidos com Rust. Portanto é legal descobrir posteriormente que o Rust já estava entranhado em meu fluxo de desenvolvimento mesmo antes de sequer escrever um única linha de código.

## Sintaxe X Compilador: o inimigo agora é outro (mesmo sem querer).

Naturalmente, nem tudo são flores.

Rust possui uma curva de aprendizado bastante particular, especialmente quando começamos a lidar com ownership, borrowing e lifetimes.

Em linguagens com garbage collector, como Go e JavaScript, estamos acostumados a delegar parte significativa do gerenciamento de memória ao runtime. Isso não significa que podemos ignorar completamente alocações, referências ou vazamentos de recursos, mas existe uma camada de abstração que torna muitas operações mais convenientes.

Rust exige outra mentalidade.

O modelo de ownership determina quem possui determinado valor, quando esse valor pode ser emprestado e quais operações são permitidas enquanto existem referências a ele.

Por exemplo:

```rust
fn main() {
  let name = String::from("Rust");

  let other_name = name;

  println!("{name}");
}
```

*O código não compila.*

A atribuição transfere a propriedade da `String` para `other_name`, invalidando o uso posterior de `name`.

Em Go, uma atribuição semelhante de string seria perfeitamente válida. Em JS, PHP, etc, também.

Em Rust, precisa-se compreender o real significado da operação.

Em verdade, tem de se _emprestar_ o valor:

```rust
fn main() {
  let name = String::from("Rust");

  let other_name = &name;

  println!("{name}");
  println!("{other_name}");
}
```

Ou realizar uma cópia _explícita_ dos dados com `clone()`, quando isso for realmente necessário.

Inicialmente, esse comportamento pode parecer uma inconveniência desnecessária. Afinal, estamos tentando escrever software, não negociar o IPTU de cada variável com o compilador.

Mas existe uma lógica por trás dessas restrições.

Rust procura impedir, durante a compilação, determinadas classes de problemas relacionados à memória e ao uso de referências. Em vez de depender exclusivamente de verificações em tempo de execução ou da disciplina do desenvolvedor, incorpora essas garantias ao sistema de tipos.

Isso não elimina todos os bugs, nem significa que todo programa Rust seja automaticamente seguro. Mas muda profundamente quais erros podem chegar à execução.

A parte mais interessante é perceber que, aos poucos, deixamos de simplesmente corrigir mensagens do compilador e começamos a estruturar o código considerando essas regras desde o início.

O compilador deixa de parecer um obstáculo arbitrário e passa a funcionar como uma espécie de revisor extremamente rigoroso.

Um revisor que, ocasionalmente, dá vontade de mandar para ███████████████████████████████████████.

## Go te ensina a gostar da simplicidade. Rust te ensina a apreciar restrições.

Talvez essa seja a comparação mais interessante da minha experiência até agora.

Go e Rust possuem objetivos parcialmente semelhantes, especialmente quando fala-se de software eficiente, previsível e adequado a aplicações de infraestrutura. Entretanto, suas filosofias de desenvolvimento são consideravelmente diferentes.

Go procura reduzir a complexidade da linguagem e favorecer a simplicidade operacional. Rust aceita uma linguagem mais complexa para oferecer maior expressividade e garantias estáticas.

Em Go, frequentemente tenho a sensação de que a linguagem procura sair do meu caminho.

Em Rust, sinto que ela exige que eu justifique determinadas decisões.

Nenhuma dessas abordagens é universalmente superior.

Go continua sendo uma excelente escolha para serviços de backend, aplicações concorrentes, ferramentas de infraestrutura, CLI e sistemas distribuídos. Sua velocidade de compilação, simplicidade e modelo de concorrência são vantagens concretas.

Rust oferece outras possibilidades: controle preciso sobre alocações, abstrações de custo previsível, segurança de memória sem depender de um garbage collector e um sistema de tipos particularmente expressivo.

O preço dessas características é uma complexidade maior, tanto na linguagem quanto no processo de aprendizagem. E existe algo que considero importante reconhecer: nem todo projeto precisa pagar esse preço.

Eu amei Rust, mas para fazer uma API simples eu jamais usaria-o. Deixa que Go + Chi ou Fiber fazem isso com o mínimo do tempo possível. E talvez essa seja a maior prova de que cada um tem seu espaço.

## JavaScript e PHP: conveniência também tem preço.

Minha experiência com JavaScript e PHP também influencia bastante a maneira como estou enxergando Rust.

Ambas são linguagens extremamente produtivas dentro de seus respectivos ecossistemas. JavaScript possui uma versatilidade impressionante, enquanto PHP, especialmente com frameworks modernos como Laravel, oferece uma experiência de desenvolvimento web muito madura.

Entretanto, grande parte dessa produtividade está associada à flexibilidade que essas linguagens proporcionam.

E flexibilidade nem sempre significa previsibilidade.

JavaScript permite uma quantidade considerável de comportamentos implícitos. TypeScript melhora substancialmente a situação ao introduzir verificação estática de tipos, mas seu sistema de tipos não impõe as mesmas garantias de propriedade e empréstimo que encontramos em Rust.

PHP também evoluiu enormemente com declarações de tipos, enums, propriedades readonly e outras funcionalidades modernas. Ainda assim, suas prioridades de projeto e seu modelo de execução são distintos.

Rust me chamou a atenção justamente por tornar explícitas decisões que, em outras linguagens, frequentemente passam despercebidas.

Isso pode tornar o desenvolvimento inicial mais trabalhoso, mas também cria oportunidades para detectar problemas antes que o programa seja executado.

Naturalmente, essa vantagem não é gratuita. Existe uma diferença entre produtividade imediata e facilidade de manutenção, e nenhuma linguagem resolve essa equação sozinha.

## Ainda estou começando, e talvez essa seja a melhor parte

Seria pretensioso escrever sobre Rust como se já dominasse a linguagem.

Em verdade eu sequer queria escrever isso, pois não domino.

Mas talvez isso tenha me feito querer ainda mais partilhar.

Um entusiasmo que há muito não sentia.

Ainda estou construindo familiaridade com ownership, borrowing, lifetimes, traits, macros e outras particularidades do ecossistema. Tenho muito a aprender antes de conseguir avaliar suas vantagens e limitações com a mesma segurança que tenho ao trabalhar com linguagens que utilizo profissionalmente.

Mas minhas primeiras impressões são extremamente positivas.

Rust despertou uma curiosidade que vai além da vontade de adicionar outra linguagem ao currículo.

É uma linguagem que me faz querer compreender melhor como o software funciona, quais decisões estão escondidas por trás de determinadas abstrações e como escrever programas com garantias mais fortes sem necessariamente sacrificar desempenho.

Também me fez perceber o quanto valorizo ferramentas de desenvolvimento bem integradas. O Cargo, particularmente, estabeleceu uma referência bastante alta para minhas expectativas.

Continuarei utilizando Go, JavaScript e PHP quando fizer sentido. Não tenho interesse em abandonar ferramentas maduras simplesmente porque descobri uma linguagem nova e interessante.

Mas quero explorar Rust com profundidade.

Talvez ela se torne uma das minhas principais ferramentas. Talvez no futuro ela pague minhas contas. Talvez eu descubra limitações que hoje ainda não consigo perceber. Talvez a complexidade de determinados projetos me faça valorizar ainda mais a simplicidade de Go.

Por enquanto, existe apenas uma certeza.

*Fazia tempo que uma linguagem de programação não me deixava tão irritado e tão interessado ao mesmo tempo.*

E, considerando que ainda estou no começo, isso me parece um excelente sinal.
