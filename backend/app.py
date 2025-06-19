from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
import pdfkit
import tempfile

app = Flask(__name__)
CORS(app)  # 🔥 This allows cross-origin requests from any frontend

@app.route('/generate-pdf', methods=['POST'])
def generate_pdf():
    data = request.get_json()
    html = data.get('html')
    file_name = data.get('fileName', 'resume')

    if not html:
        return jsonify({'error': 'No HTML provided'}), 400

    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as tmp_file:
            pdfkit.from_string(html, tmp_file.name)
            return send_file(tmp_file.name, as_attachment=True, download_name=f"{file_name}.pdf")
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
