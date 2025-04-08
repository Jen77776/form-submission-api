from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import sqlite3
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)  

app.config['UPLOAD_FOLDER'] = 'uploads'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
DB_NAME = 'database.db'

def init_db():
    with sqlite3.connect(DB_NAME) as conn:
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS receipts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                date TEXT NOT NULL,
                amount REAL NOT NULL,
                description TEXT NOT NULL,
                file_path TEXT NOT NULL,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        conn.commit()

@app.route('/api/submit', methods=['POST'])
def submit_receipt():
    try:
        date = request.form['date']
        amount = float(request.form['amount'])
        description = request.form['description']
        file = request.files['receipt']

        if not file:
            return jsonify({'error': 'No file uploaded'}), 400

        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        with sqlite3.connect(DB_NAME) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO receipts (date, amount, description, file_path)
                VALUES (?, ?, ?, ?)
            ''', (date, amount, description, filepath))
            conn.commit()

        return jsonify({'message': 'Receipt submitted successfully!'})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    init_db()
    app.run(debug=True, host="127.0.0.1", port=5050)
