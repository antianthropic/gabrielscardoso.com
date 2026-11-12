---
title: Rust — First Impressions of This Infuriatingly Elegant Language

description: Or "how a language managed to make me admire a compiler whilst it refused to compile my code".

date: '2026-11-12'

tags:
  - rust
  - cargo
  - programming
---

I've been working in software development for a few years now. In that time, I've worked with different languages, paradigms, frameworks and ecosystems. Pascal, Python, JavaScript, TypeScript, PHP and, above all, Go and Solidity have all been part of my professional journey. Each of them, in its own way, has shaped how I think about and write software today.

And then I decided to learn Rust.

(Well, I did give it a go a few years ago. I liked it, discovered what Cargo could do and found the whole thing rather interesting. In the end, though, I went back to the languages I already knew and didn't devote much time to Rust.)

So this wasn't exactly my first encounter with the language. But there's a considerable difference between knowing the arguments in its favour and actually starting to use it for something. In my case, it's particularly appealing because I can apply Rust to several areas I already work in.

Rust is a peculiar language. It manages to be beautiful, elegant, expressive and utterly infuriating, all within the same block of code.

And perhaps that's precisely why I'm so fascinated by it.

## First impressions: pretty, but a right pain!

There's an aesthetic dimension to programming that I consider important, even though it's often overlooked. I'm not simply talking about how many characters it takes to write an operation, or a subjective preference for braces, parentheses, semicolons and line breaks.

I'm talking about the way a language expresses intent.

Go, for instance, is a language I admire for its simplicity. Its syntax is deliberately limited, its philosophy favours predictability, and there's a clear effort to avoid unnecessary abstractions. It's a pragmatic language, built to solve problems without turning every decision into a philosophical exercise.

Rust seems to take a different approach.

There's something particularly elegant about the way it combines algebraic data types, pattern matching, traits, expressions and explicit control over resources.

Consider the following example:

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

There's nothing especially revolutionary about this example. What strikes me is how naturally Rust represents distinct states and requires the programmer to account for every possibility.

`match` isn't merely a more pleasant alternative to `switch`. Combined with an `enum`, it lets us represent and unpack data structures expressively, with the compiler checking that every case is covered.

In JavaScript/TypeScript/ECMAScript (good Lord!), we could certainly represent these states using objects and strings. In PHP, we could use enums and `match` (personally, I still like combining enums with traits to encapsulate behaviour). In Go, constants and defined types would solve much of the problem.

But Rust? It offers a particularly compelling combination of expressiveness and static guarantees. And you see it everywhere.

## Cargo: hang on, all of this comes ready to use?

Rust's syntax is fantastic in its own right, but Cargo? Now that's something that can win a developer over almost immediately.

Anyone coming from the JavaScript ecosystem knows the drill: initialise a project, configure a package manager, choose linting tools, set up formatting, define scripts, organise tests, choose a test runner, work out which other dependencies are needed to keep everything running — and then keep the whole lot working.

Admittedly, the ecosystem has improved considerably. Tools such as Deno, pnpm (my personal favourite), Bun and Yarn, along with modern frameworks, have made things easier. But there's still a historical fragmentation that's hard to ignore (Vue, React, Angular, Webpack, Vite, Express, Fastify, NestJS, AdonisJS... I could go on _ad aeternum_).

In PHP, Composer is excellent. But it isn't intended to be an integrated tool for the entire development lifecycle. We generally need to combine it with PHPUnit or Pest, PHPStan, PHP-CS-Fixer and other tools.

Go, on the other hand, already provides a much more cohesive experience: `go mod`, `go test`, `go fmt` and `go vet`. Everything feels far more predictable.

And it's precisely because I appreciate that philosophy that Cargo impressed me so much.

```sh
cargo new hello-rust
cd hello-rust

cargo run
cargo test
cargo fmt
cargo clippy
cargo doc --open
```

It's difficult not to appreciate that. Especially if, like me, you're a pragmatist.

Creating a project, managing dependencies, compiling, running, testing, formatting, performing static analysis and generating documentation all belong to an integrated experience, rather than a collection of disconnected processes. Some of these features are provided by additional official components, such as rustfmt and Clippy, but the interface remains consistent. I don't have to concern myself with setting everything up again for every little task (yes, JavaScript, I'm talking to you).

The `Cargo.toml` file deserves some appreciation too.

```toml
[package]
name = "hello-rust"
version = "0.1.0"
edition = "2024"

[dependencies]
serde = { version = "1", features = ["derive"] }
serde_json = "1"
```

Simple, readable and declarative.

Cargo didn't invent dependency management, nor did it render other ecosystems' tools obsolete. But the way it brings so many responsibilities together into a consistent experience is impressive.

It's the sort of tool that makes you wonder why seemingly trivial tasks have to be so fragmented elsewhere.

> A curious detail: as a blockchain developer, I'd already encountered `.toml` files through Foundry, as well as Python's uv package manager — both tools written in Rust. So it was rather nice to discover that Rust had already found its way into my development workflow before I'd properly started writing it myself.

## Syntax vs compiler: now the enemy is someone else (whether I like it or not)

Naturally, it isn't all sunshine and roses.

Rust has a rather distinctive learning curve, particularly once you start dealing with ownership, borrowing and lifetimes.

In languages with garbage collection, such as Go and JavaScript, we're used to delegating a substantial part of memory management to the runtime. That doesn't mean we can completely ignore allocations, references or resource leaks, but there is a layer of abstraction that makes many operations more convenient.

