import json
import pandas as pd
import numpy as np
import requests
from flask import Flask, request,jsonify
from sklearn.cluster import KMeans
from sklearn.cluster import SpectralClustering
from sklearn.mixture import GaussianMixture
from sklearn.preprocessing import OneHotEncoder,LabelEncoder,StandardScaler,MinMaxScaler
from sklearn.decomposition import PCA
from sklearn.feature_extraction.text import TfidfVectorizer
import plotly.figure_factory as ff
import plotly.express as px
import plotly.graph_objects as go
import plotly.graph_objects as go
import plotly.io as pio


# app = Flask(__name__)

# @app.route('/')
# def index():
#     """data=requests.json"""

#     f = open('./package.json')
#     data = json.load(f)
#     print(data)

#     return "hello"
    
# if __name__ == '__main__':
#     app.run()    


f=open('./package.json')
loader=json.load(f)
selection=loader['selection']
data=loader['data'] 
data=pd.DataFrame.from_dict(data, orient='columns')
subset=data[selection]

categorical=[]
numerical=[]

std=MinMaxScaler()

for item in selection:
    if(subset.dtypes[item]=="object"):
        categorical.append(item)
        subset[item]=subset[item].apply(str.lower)
    else:
        subset[[item]]=std.fit_transform(subset[[item]])


if("gender" in selection):
    subset['gender']=subset['gender'].replace(['male'],['m'])
    subset['gender']=subset['gender'].replace(['female'],['f'])

if("Browser Detail" in selection):
    for i in range(len(subset['Browser Detail'])):
        if(("google" in subset['Browser Detail'][i])or ("chrome" in subset['Browser Detail'][i])):
            subset['Browser Detail'][i]="Chrome"
        elif("firefox" in subset['Browser Detail'][i]):
            subset['Browser Detail'][i]="Firefox"
        elif("edge" in subset['Browser Detail'][i]):
            subset['Browser Detail'][i]="Edge"
        elif("safari" in subset['Browser Detail'][i]):
            subset['Browser Detail'][i]="Safari"
        elif("opera" in subset['Browser Detail'][i]):
            subset['Browser Detail'][i]="Opera"

Label_encoder=LabelEncoder()
for item in categorical:
    subset[item] = Label_encoder.fit_transform(subset[item])


print(subset)

