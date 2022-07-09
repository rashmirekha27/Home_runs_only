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
<<<<<<< HEAD
    return render_template('index.html', sampledata=sampledata) 

if __name__ == "__main__":
    app.run(debug=True)
=======
    return render_template('index.html', sampledata=sampledata)
<<<<<<< HEAD

if __name__ == "__main__":
    app.run(debug=True)
=======
<<<<<<< HEAD
    
if __name__ == "__main__":
    app.run(debug=True)
=======

if __name__ == "__main__":
    app.run(debug=True)
>>>>>>> 099fedb2f64cf4855b6df4d3c95bb8813fd81a8f
>>>>>>> eb94e99753413cbeb868b39e41522c2c5ec76787
>>>>>>> ca44e5291d7490f260e83b12f33de6921d21d68e
