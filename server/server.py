from flask import Flask, request, jsonify
import openai
from flask_cors import CORS
openai.api_key="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"
app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST'])
def ask_question():
    data = request.get_data(as_text=True)
   
    user_response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful nutritionist."},
            {"role": "user", "content": data}
        ],
        temperature=0.7,
        max_tokens=300
    )

    assistant_response = user_response['choices'][0]['message']['content']
    return assistant_response

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=8080)