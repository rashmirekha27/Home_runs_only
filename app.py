import os
import pandas as pd
from sqlalchemy import create_engine
from flask import Flask, render_template, jsonify

app = Flask(__name__)

def get_db_connection():
    protocol = 'postgresql'
    username = 'postgres'
    password = 'admin'
    host = 'localhost'
    port = 5432
    database_name = 'Home_Runs_Only'
    rds_connection_string = f'{protocol}://{username}:{password}@{host}:{port}/{database_name}'
    engine = create_engine(rds_connection_string)
    engine.table_names()
    return engine.connect()


@app.route('/')
def index():
    conn = get_db_connection()
    # pd.read_sql('select * from sample', con=conn)
    sampledata = pd.read_sql('select * from sample', con=conn)
    return render_template('index.html', sampledata='plow')
    # jsonify(sampledata.to_dict()))
    # return jsonify(sampledata.to_dict())
if __name__ == "__main__":
    app.run(debug=True)
