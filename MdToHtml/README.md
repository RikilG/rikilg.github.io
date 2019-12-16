# Markdown to Html Converter

This folder contains my own python script which converts markdown files to html.  
currently it only recognizes:
 - Headings (level 1-5)
 - Paragraphs 
 - Bold and Italic texts
 - Tables

## Setting up

There is a config file in which your css and js files can added so that they will be 
included after static html pages are produced.

```json
// example json file with supported keys
// both relative and absolute paths are supported
// css and js paths are copied as-is. so make sure you put target paths here!
{
    "markdown_folder": "markdown",
    "html_folder": "html",
    "css": [
        "css/index.css"
        // other css files
    ],
    "js": [
        "js/index.js"
        //other js files
    ]
}
```


## Running

To run:
```sh
# using python version > 3.4
# use python3 if on ubuntu
python convert.py
```


## CSS Attributes

Make sure you add this css file in the above config to work.
(and don't forget that path is relative from final html location)  
Supported CSS Attributes(all classes):
 - `md-root`: root div for entire markdown page
 - `md-heading`: control all heading levels
 - `md-paragraph`: control the paragraphs or text in markdown
 - `md-table`: control table properties
 - `md-table-row`: control row properties
 - `md-table-head`: control first row of table
 - `md-table-data`: control each data cell