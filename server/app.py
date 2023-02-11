import json
import pandas as pd
import numpy as np
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

from sklearn.cluster import KMeans
from sklearn.cluster import SpectralClustering
from sklearn.mixture import GaussianMixture
from sklearn.preprocessing import OneHotEncoder, LabelEncoder, StandardScaler, MinMaxScaler
from sklearn.decomposition import PCA
from sklearn.feature_extraction.text import TfidfVectorizer
import plotly.figure_factory as ff
import plotly.express as px
import plotly.graph_objects as go
import plotly.graph_objects as go
import plotly.io as pio
from sklearn.metrics import silhouette_score

app = Flask(__name__)


@app.route('/')
def home():
    return "Hello world"


@app.route('/', methods=['POST'])
@cross_origin()
def index():
    """data=requests.json"""

    f = open('./notebooks/package.json')
    loader = json.load(f)
    # selection = loader['selection']
    selection = request.json['selection']
    data = loader['data']
    data = pd.DataFrame.from_dict(data, orient='columns')
    subset = list(data[selection])

    # schema = loader['schema']
    schema = request.json['schema']
    schema = pd.DataFrame.from_dict(schema, orient='columns')

    full = schema[schema['match'] == 'full']
    full = list(full['id'])
    partial = schema[schema['match'] == 'partial']
    partial = list(partial['id'])

    # full = ['STATUS', 'PRODUCTCODE']
    # partial = ['QUANTITYORDERED', 'PRICEEACH', 'SALES', 'PRODUCTLINE',
    #            'MSRP', 'CITY', 'STATE', 'CONTACTLASTNAME', 'CONTACTFIRSTNAME']

    subset = data[selection]
    data = subset.copy()

    """Processing the FULL Dependencies variables"""

    Label_encoder = LabelEncoder()
    for item in full:
        subset[item] = Label_encoder.fit_transform(subset[item])

    """Processing the Partial Dependencies Variables"""
    categorial = []
    std = MinMaxScaler()
    numerical = []
    for item in partial:
        if (subset.dtypes[item] == 'object'):
            categorial.append(item)
        else:
            subset[[item]] = std.fit_transform(subset[[item]])

    subset = pd.get_dummies(subset, columns=categorial)

    pca = PCA(n_components=2, random_state=42)
    subset_pd = pca.fit_transform(subset)

    wcss = []
    for i in range(2, 10):
        kmeans = KMeans(n_clusters=i, init="k-means++",
                        max_iter=500, n_init=10, random_state=123)
        kmeans.fit(subset_pd)
        labels = kmeans.labels_
        wcss.append(silhouette_score(subset_pd, labels, metric='euclidean'))

    elbowval = wcss.index(max(wcss))+2

    kmeans = KMeans(n_clusters=2, init="k-means++",
                    max_iter=500, n_init=10, random_state=123)
    identified_clusters = kmeans.fit_predict(subset_pd)

    data_with_clusters = pd.DataFrame(data).copy()
    data_with_clusters['Cluster'] = identified_clusters

    # fig = px.scatter(data_with_clusters, x = "SALES", y="PRODUCTCODE",
    #           color='Cluster', opacity = 0.8,size_max=30,template="plotly_dark",hover_name="STATUS")
    # fig.show()

    # categorical = []

    # std = MinMaxScaler()

    # for item in selection:
    #     if(subset.dtypes[item] == "object"):
    #         categorical.append(item)
    #         subset[item] = subset[item].apply(str.lower)
    #     else:
    #         subset[[item]] = std.fit_transform(subset[[item]])

    # for item in full:
    #     if(item in categorical):
    #         categorical.remove(item)

    # """Processing the FULL Dependencies variables"""
    # Label_encoder = LabelEncoder()
    # for item in full:
    #     subset[item] = Label_encoder.fit_transform(subset[item])

    # """Processing the Partial Dependencies Variables"""
    # subset=pd.get_dummies(subset,columns=categorical)

    # wcss = []
    # for i in range(2, 10):
    #     kmeans = KMeans(n_clusters=i, init="k-means++",
    #                     max_iter=500, n_init=10, random_state=123)
    #     kmeans.fit(subset)
    #     labels = kmeans.labels_
    #     wcss.append(silhouette_score(subset, labels, metric='euclidean'))

    # elbowval = wcss.index(max(wcss))+1
    # print(elbowval)

    # kmeans = KMeans(n_clusters=elbowval, init="k-means++",
    #                 max_iter=500, n_init=10, random_state=123)
    # identified_clusters = kmeans.fit_predict(subset)

    # data_with_clusters = pd.DataFrame(subset).copy()
    # data_with_clusters['Cluster'] = identified_clusters

    # print(data_with_clusters)

    return data_with_clusters.to_dict()


if __name__ == '__main__':
    app.run()