Rust demands a different mindset.

Its ownership model determines who owns a given value, when that value may be borrowed, and which operations are permitted while references to it exist.

For example:

```rust
fn main() {
  let name = String::from("Rust");

  let other_name = name;

  println!("{name}");
}
```

*The code doesn't compile.*

The assignment moves ownership of the `String` to `other_name`, so `name` can no longer be used afterwards.

In Go, a similar assignment involving a string would be perfectly valid. The same goes for JavaScript, PHP and so on.

In Rust, you have to understand what the operation actually means.

If you want to keep using the original value, one option is to _borrow_ it:

```rust
fn main() {
  let name = String::from("Rust");

  let other_name = &name;

  println!("{name}");
  println!("{other_name}");
}
```

Alternatively, you can explicitly duplicate the data with `clone()` when that's genuinely necessary.

At first, this behaviour can seem like a pointless inconvenience. After all, we're trying to write software, not negotiate the council tax on every variable with the compiler.

But there's a reason behind these restrictions.

Rust aims to prevent certain classes of memory-related and reference-related problems at compile time. Rather than relying solely on runtime checks or developer discipline, it builds these guarantees into its type system.

That doesn't eliminate every bug, nor does it mean every Rust program is automatically safe. But it fundamentally changes which errors can make it through to execution.

The most interesting part is noticing that, little by little, you stop merely fixing compiler errors and start structuring your code around those rules from the outset.

The compiler begins to feel less like an arbitrary obstacle and more like an exceptionally strict reviewer.

A reviewer you occasionally feel like telling to ███████████████████████████████████████.

## Go teaches you to appreciate simplicity. Rust teaches you to appreciate constraints.

Perhaps this is the most interesting comparison I've made so far.

Go and Rust have partly overlapping aims, particularly when it comes to efficient, predictable software suited to infrastructure. Their approaches to language design, however, are considerably different.

Go tries to reduce language complexity and favour operational simplicity. Rust accepts a more complex language in exchange for greater expressiveness and stronger static guarantees.

With Go, I often feel as though the language is trying to get out of my way.

With Rust, I feel as though it expects me to justify certain decisions.

Neither approach is universally better.

Go remains an excellent choice for backend services, concurrent applications, infrastructure tools, command-line interfaces and distributed systems. Its compilation speed, simplicity and concurrency model are tangible advantages.

Rust offers other possibilities: precise control over allocations, abstractions with predictable costs, memory safety without relying on a garbage collector, and a particularly expressive type system.

The price of those features is greater complexity, both in the language itself and in the learning process. And there's something worth acknowledging here: not every project needs to pay that price.

I've fallen for Rust, but I'd never choose it for a simple API. I'd leave that to Go with Chi or Fiber and get it done in as little time as possible. Perhaps that's the clearest proof that each language has its place.

## JavaScript and PHP: convenience comes at a price too

My experience with JavaScript and PHP also shapes the way I see Rust.

Both languages are extremely productive within their respective ecosystems. JavaScript is remarkably versatile, while PHP, particularly with modern frameworks such as Laravel, offers a very mature web development experience.

Much of that productivity, however, is tied to the flexibility these languages provide.

And flexibility doesn't always mean predictability.

JavaScript allows a considerable amount of implicit behaviour. TypeScript improves matters substantially by introducing static type checking, but its type system doesn't enforce the same ownership and borrowing guarantees we find in Rust.

PHP has also evolved enormously, with type declarations, enums, readonly properties and other modern features. Even so, its design priorities and execution model are different.

What caught my attention about Rust is precisely the way it makes decisions explicit that often go unnoticed in other languages.

That can make development more demanding at first, but it also creates opportunities to catch problems before a program even runs.

Of course, this advantage doesn't come for free. There's a difference between immediate productivity and long-term maintainability, and no language solves that equation on its own.

## I'm only just getting started, and perhaps that's the best part

It would be presumptuous to write about Rust as though I'd already mastered it.

In fact, I almost didn't want to write this article, precisely because I haven't.

But perhaps that's what made me want to share the experience even more.

A sense of excitement I hadn't felt in a long time.

I'm still getting to grips with ownership, borrowing, lifetimes, traits, macros and the other peculiarities of the ecosystem. I have a great deal to learn before I can judge its strengths and limitations with the same confidence I have when working with languages I use professionally.

But my first impressions are overwhelmingly positive.

Rust has sparked a curiosity that goes beyond wanting to add another language to my CV.

It's a language that makes me want to understand more deeply how software works, which decisions are hidden behind certain abstractions, and how to write programs with stronger guarantees without necessarily sacrificing performance.

It's also made me realise just how much I value well-integrated development tools. Cargo, in particular, has set a remarkably high bar for my expectations.

I'll carry on using Go, JavaScript and PHP whenever they make sense. I have no interest in abandoning mature tools simply because I've discovered a new and interesting language.

But I do want to explore Rust in depth.

Perhaps it'll become one of my main tools. Perhaps one day it'll pay the bills. Perhaps I'll discover limitations I can't yet see. Perhaps the complexity of certain projects will make me appreciate Go's simplicity even more.

For now, there's only one thing I'm certain of.

*It's been a long time since a programming language made me feel so irritated and so intrigued at the same time.*

And given that I'm only just getting started, that strikes me as an excellent sign.
