import os
import psycopg2
from flask import Flask, render_template

app = Flask(__name__)

def get_db_connection():
    conn = psycopg2.connect(host='localhost',
                            database='Home_Runs_Only',
                            user=os.environ['postgres'],
                            password=os.environ['admin'])
    return conn


@app.route('/')
def index():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM sample;')
    sampledata = cur.fetchall()
    cur.close()
    conn.close()
    return render_template('index.html', sampledata=sampledata) 

if __name__ == "__main__":
    app.run(debug=True)