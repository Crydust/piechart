# simple piechart and datelinechart

The only redeeming features are smallness, speed and compatibility.

tested and known to work in ie 6+, firefox 3.6+, safari 4+, chrome 14+, opera 10+ 
(firefox 3.0 doesn't support fillText, so it is unsupported)

[demo](http://www.crydust.be/lab/piechart/)

## how to compile

Install nodejs.

    npm install -g grunt-cli
    npm install
    grunt publish

The publish folder should contain compiled files

## how to test

Run test/index.html.
Or ...

    grunt test
