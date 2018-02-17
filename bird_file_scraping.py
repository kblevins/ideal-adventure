# import dependencies
from splinter import Browser
from bs4 import BeautifulSoup as bs
import pandas as pd

def img_audio(bird):
    # chrome driver
    executable_path = {'executable_path': 'chromedriver'}
    browser = Browser('chrome', **executable_path, headless=False)

    # open search page
    url = 'https://www.allaboutbirds.org/search/'
    browser.visit(url)

    # input bird name & submit search
    browser.find_by_xpath('//*[@id="main-nav-header"]/nav/div[2]/form/input').fill(bird)
    browser.find_by_xpath('//*[@id="main-nav-header"]/nav/div[2]/form/button').first.click()

    # store html
    html = browser.html
    
    # create beautiful soup object
    soup = bs(html, 'html.parser')

    # grab ul item with id speciesResults
    ul = soup.find("ul", {"id": "speciesResults"})
    
    # store first li item
    li = ul.find_all("li")[0]

    # store address to first image
    img = target.find_all("img")[0]['src']

    # store address to audio file
    audio = target.find_all("audio")[0]['src']
    
    # return list of the image & audio files
    return [img, audio]
