import json
import requests
import pandas as pd
import plotly.plotly
import os


#Function that takes a species code input and returns a json object of the number of the specified species that was observed in 
#a location over the last 30 days. The JSON is in descending order of number of species seen.
def speciesData(species, days):
    # use API to retrieve species data
    ebird_token = os.getenv('ebird_token')
    header = {'X-eBirdApiToken': ebird_token}
    species_url = "https://ebird.org/ws2.0/data/obs/US/recent/"+species+"/?back="+days
    local_response = requests.get(species_url, headers=header)
    data = local_response.text
    
    #Maniuplate data to get count of species at specific locations over last 30 days
    data = json.loads(data)
    df = pd.DataFrame(data)
    group_df = pd.DataFrame(df.groupby(['locName', 'lat', 'lng'])['howMany'].sum())
    group_df = group_df.dropna()
    group_df =group_df.sort_values(by = ['howMany'], ascending = False)
    group_df = group_df.reset_index(level =['lat','lng', 'locName'])
    if group_df.shape[0]:
        group_df = group_df.head(100)
    #Convert to Json in order to use in javascript Plotly
    species_json = group_df.to_json(orient='records', force_ascii=False)
    return(species_json)