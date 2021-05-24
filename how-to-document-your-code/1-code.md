## Use the tools your language provides

- Also known as "self documenting code"
- Using the language to express the intent of the code clearly. For example using meaningful:
    * directory structure
    * file/class/method/variable names
- Using common standards/patterns that are familiar
- The main goal for this is to allow devs to understand the code at a glance

#### Examples

_Bad_

```javascript
var n = args[0]
```

_Better_

```javascript
var username = args[0]
```

---

_Bad_

```javascript
if (employee.flags.contains(3) && employee.age >= 65)
```

_Better_

```javascript
const HOURLY_FLAG = 3;
const MIN_AGE_FOR_FULL_BENEFITS = 65;

if (employee.flags.contains(HOURLY_FLAG) && employee.age >= MIN_AGE_FOR_FULL_BENEFITS)
```

_Event Better_

```javascript
if (employee.isEligibleForFullBenefits())
```

