import { Command } from "commander";

const program = new Command();

program.option("-e, --environment <environment>", "environment", "development");

program.parse(process.argv);

export default program;
