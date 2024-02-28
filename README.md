# `plot-csv`

> CSV to scatter plot in a browser via ChartJS in one command

Check out an [example](https://nirmal.meka.la/plot-csv).

## Usage

```
plot-csv ./path/to/csv
```

- `plot-csv` accepts x data in the form of either numbers or dates (YYYY-MM-DD)

## Development

To have webpack watch your source files and rebuild on change: 
```
npm run watch
```

To have the CLI watch the `dist` directory and restart on change, run the develop command with a CSV specified: 
```
npm run develop ./path/to/csv
```

## Testing
```
npm run test
```

## Deployment

```
./build-and-install
```
