## YML Basics
### Playground of yml to json (must know)
<pre>
    https://codebeautify.org/yaml-to-json-xml-csv#
</pre>

### Example in YML

### Indentations are must important in the YML

<pre>
    colors: 'red'
    name: 'text'
    numbers: 'int'
    one: 1
    primarycolors:
    red: 'red'
    white: 'white'
    countNumers:
        - "one"
        - "two"
        - "three"
        - 'four'
</pre>

### Output in JSON of given yml
<pre>
    {
        "colors": "red",
        "name": "text",
        "numbers": "int",
        "one": 1,
        "primarycolors": {
            "red": "red",
            "white": "white"
        },
        "countNumers": [
            "one",
            "two",
            "three",
            "four"
        ]
    }
</pre>