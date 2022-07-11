import sqlalchemy
import pandas as pd
import numpy as np
from sqlalchemy import create_engine, func
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy_utils import database_exists, create_database
from local_settings import postgresql as settings

from flask import Flask, jsonify

import logging

log = logging.getLogger(__name__)


def get_database():
    """
    Connects to database.
    Returns:
        engine
    """
    try:
        engine = get_engine_from_settings()
        log.info("Connected to PostgreSQL database!")
    except IOError:
        log.exception("Failed to get database connection!")
        return None, 'fail'

    return engine


def get_engine_from_settings():
    """
    Sets up database connection from local settings.
    Input:
        Dictionary containing pghost, pguser, pgpassword, pgdatabase and pgport.
    Returns:
        Call to get_database returning engine
    """
    keys = ['pguser','pgpasswd','pghost','pgport','pgdb']
    if not all(key in keys for key in settings.keys()):
        raise Exception('Bad config file')

    return get_engine(settings['pguser'],
                      settings['pgpasswd'],
                      settings['pghost'],
                      settings['pgport'],
                      settings['pgdb'])


def get_engine(user, passwd, host, port, db):
    """
    Get SQLalchemy engine using credentials.
    Input:
        db: database name
        user: Username
        host: Hostname of the database server
        port: Port number
        passwd: Password for the database
    Returns:
        Database engine
    """

    url = 'postgresql://{user}:{passwd}@{host}:{port}/{db}'.format(
        user=user, passwd=passwd, host=host, port=port, db=db)
    if not database_exists(url):
        create_database(url)
    engine = create_engine(url, pool_size=50, echo=False)
    return engine


def get_session():
    """
    Return an SQLAlchemy session
    Input:
        engine: an SQLAlchemy engine
    """
    engine = get_database()
    session = Session(engine)
    return session


db = get_database()
session = get_session()

engine = get_database()

# Declare a Base using `automap_base()`
Base = automap_base()

# Use the Base class to reflect the database tables
Base.prepare(engine, reflect=True)


top10assists = Base.classes.top10assists

app = Flask(__name__)

@app.route("/")
def To10AssistsHome():

    query = session.query(top10assists.id, top10assists.name, top10assists.assists).all()

    # Close our session
    session.close()

    top10 = list(np.ravel(query))
    return jsonify(top10)


# BOILERPLATE Syntax
if __name__ == '__main__':
    app.run(debug=True)