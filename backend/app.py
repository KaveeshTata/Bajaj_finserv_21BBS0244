from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

@app.route('/bfhl', methods=['GET'])
def get_operation_code():
    return jsonify({"operation_code": 1}), 200

@app.route('/bfhl', methods=['POST'])
def process_data():
    data = request.json.get("data", [])
    print(data)
    
    # Validation checks
    if not isinstance(data, list):
        return jsonify({"is_success": False, "error": "Data should be a list"}), 400
    
    irregularities = []
    for item in data:
        if not isinstance(item, str):
            irregularities.append(f"Invalid type: {item} is not a string")
        elif not item.isdigit() and not item.isalpha():
            irregularities.append(f"Invalid item: {item} is neither a number nor an alphabet")

    if irregularities:
        return jsonify({
            "is_success": False,
            "irregularities": irregularities,
            "user_id": "Kaveesh_Tata_11122003",
            "email": "kaveesh2003@gmail.com",
            "roll_number": "21BBS0244"
        }), 400

    numbers = [item for item in data if item.isdigit()]
    alphabets = [item for item in data if item.isalpha()]
    lower_alphabets = [char for char in alphabets if char.islower()]
    highest_lowercase_alphabet = [max(lower_alphabets)] if lower_alphabets else []

    response = {
        "is_success": True,
        "user_id": "Kaveesh_Tata_11122003",
        "email": "kaveesh2003@gmail.com",
        "roll_number": "21BBS0244",
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_lowercase_alphabet": highest_lowercase_alphabet
    }
    
    return jsonify(response), 200

if __name__ == '__main__':
    app.run(debug=True)
