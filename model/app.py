from flask import Flask, request, jsonify
from RAG_retrieval_custom_stock_vids import answer_with_rag

app = Flask(__name__)

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
            results.append({"prompt": prompt, "result": video_result[0]})
        except Exception as e:
            results.append({"prompt": prompt, "error": str(e)})

    return jsonify(results)

if __name__ == '__main__':
    app.run(port=3005, debug=True)