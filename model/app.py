from flask import Flask, request, jsonify
from RAG_retrieval_custom_stock_vids import answer_with_rag
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
@app.route('/vid', methods=['POST'])
def generate_videos():
    data = request.get_json()
    prompts = data.get('prompts', [])
    
    if not isinstance(prompts, list):
        return jsonify({"error": "Invalid input. 'prompts' should be a list."}), 400

    results = []
    for prompt in prompts:
        try:
            answer, video_result = answer_with_rag(prompt)
            print(answer)
            video_result = '/videos/' + video_result[0]
            results.append({"prompt": prompt, "result": video_result})
        except Exception as e:
            results.append({"prompt": prompt, "error": str(e)})

    return jsonify(results)

if __name__ == '__main__':
    app.run(port=3005, debug=True)