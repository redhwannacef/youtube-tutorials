## Tests

- Tests document how the code _**should**_ behave, not just that it "does what is does".
- Tests are examples of how to use an api, with assertions
- Tests usually also give examples of edge case scenarios

#### Examples

_Bad_

```java
void testPush()
void testPop()
```

_Better_

```java
void shouldRetrieveValuesInOrderTheyAreAdded()
void shouldThrowExceptionIfStackIsEmpty()
void shouldThrowExceptionIfMaxThresholdIsReached()
```
