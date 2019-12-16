from htmlBuilder import Html
import os
import json

config_file = 'config.json'


def generate_html(filepath, config, input_folder, output_folder):
    filename = os.path.basename(filepath)
    output_file = filepath.replace('.md', '.html')
    # output_file = os.path.join(*(output_file.split(os.path.sep)[1:]))
    # output_file = os.path.join(output_folder, output_file)
    output_file = output_file.replace(input_folder, output_folder)
    os.makedirs(os.path.dirname(output_file), exist_ok=True)

    document = Html(filename.replace('.md', ''), css=config['css'], js=config['js'])
    with open(filepath, 'r') as md_file:
        for line in md_file.readlines():
            document.parseLine(line)
    document.write(output_file)


def main():
    print("Markdown to HTML Converter")

    with open(config_file, 'r') as file:
        config = json.load(file)
    md_folder = config['markdown_folder']
    html_folder = config['html_folder']

    if not os.path.isdir(md_folder):
        print("Error: Unable to find specified markdown folder.")
        exit(1)
    if not os.path.isdir(html_folder):
        os.mkdir(html_folder)

    md_files = []
    for r, d, f in os.walk(md_folder):
        for file in f:
            if file.endswith('.md'): md_files.append(os.path.join(r, file))

    for filepath in md_files:
        generate_html(filepath, config, md_folder, html_folder)
    
    print("Successfully converted to HTML")


if __name__ == "__main__":
    main()