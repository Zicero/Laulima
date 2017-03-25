from flask import Flask
import requests
from bs4 import BeautifulSoup
from lxml.html.clean import clean_html
from jinja2 import Template

app = Flask(__name__)

@app.route('/')
def index():
    template = Template('Hello {{ name }}')

    return template.render(name = 'Lol')

if __name__ == '__main__':
    app.run()

f = open('test.txt', 'r')

html = f.read()

# result = requests.get('https://laulima.hawaii.edu/portal')

soup = BeautifulSoup(clean_html(html), 'lxml')

print soup.find_all('li', 'nav-menu')

