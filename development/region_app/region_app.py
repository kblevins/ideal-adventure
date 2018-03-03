#################################################
# import necessary libraries
#################################################
import pandas as pd
import json
import requests
import plotly.plotly
import getRegionData
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect, func

from flask import Flask, render_template, redirect, jsonify

# create instance of Flask app
app = Flask(__name__)
#################################################
# route that renders index.html template
@app.route("/")
def state():
    return render_template("regions.html")

# route that returns a list of sample names
@app.route('/siteData/<Region>')
def siteData(Region):
    regionData = getRegionData.getRegionData(Region)
    top10 = getRegionData.getTop10(regionData)
    return top10


#################################################
if __name__ == "__main__":
    app.run(debug=True)