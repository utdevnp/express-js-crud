## YML Basics
### Playground of yml to json (must know)
<pre>
    PLAYGROUND - https://codebeautify.org/yaml-to-json-xml-csv
    SAMPLE EXAMPLE - https://codebeautify.org/yaml-to-json-xml-csv/cbc61eca
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