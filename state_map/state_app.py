#################################################
# import necessary libraries
#################################################
import pandas as pd
import json
import requests
import plotly.plotly
import getStateData
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
    return render_template("states.html")

# route that returns a list of sample names
@app.route('/siteData/<ST>')
def siteData(ST):
    stateData = getStateData.getStateData(ST)
    top10 = getStateData.getTop10(stateData)
    return top10


#################################################
if __name__ == "__main__":
    app.run(debug=True)