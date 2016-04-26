background-image: url(image/cyclejs-logo.svg)
class: title

# Cycle on the bash side

--

## Writing shell apps with Cycle.js

---

# Why?

--

## Why not?

???

* As developers we use shell a lot
* That's why I wanted to create shell apps with cycle

---

# Shell is pure FP

--

* There is an input
* You apply modifiers (e.g. sed) and/or filter (e.g. grep) on it
* You get an output

---

# What else is pure FP?

--

# Cycle.js

---

# Routing

--

* Vaguely inspired from [`sub`](https://github.com/basecamp/sub) and `cyclic-router`

--

* Using a driver:
  ```javascript
  run(app, {
      router: makeShellRouterDriver(process.argv)
  })
  ```
  ```javascript
  const routes = {
      'hi [polite|p] [polite-greeter|g]= :name': (args, options) =>
        Hi({
          args$: Observable.of(args),
          options$: Observable.of(options)
        })
  }

  function main(sources) {
      const app = sources.router.define(routes)
  }
  ```

---

```javascript
'hi [polite|p] [polite-greeter|g]= :name'
```

--

* `hi`: sub application, main routing parameter

```bash
node index.js hi
```

---

```javascript
'hi [polite|p] [polite-greeter|g]= :name'
```

* `hi`: sub application, main routing parameter
* `[polite|p] [polite-greeter|g]=`: options

```bash
node index.js hi --polite --polite-greeter hello
```

---

```javascript
'hi [polite|p] [polite-greeter|g]= :name'
```

* `hi`: sub application, main routing parameter
* `[polite|p] [polite-greeter|g]=`: options
* `:name`: arguments

```bash
node index.js hi --polite --polite-greeter hello Hadrien
```

---

# Routing

* Vaguely inspired from [`sub`](https://github.com/basecamp/sub) and `cyclic-router`
* Using a driver:
  ```javascript
  run(app, {
      router: makeShellRouterDriver(process.argv)
  })
  ```
  ```javascript
  const routes = {
      'hi [polite|p] [polite-greeter|g]= :name': (args, options) =>
        Hi({
          args$: Observable.of(args),
          options$: Observable.of(options)
        })
  }

  function main(sources) {
      const app = sources.router.define(routes)
  }
  ```

---

```javascript
function Hi(sources) {
  return {
    CLI: sources.args$
      .combineLatest(sources.options$, (args, options) => {
        const greeter = options.polite ? `Why, ${options.g}` : `Hi`
        return `${greeter} ${args.name}`
      })
  }
}

export default Hi
```

--

```bash
$ index.js hi chadrien
Hi chadrien
$ index.js hi --polite -g hello Hadrien
Why, hello Hadrien
```

---

# Interacting with the user

--

Simple I/O driver

```javascript
run(app, {
    CLI: makeCLIDriver()
})
```

```javascript
function main(sources) {
    const QUESTION = `Do stuff? [Y/n]`
    const output$ = sources.CLI
      .filter(cli => cli.question === QUESTION)
      .pluck(`answer`)
    return {
      CLI: Observable.just({output: QUESTION, interactive: true})
        .merge(output$)
    }
}
```

---

### [https://github.com/edge/cycle-blessed](https://github.com/edge/cycle-blessed)

![](image/cycle-blessed.gif)

---

# What now?

???

* You're in a Cycle environment, you can use any driver you want (HTTP, Firebase, etc.)
* You're in a JS environment, you can write awesome JS
* You're in a Node environment, you can use any package you want, access the filesystem, control processes, etc.

---

# ASYNCH

---

# What could we build with that?

???

My first though is a companion app/client for an API, *à la* `heroku` for example

---

# Q & A
