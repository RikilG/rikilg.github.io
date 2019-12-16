import re

class Html:

    js = []
    css = []
    title = None
    content = None
    inTable = False
    tableHead = True
    inParagraph = False

    def __init__(self, title, css, js):
        self.title = title
        self.css = css
        self.js = js
        self.content = ""
        self.start()

    def start(self):
        title = self.title
        css = self.css
        css_text = ""
        
        for path in css:
            css_text += f'<link charset="UTF-8" rel="stylesheet" href="{path}" />\n'

        text = f"""<!DOCTYPE html>
<html>
<head>
<title>{title}</title>
{css_text}</head>
<body>
<div class="md-root">
"""
        self.content += text

    def end(self):
        js = self.js
        js_text = ""
        
        for path in js:
            js_text += f'<script charset="UTF-8" src="{path}"></script>\n'
        
        text = f"""</div>
{js_text}</body>
</html>
"""
        self.content += text

    def stylize_text(self, line):
        bold = re.compile(r'\*\*([\w\d\s<>/()&;\-_\\\.?,!@#$%+=]+)\*\*')
        italics = re.compile(r'\*([\w\d\s<>/()&;\-_\\\.?,!@#$%+=]+)\*')
        line = bold.sub(lambda x: '<strong>'+x.group(1)+'</strong>', line)
        line = italics.sub(lambda x: '<em>'+x.group(1)+'</em>', line)
        return line

    def heading(self, line):
        rline = re.sub(r'^[#]*[ ]*', '', line).replace('\n', '')
        if line.startswith('#####'): line = '<h5 class="md-heading">'+rline+'</h5>'
        elif line.startswith('####'): line = '<h4 class="md-heading">'+rline+'</h4>'
        elif line.startswith('###'): line = '<h3 class="md-heading">'+rline+'</h3>'
        elif line.startswith('##'): line = '<h2 class="md-heading">'+rline+'</h2>'
        elif line.startswith('#'): line = '<h1 class="md-heading">'+rline+'</h1>'
        self.content += line + '\n'
    
    def table(self, line):
        row_regex = re.compile(r'^\|(.+)\|$')
        if self.tableHead:
            self.tableHead = False
            line = row_regex.sub(lambda x: '<tr class="md-table-row">\n\t<th class="md-table-head">'+x.group(1)+'</th>\n</tr>', line)
            line = re.sub(r'\|', '</th>\n\t<th class="md-table-head">', line)
        else:
            line = row_regex.sub(lambda x: '<tr class="md-table-row">\n\t<td class="md-table-data">'+x.group(1)+'</td>\n</tr>', line)
            line = re.sub(r'\|', '</td>\n\t<td class="md-table-data">', line)
        if not self.inTable:
            self.inTable = True
            line = '<table class="md-table">\n' + line
        self.content += line

    def parseLine(self, line):
        if line.startswith('#'):
            self.heading(line)
            return
        elif re.match(r'^\|.+\|$', line):
            self.table(line)
            return
        
        if line=='\n':
            if self.inParagraph:
                self.inParagraph = False
                line = '</p>\n'
            elif self.inTable:
                self.inTable = False
                self.tableHead = True
                line = '</table>\n'
            elif not self.inParagraph and not self.inTable:
                return
        else:
            if not self.inParagraph:
                self.inParagraph = True
                line = self.stylize_text(line)
                line = '<p class="md-paragraph">\n' + line
            else:
                line = self.stylize_text(line)

        if line.endswith('  ') or line.endswith('  \n'): line += '<br />\n'
        self.content += line

    def clearTags(self):
        if self.inParagraph:
            self.content += '</p>\n'
        if self.inTable:
            self.content += '\n</table>\n'
        if not self.content.endswith('</html>'):
            self.end()
    
    def write(self, filename):
        self.clearTags()
        with open(filename, 'w') as file:
            file.write(self.content)