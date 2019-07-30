import fs from 'fs';
import path from 'path';
import express from 'express';
import { json as jsonParser } from 'body-parser';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const { PORT = '9999' } = process.env;
const inputsPath = path.resolve(__dirname, '../inputs.json');
const app = express();

const compiler = webpack({
  mode: 'development',
  entry: __dirname + '/cms.tsx',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'CMS'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
});

app.get('/api/inputs', (req, resp, next) => {
  fs.readFile(inputsPath, 'utf8', (err, data) => {
    if (err) {
      return next(err);
    }

    resp.type('json').send(data);
  });
});

app.put('/api/inputs', jsonParser(), (req, resp, next) => {
  fs.writeFile(inputsPath, JSON.stringify(req.body, null, 2), err => {
    if (err) {
      return next(err);
    }

    resp.send(req.body);
  });
});

app.use(
  webpackMiddleware(compiler, {
    publicPath: '/'
  })
);

app.listen(PORT);
console.log(`Listening on port ${PORT}`)