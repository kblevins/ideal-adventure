## import dependencies
import pandas as pd
import requests
import plotly.plotly
import os

## function to fetch 30 days worth of data for a state, 
## subset by the top 10 sites with the most # of species
## return json object with location name, lat longs, & # 
## of species & json object with top 5 most observed birds 
## at each location 
def getStateData(state):

    # Part 1 - Get data
    # set url, token, & request data
    url = f"https://ebird.org/ws2.0/data/obs/US-{state}/recent/?back=30"
    ebird_token = os.getenv('ebird_token')
    headers = {'X-eBirdApiToken': ebird_token}
    response = requests.request("GET", url, headers=headers)

    # Part 2 - Get top 10 locations
    # store reponse test
    data = response.text
    # replace true & false
    data = data.replace('true', 'True')
    data = data.replace('false', 'False')
    # get list out of string
    data = eval(data)
    # convert to pandas df
    df = pd.DataFrame(data)

    return(df)

def getTop10(df):
    # create subset of columns to evaluate
    df_s = df.loc[:,['locName', 'lat', 'lng','comName']]
    # remove duplicate records
    df_s = df_s.drop_duplicates()
    # create count of species observations from each location
    counts = df_s.groupby(['locName', 'lat', 'lng'])['locName'].count()
    # sort by the species count
    counts = counts.sort_values(ascending = False)
    # subset for top 10
    top_ten = counts[0:10]
    # rename the series
    top_ten = top_ten.rename('species_number')
    # convert series to dataframe
    top_ten = pd.DataFrame(top_ten)
    # reset index
    top_ten = top_ten.reset_index()
    # convert to json
    top_tenj = top_ten.to_json(orient='records', force_ascii=False)
    top_tenj = top_tenj.replace("\\","")
    return(top_tenj)

    # Part 3 - Get top 5 species at each location
    # subset original df for the top 10 locations
def getBirds(df):
    sp = df.loc[:,['comName', 'howMany', 'locName']]
    # group species to sum the total # of each species 
    # has been recorded at that location
    sp = pd.DataFrame(sp.groupby(['comName'])['howMany'].sum())
    # reset index
    sp = sp.reset_index()
    # sort by location name & howMany
    sp = sp.sort_values(by = ['howMany'], ascending = False)
    # filter for species level identifications
    spFilter = sp.comName.str.contains('sp\\.')
    spFilter = spFilter[spFilter == False]
    spLevel = sp.filter(items = spFilter.index, axis=0)
    # subset for top 5 species at each location
    topsp = spLevel.head(5)
    # convert to json
    topsp_j = topsp.to_json(orient='records', force_ascii=False)
    topsp_j = topsp_j.replace("\\","")
    topsp_j

    return(topsp_j)