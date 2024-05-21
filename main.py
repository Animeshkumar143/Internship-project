from flask import Flask, render_template, jsonify
import pandas as pd

app = Flask(__name__)

def load_data():
    df = pd.read_csv('salaries.csv')
    df['Year'] = df['work_year'].astype(str)
    return df

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/data')
def get_data():
    df = load_data()
    yearly_data = df.groupby('Year').agg(
        total_jobs=('Year', 'size'),
        average_salary=('salary_in_usd', 'mean')
    ).reset_index().to_dict(orient='records')
    job_title_data = df.groupby(['Year', 'job_title']).size().reset_index(name='number_of_jobs')
    job_titles = job_title_data.pivot(index='Year', columns='job_title', values='number_of_jobs').fillna(0).to_dict(orient='index')
    return jsonify({'yearly_data': yearly_data, 'job_titles': job_titles})

if __name__ == '__main__':
    app.run(debug=True)
