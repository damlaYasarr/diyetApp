from flask import Flask, request, render_template
import openai
from dotenv import load_dotenv
import os
from flask_cors import CORS

load_dotenv(dotenv_path='~/server/.env')


API_KEY = os.getenv("API_KEY")
app = Flask(__name__)
CORS(app)

 
openai.api_key = API_KEY   

@app.route('/', methods=['POST','GET'])
def home():
    if request.method == 'POST':
        
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

    else:
        
        return render_template('main.html')


if __name__=="__main__":
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get("PORT", 8080)))


