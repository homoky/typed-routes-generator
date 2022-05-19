#!/usr/bin/env node

import { Command } from 'commander';
import { generateRoutes } from './generateRoutes';
import { parse } from 'yaml';
import fs from 'fs';

const program = new Command();

program
  .description('Generate typed routes from yaml file')
  .requiredOption('-s, --source <string>', 'path to yaml file with route definitions')
  .requiredOption('-o, --output <string>', 'path to ts where file should be generated to');

program.parse();

const { source, output } = program.opts() as { source: string; output: string };

const file = fs.readFileSync(source, 'utf8');

if (!file) {
  console.log('File with routes could not be loaded.');
  process.exit();
}

const routes = parse(file);

const keys: string[] = Object.keys(routes);

// @ts-ignore
const generatedCode = keys.map((key: string) => generateRoutes({ routes: routes[key], exportConstName: key }));

fs.writeFileSync(output, generatedCode.join(' '));
