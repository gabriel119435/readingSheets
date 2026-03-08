## reading sheets
pet project to learn how to parse spreadsheets and present them in a filterable/sortable way, using only vanilla js

## how to run
* `docker compose up --build`
* access `http://localhost:5000/` on your browser
* db is ephemeral: data lives inside the container

## features
* import csv and xlsx files
* rows can be sorted by name, city, age, gender, disability and salary expectation
* rows can be filtered by any combination of techs
* example files (csv and xlsx) at `data/files/`

## ui architecture
the frontend is split into es modules, each with a single responsibility:

| file                  | responsibility                         |
|-----------------------|----------------------------------------|
| `api.js`              | http calls to the backend              |
| `columnDefinition.js` | column definition                      |
| `elementAccess.js`    | cached access to dom elements          |
| `logic/sort.js`       | sort logic                             |
| `logic/filter.js`     | filter logic                           |
| `ui/table.js`         | renders table rows and sort indicators |
| `ui/filter.js`        | renders tech tags                      |
| `main.js`             | holds state and wires events           |

## working example

![demo](demo.gif)