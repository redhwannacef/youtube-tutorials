## Comments

> "Nothing can be quite so helpful as a well-placed comment. Nothing can clutter up a module more than frivolous dogmatic comments. Nothing can be quite so damaging as an old crufty comment that propagates lies and misinformation." - Clean Code, Robert C Martin (Uncle Bob).

- Comments should be used only to explain the intent behind code that cannot be refactored to explain itself.
- Mostly used for providing additional context, i.e. answering the WHY not the WHAT.

#### Examples

_Bad_

```java
// make sure the port is greater or equal to 1024
if (port < 1024) {
  throw new InvalidPortError(port);
}
```

_Better_
```java
// port numbers below 1024 (the privileged or “well-known ports”)
// require root access, which we don’t have
if (port < 1024) {
  throw new InvalidPortError(port);
}
```

_Even Better_

```java
if (!hasRootPrivileges(port)) {
  throw new InvalidPortError(port);
}

private boolean hasRootPrivileges(int port) {
  // port numbers below 1024 (the privileged or "well-known ports")
  // require root access on unix systems
  return port < 1024;
}
```

_Even Even Better_

```java
final static const HIGHEST_PRIVILEDGED_PORT = 1023;

private boolean hasRootPrivileges(int port) {
  // The privileged or "well-known ports" require root access on unix systems
  return port <= HIGHEST_PRIVILEDGED_PORT;
}
```
