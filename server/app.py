import json
import pandas as pd
import numpy as np
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from flask_socketio import SocketIO, emit
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
CORS(app, resources={r"/*": {"origins": "*"}})
# socketio = SocketIO(app, cors_allowed_origins="*")


@app.route('/')
def home():
    f = open('./notebooks/package.json')
    loader = json.load(f)
    return loader


# @socketio.on("connect")
# def connected():
#     """event listener when client connects to the server"""
#     print(request.sid)
#     print("client has connected")
#     emit("connect", {"data": f"id: {request.sid} is connected"})


# @socketio.on('data')
# def handle_message(data):
#     """event listener when client types a message"""
#     print("data from the front end: ", str(data))
#     emit("data", {'data': data, 'id': request.sid}, broadcast=True)


# @socketio.on("disconnect")
# def disconnected():
#     """event listener when client disconnects to the server"""
#     print("user disconnected")
#     emit("disconnect", f"user {request.sid} disconnected", broadcast=True)


@app.route('/', methods=['POST'])
@cross_origin()
def index():
    """data=requests.json"""

    # selection = loader['selection']
    # schema = loader['schema']
    if (request.json['rules'] == []):
        return {}
    else:
        schema = request.json['rules']
        schema = pd.DataFrame.from_dict(schema, orient='columns')

        selection = schema['id']
        data = requests.get(request.json['endpoint']).json()['data']
        data = pd.DataFrame.from_dict(data, orient='columns')
        subset = list(data[selection])

        full = schema[schema['match'] == 'full']
        full = list(full['id'])
        partial = schema[schema['match'] == 'partial']
        partial = list(partial['id'])

        # full = ['STATUS', 'PRODUCTCODE']
        # partial = ['QUANTITYORDERED', 'PRICEEACH', 'SALES', 'PRODUCTLINE',
        #            'MSRP', 'CITY', 'STATE', 'CONTACTLASTNAME', 'CONTACTFIRSTNAME']

        subset = data[selection]
        data = subset.copy()
        std = MinMaxScaler()

        """Processing the FULL Dependencies variables"""
        Label_encoder = LabelEncoder()
        for item in full:
            if (subset.dtypes[item] == 'object'):
                subset[item] = Label_encoder.fit_transform(subset[item])
            else:
                subset[[item]] = std.fit_transform(subset[[item]])

        """Processing the Partial Dependencies Variables"""
        categorial = []
        for item in partial:
            if (subset.dtypes[item] == 'object'):
                categorial.append(item)
            else:
                subset[[item]] = std.fit_transform(subset[[item]])

        subset = pd.get_dummies(subset, columns=categorial)

        pca = PCA(n_components=2, random_state=42)
        subset_pd = pca.fit_transform(subset)

        # wcss = []
        # for i in range(2, 10):
        #     kmeans = KMeans(n_clusters=i, init="k-means++",
        #                     max_iter=500, n_init=10, random_state=123)
        #     kmeans.fit(subset_pd)
        #     labels = kmeans.labels_
        #     wcss.append(silhouette_score(subset_pd, labels, metric='euclidean'))

        # elbowval = wcss.index(max(wcss))+2

        count = int(request.json['count'])

        kmeans = KMeans(n_clusters=count, init="k-means++",
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
    # socketio.run()
    app.run()
