# import dependencies
from splinter import Browser
from bs4 import BeautifulSoup as bs

def img_audio(bird):
    # chrome driver
    executable_path = {'executable_path': 'chromedriver'}
    browser = Browser('chrome', **executable_path, headless=True)

    bird = bird.replace(" ","%20")

    # open search page
    url = f'https://www.allaboutbirds.org/search/?q={bird}'
    browser.visit(url)

    # store html
    html = browser.html
    
    # create beautiful soup object
    soup = bs(html, 'html.parser')

    # grab ul item with id speciesResults
    ul = soup.find("ul", {"id": "speciesResults"})
    
    # store first li item
    li = ul.find_all("li")[0]

    # store address to first image
    img = li.find_all("img")[0]['src']

    # store address to audio file
    audio = li.find_all("audio")[0]['src']
    
    # store link
    link = li.find_all("a")[0]['href']
    
    # return list of the image & audio files & link
    return [img, audio, link]
