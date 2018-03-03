import json
import requests
import pandas as pd
import plotly.plotly


#Function that takes a species code input and returns a json object of the number of the specified species that was observed in 
#a location over the last 30 days. The JSON is in descending order of number of species seen.
def speciesData(species):
    # use API to retrieve species data
    header = {"x-ebirdapitoken": "p54pcbn15ebh"}
    species_url = "https://ebird.org/ws2.0/data/obs/US/recent/"+species+"/?back=30"
    local_response = requests.get(species_url, headers=header)
    data = local_response.text
    
    #Maniuplate data to get count of species at specific locations over last 30 days
    data = data.replace('true', 'True')
    data = data.replace('false', 'False')
    data = eval(data)
    df = pd.DataFrame(data)
    group_df = pd.DataFrame(df.groupby(['locName', 'lat', 'lng'])['howMany'].sum())
    group_df =group_df.sort_values(by = ['howMany'], ascending = False)
    group_df = group_df.reset_index(level =['lat','lng', 'locName'])
    
    #Convert to Json in order to use in javascript Plotly
    species_json = group_df.to_json(orient='records', force_ascii=False)
    return(species_json)

#The following function is similar but also takes a state input
def speciesStateData(ST, species):
    # use API to retrieve species data
        header = {"x-ebirdapitoken": "p54pcbn15ebh"}
        species_url = "https://ebird.org/ws2.0/data/obs/US-"+ST+"/recent/"+species+"/?back=30"
        local_response = requests.get(species_url, headers=header)
        data = local_response.text
    
    #Maniuplate data to get count of species at specific locations over last 30 days
        data = data.replace('true', 'True')
        data = data.replace('false', 'False')
        data = eval(data)
        df = pd.DataFrame(data)
        group_df = pd.DataFrame(df.groupby(['locName', 'lat', 'lng'])['howMany'].sum())
        group_df =group_df.sort_values(by = ['howMany'], ascending = False)
        group_df = group_df.reset_index(level =['lat','lng', 'locName'])
    
    #Convert to Json in order to use in javascript Plotly
        species_json = group_df.to_json(orient='records', force_ascii=False)
        return(species_json)