## import dependencies
import pandas as pd
import requests
import plotly.plotly

## function to fetch 30 days worth of data for a state, 
## subset by the top 10 sites with the most # of species
## return json object with location name, lat longs, & # 
## of species & json object with top 5 most observed birds 
## at each location 
def getStateData(state):

    # Part 1 - Get data
    # set url, token, & request data
    url = f"https://ebird.org/ws2.0/data/obs/US-{state}/recent/?back=30"
    headers = {'X-eBirdApiToken': 'oos4bb9k3art'}
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
    df_s = df.loc[:,['locName', 'comName']]
    # remove duplicate records
    df_s = df_s.drop_duplicates()
    # create count of species observations from each location
    counts = df_s.groupby(['locName'])['locName'].count()
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
    # subset original df for spatial columns
    locs = df.loc[:,['lat', 'lng', 'locName']]
    # remove duplicate rows
    locs = locs.drop_duplicates()
    # merge with top_ten df
    top_ten = top_ten.merge(locs)
    # convert to json
    top10_loc = top_ten.to_json(orient='records', force_ascii=False)

    return(top10_loc)

    # Part 3 - Get top 5 species at each location
    # subset original df for the top 10 locations
def getTop5(df):
    top_ten_sp = df.loc[df['locName'].isin(top_ten['locName'])]
    # subset for relevant columns
    top_ten_sp = top_ten_sp.loc[:,['comName', 'howMany', 'locName']]
    # group by location & species to sum the total # of each species 
    # has been recorded at that location
    top_ten_sp = pd.DataFrame(top_ten_sp.groupby(['comName', 'locName'])['howMany'].sum())
    # reset index
    top_ten_sp = top_ten_sp.reset_index()
    # sort by location name & howMany
    top_ten_sp = top_ten_sp.sort_values(by = ['locName', 'howMany'], ascending = False)
    # group by location
    top_ten_gr = top_ten_sp.groupby('locName')
    # subset for top 5 species at each location
    top_ten_gr = top_ten_gr.head(5)
    # convert to json
    top10_sp_j = top_ten_gr.to_json(orient='records', force_ascii=False)

    return(top10_sp_j)