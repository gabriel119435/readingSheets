## reading sheets
this project was created as a pet project for myself to learn how to parse sheets and present them in a filterable/sortable way, using only vanilla js

## how to run
* `docker build -t candidate-app . && docker run -p 5000:5000 --rm candidate-app`
* access `http://localhost:5000/` on your browser

## features
* import csv and xlsx files
* rows can be sorted by name, city, age, gender, disability and salary expectation
* rows can be filtered by any combination of techs
* example files (csv and xlsx) at `/data/files`

## working example
![demo](demo.gif)