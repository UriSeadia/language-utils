# language-utils
language utilities


# Introduction
This package is a command line tool which contains scripts that helps to manage the language translations any product.


# Table of Contents
* [Get started](#get-started)
* [Generate English-English File for Your Project](#generate-english-english-file)
* [Generate Excel File for a Translator](#generate-excel-file-for-a-translator)
* [Integrate Excel File From a Translator to Your Project](#integrate-excel-file-from-a-translator-to-your-project)


## Get started
Start by cloning this repository to your local machine:
> `git clone <clone-number>`

Go to the root of the project:
> `cd /path/to/language-utils`

Install the needed packages:
> `npm install`

Build the package:
> `npm run build`

Now the app is ready for use.

You have 2 options for running the scripts in this project:
* [Run from the root of this project via interactive CLI](#interactive-command-line-user-interfaces)
* [Run from everywhere using CLI](#run-from-everywhere-using-cli)


## Interactive command line user interfaces
Run the app from the root of this project
> `npm start`

When you run the app from the command line using `npm start` you will get 3 options:
  1. [Generate English-English File for Your Project](#generate-english-english-file)
  2. [Generate Excel File for a Translator](#generate-excel-file-for-a-translator)
  3. [Integrate Excel File From a Translator to Your Project](#integrate-excel-file-from-a-translator-to-your-project)

Each option represents a different action.

Use the arrow keys to choose which one of these actions you would like to perform.

Each action needs a few parameters, insert the needed parameters by following the instructions in your command line.

## Run from everywhere using CLI
Create a symbolic link to the CLI tool using "npm link":
> `cd /path/to/language-utils`

> `npm link`

Make sure the symbolic link was created in /usr/local/bin:
> `cd /usr/local/bin/`

> `ls -l | grep lang-utils`

Now, you can run the scripts via the command line from everywhere.

Use the help button to see the manual for running the scripts:
> `lang-utils -h`

or

> `lang-utils --help`

In this help you will see 5 options for 5 different scripts:

```bash
$ lang-utils --help
Usage: lang-utils [options] [command]

Options:
  -V, --version                                                                                       output the version number
  -h, --help                                                                                          display help for command

Commands:
  generate-english-json|gen [root_directory] [dir_to_save] [file_name]                                Generate English-English .json file for your project
  generate-excel|excel <english_file_path> <other_lang_file_path> [dir_to_save] [file_name]           Generate Excel (.xlsx) file for sending to translation
  integrate-excel|integ <excel_file_path> <lang_file_path> [dir_to_save] [file_name]                  Integrate the excel from the translator to your project
  translator-excel-report|ter [options] <excel_file_path> <lang_file_path> [dir_to_save] [file_name]  Generate report file with errors and warnings for the excel from the translator
  compare-lang-files|compare [options] <new_file_path> <old_file_path> [dir_to_save] [file_name]      Generate comparison report between old language file and new language file
  help [command] 
```

You can run each of these commands. Each command holds it's own help as well. For example:

```bash
$ lang-utils generate-english-json --help
Usage: lang-utils generate-english-json|gen [options] [root_directory] [dir_to_save] [file_name]

Generate English-English .json file for your project

Options:
  -h, --help  display help for command

Arguments:
  [root_directory] path to your project's root                                          default: current directory
  [dir_to_save]    path to the directory where you would like to save the output file   default: current directory
  [file_name]      name for your output file (with '.json' suffix)                      default: 'english.json'

Example:
  $ lang-utils gen /path/to/root/dir/ /path/to/dir_to_save/ my_file.json
```

So, for example, you can change the directory to your project:

> `cd /path/to/your_project`

And generate a new English-English file using the command line:

> `$ lang-utils gen`

This will create the file 'english.json' in the current directory.

If you like you can create the file with different name in a different location. For example:

> `$ lang-utils gen . /tmp/ lang.en.json`

Will create the file 'lang.en.json' in /tmp/ directory.

See the --help option for each command, in order to understand the action and the needed arguments.

Read the next sections to understand the 3 main scripts.

## Generate English-English file

This scripts require 3 parameters:
  1. The full path to the root of your project.
  2. The directory where you would like to save the generated file.
  3. A name for the new file (suffix '.json').

The script is iterating recursively all the files and folders of your project, starting from the root of the project, finding the language objects using the language pattern, and generate a new English-English .json file in the given path `<directory>/<file-name>`.
  
## Generate Excel File for a Translator

This scripts require 4 parameters:
  1. The full path to the the English-English file of your project.
  2. The full path to the the other language file (i.e English-French) of your project.
  3. The directory where you would like to save the generated Excel file.
  4. A name for the new file (suffix '.xlsx').

The script compares the 2 .json files (arguments 1 & 2) and generates an Excel file that includes the keys that exists in the English-English file and does not exists in the French-English (or any other) file.

The generated Excel will be saved in the given path (arguments 3 & 4) `<directory>/<file-name>`.

  
## Integrate Excel File from a Translator to Your Project

This scripts require 4 parameters:
  1. The full path to the the Excel file that filled by the translator.
  2. The full path to the the language file that you want to update (i.e English-French) of your project.
  3. The directory where you would like to save the generated .json file.
  4. A name for the new file (suffix '.json').

The script gets the keys & values from the translator .xlsx file (argument 1) and insert them as a new key-value pairs to a copy of the language file (argument 2).

This script produces a new .json file in the given path (arguments 3 & 4) `<directory>/<file-name>`.

You should replace the current English-French file with the generated file.
