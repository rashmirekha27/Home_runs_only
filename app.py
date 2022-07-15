import sqlalchemy
import pandas as pd
import numpy as np
from sqlalchemy import create_engine, func
from sqlalchemy.orm import Session
from sqlalchemy_utils import database_exists, create_database
from local_settings import postgresql as settings
from flask import render_template, redirect

from flask import Flask, jsonify

import logging

log = logging.getLogger(__name__)

# Create a connection to PostgreSQL to provide access to tables
def get_database():
    
    try:
        engine = get_engine_from_settings()
        log.info("Connected to PostgreSQL database!")
    except IOError:
        log.exception("Failed to get database connection!")
        return None, 'fail'

    return engine

# Create a function to establish a database connection using the Postgresql settings defined in the local settings file
# Input:
# Dictionary containing pghost, pguser, pgpassword, pgdatabase and pgport.
# Returns: Call to get_database returning engine
def get_engine_from_settings():
    keys = ['pguser','pgpasswd','pghost','pgport','pgdb']
    if not all(key in keys for key in settings.keys()):
        raise Exception('Bad config file')

    return get_engine(settings['pguser'],
                      settings['pgpasswd'],
                      settings['pghost'],
                      settings['pgport'],
                      settings['pgdb'])


# Create function for SQLalchemy engine using credentials.
# Input: db: database name
        #user: Username
        # host: Hostname of the database server
        # port: Port number
        # passwd: Password for the database
# Return: Database engine
def get_engine(user, passwd, host, port, db):
    url = 'postgresql://{user}:{passwd}@{host}:{port}/{db}'.format(
        user=user, passwd=passwd, host=host, port=port, db=db)
    if not database_exists(url):
        create_database(url)
    engine = create_engine(url, pool_size=50, echo=False)
    return engine


engine = get_database()

# Create Flask app 
app = Flask(__name__)

# Create home route
@app.route("/")
def home():


    # Return template and data
    return render_template("index.html")

# Create route for Top10Assists from SQL database
@app.route("/Top10Assists")
def Top10Assists():

    df = pd.read_sql("select * from top10assists", con=engine.connect())
    
    return jsonify(df.to_dict())
    

# Create route for team_stats from SQL database
@app.route("/team_stats")
def teamstats():

    df = pd.read_sql("select * from team_stats", con=engine.connect())

    return jsonify(df.to_dict()) 

# Create route for Top10Goals from SQL database
@app.route("/goals")
def topgoals():

    df = pd.read_sql("select * from top10goals", con=engine.connect())

    return jsonify(df.to_dict()) 

# Create route for Top10Passes from SQL database
@app.route("/passes")
def toppasses():

    df = pd.read_sql("select * from top10passes", con=engine.connect())

    return jsonify(df.to_dict()) 

# Create route for SQL table containing all data
@app.route("/all_data")
def all():

    df = pd.read_sql("select * from sample", con=engine.connect())

    return jsonify(df.to_dict()) 

# Create a route that will access the sample table in SQL database, that contains all data in order to create a list of goals scored for each team
@app.route("/clubgoals")
def clubgoals():

    df = pd.read_sql("Select club, sum(goals) as TotalGoals from sample group by club order by sum(goals)", con=engine.connect())

    return jsonify(df.to_dict()) 


# BOILERPLATE Syntax
if __name__ == '__main__':
    app.run(debug=True)