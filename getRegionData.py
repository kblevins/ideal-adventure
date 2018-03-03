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
    regDict = {
        "PacificNorthwest": ["WA", "OR"],
        "NorthernPlains": ["ID", "MT", "WY", "ND", "SD"],
        "PacificSouthwest": ["CA", "NV"],
        "SouthernRockies": ["UT", "CO", "AZ", "NM"],
        "CentralPlains": ["NE", "KS", "OK"],
        "SouthernPlains": ["TX"],
        "Ozarks": ["MO", "AR", "LA", "MS", "AL", "TN"],
        "Southeast": ["FL", "GA"],
        "MidAtlantic": ["SC", "NC", "VA", "WV", "KY"],
        "PrairiePeninsula": ["IA", "IL", "IN"],
        "GreatLakes": ["MN", "WI", "MI"],
        "Northeast": ["PA", "NY", "NJ", "CT", "RI", "MA", "NH", "VT", "ME"]
    }
    headers = {'X-eBirdApiToken': 'p54pcbn15ebh'}
    
    target = regDict[Region]
        
    response_list = []
    #if statement that locates matches user input to region
    for state in target:
        url = f"https://ebird.org/ws2.0/data/obs/US-"+state+"/recent/?back=30"
#             print(url)
        local_response = requests.get(url, headers=headers)
        data = local_response.text
        response_list.append(data)

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