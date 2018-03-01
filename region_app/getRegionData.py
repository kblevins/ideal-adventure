## import dependencies
import pandas as pd
import requests
import plotly.plotly

## function to fetch 30 days worth of data for a state, 
## subset by the top 10 sites with the most # of species
## return json object with location name, lat longs, & # 
## of species & json object with top 5 most observed birds 
## at each location 
def getRegionData(Region):
    #Define regions
    PacificNorthwest = ["WA", "OR"]
    NorthernPlains = ["ID", "MT", "WY", "ND", "SD"]
    PacificSouthwest = ["CA", "NV"]
    SouthernRockies = ["UT", "CO", "AZ", "NM"]
    CentralPlains = ["NE", "KS", "OK"]
    SoutherPlains = ["TX"]
    Ozarks = ["MO", "AR", "LA", "MS", "AL" "TN"]
    Southeast = ["FL", "GA"]
    MidAtlantic = ["SC", "NC", "VA", "WV", "KY"]
    PrairiePennisula = ["IW", "IL", "IN"]
    GreatLakes = ["MN", "WI", "MI"]
    Northeast =["PA", "NY", "NJ", "CT", "RI", "MA", "NH", "VT", "ME"]
    headers = {'X-eBirdApiToken': 'p54pcbn15ebh'}
    response_list = []
    
    #if statement that locates matches user input to region
    if Region == "PacificNorthwest":
        for states in PacificNorthwest:
            url = f"https://ebird.org/ws2.0/data/obs/US-"+states+"/recent/?back=30"
#             print(url)
            local_response = requests.get(url, headers=headers)
            data = local_response.text
            response_list.append(data)
#            print(response_list)
    elif Region == "NorthernPlains":
        for states in NorthernPlains:
            url = f"https://ebird.org/ws2.0/data/obs/US-"+states+"/recent/?back=30"
            local_response = requests.get(url, headers=headers)
            data = local_response.text
            response_list.append(data)
#             print(response_list)
    elif Region == "PacificSouthwest":
        for states in PacificSouthwest:
            url = f"https://ebird.org/ws2.0/data/obs/US-"+states+"/recent/?back=30"
            local_response = requests.get(url, headers=headers)
            data = local_response.text
            response_list.append(data)
#             print(response_list)
    elif Region == "SouthernRockies":
        for states in SouthernRockies:
            url = f"https://ebird.org/ws2.0/data/obs/US-"+states+"/recent/?back=30"
            local_response = requests.get(url, headers=headers)
            data = local_response.text
            response_list.append(data)
#             print(response_list)
    elif Region == "CentralPlains":
        for states in CentralPlains:
            url = f"https://ebird.org/ws2.0/data/obs/US-"+states+"/recent/?back=30"
            local_response = requests.get(url, headers=headers)
            data = local_response.text
            response_list.append(data)
#            print(response_list)
    elif Region == "SouthernPlains":
        for states in SoutherPlains:
            url = f"https://ebird.org/ws2.0/data/obs/US-"+states+"/recent/?back=30"
            local_response = requests.get(url, headers=headers)
            data = local_response.text
            response_list.append(data)
#             print(response_list)
    elif Region == "Ozarks":
        for states in Ozarks:
            url = f"https://ebird.org/ws2.0/data/obs/US-"+states+"/recent/?back=30"
            local_response = requests.get(url, headers=headers)
            data = local_response.text
            response_list.append(data)
#             print(response_list)
    elif Region == "Southeast":
        for states in Southeast:
            url = f"https://ebird.org/ws2.0/data/obs/US-"+states+"/recent/?back=30"
            local_response = requests.get(url, headers=headers)
            data = local_response.text
            response_list.append(data)
#             print(response_list)
    elif Region == "MidAtlantic":
        for states in MidAtlantic:
            url = f"https://ebird.org/ws2.0/data/obs/US-"+states+"/recent/?back=30"
            local_response = requests.get(url, headers=headers)
            data = local_response.text
            response_list.append(data)
#             print(response_list)
    elif Region == "PrairiePennisula":
        for states in PrairiePennisula:
            url = f"https://ebird.org/ws2.0/data/obs/US-"+states+"/recent/?back=30"
            local_response = requests.get(url, headers=headers)
            data = local_response.text
            response_list.append(data)
#             print(response_list)
    elif Region == " GreatLakes":
        for states in GreatLakes:
            url = f"https://ebird.org/ws2.0/data/obs/US-"+states+"/recent/?back=30"
            local_response = requests.get(url, headers=headers)
            data = local_response.text
            response_list.append(data)
#             print(response_list)
    elif Region == "Northeast":
        for states in Northeast:
            url = f"https://ebird.org/ws2.0/data/obs/US-"+states+"/recent/?back=30"
            local_response = requests.get(url, headers=headers)
            data = local_response.text
            response_list.append(data)
#             print(respons.hee_list)

    totallist = []
    for idx,item in enumerate(response_list):
        item = item.replace('true', 'True')
        item = item.replace('false', 'False')
        item = eval(item)
        #print(item)
        for resp_dict in item:
            totallist.append(resp_dict)       
    df = pd.DataFrame(totallist)
    return(df)

# Part 2 - Get top 10 locations
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