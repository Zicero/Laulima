import os
import requests
from bs4 import BeautifulSoup
from flask import Flask, render_template, send_from_directory, request, redirect, url_for, jsonify
import json
import urlparse
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/data')
def data():
    return render_template('index.html')

@app.route('/<path:path>')
def static_proxy(path):
  return app.send_static_file(path)

@app.route('/', methods=['POST'])
def handle_data():
    if (not request.form['username'] or not request.form['password']):
        return redirect(url_for('index'))
    driver = webdriver.Chrome("/usr/lib/chromium-browser/chromedriver")
    driver.set_window_size(1300, 700)
    driver.get('https://laulima.hawaii.edu/portal/relogin')

    username = driver.find_element_by_id("eid")
    password = driver.find_element_by_id("pw")

    username.send_keys(request.form['username'])
    password.send_keys(request.form['password'])

    driver.find_element_by_name("submit").click()

    elements = driver.find_elements_by_class_name('alertMessage')

    # Object to return
    json = {
        'data': {
            'nav': [],
            'body': {
                'sections': []
            }
        },
        'status_code': '',
        'text': ''
    }
    # Getting information
    drop = driver.find_elements_by_class_name('drop')
    for span in drop:
        span.click()

    soup = BeautifulSoup(driver.page_source, 'lxml')
    # Content
    titles = []
    bodies = []
    i = 0
    for div in soup.find_all('div', 'portletTitleWrap'):
        for title in div.find_all('div', 'title'):
            titles.append(title.getText())
    for div in soup.find_all('div', 'portletMainWrap'):
        i = i + 1
        iframe = div.find('iframe')
        if (iframe):
            if(not bool(urlparse.urlparse(iframe.attrs['src']).netloc)):
                iframe.attrs['src'] = 'https://laulima.hawaii.edu' + iframe.attrs['src']
            obj = {'src': iframe.attrs['src']}
            bodies.append(obj)
        else:
            titles.pop(i)

    for idx, val in enumerate(titles):
        obj = {}
        obj[val] = bodies[idx]
        json['data']['body']['sections'].append(obj)
    # Nav Bar
    for li in soup.find_all('li', 'nav-menu'):
        obj = {'text': li.find(text=True, recursive=True), 'a': []}
        for ul in li.find_all('ul'):
            for a in ul.find_all('a'):
                obj['a'].append({'href': a.attrs['href'], 'text': a.getText()})
        json['data']['nav'].append(obj)

    if (str(elements[0].text) == 'Invalid login'):
        driver.quit()
        json['status_code'] = 401
        json['text'] = 'Unsuccessful Authentication.'
        return jsonify(json)
    else:
        driver.quit()
        json['status_code'] = 200
        json['text'] = 'Successful Authentication!'
        return jsonify(json)

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='localhost', port=port)
