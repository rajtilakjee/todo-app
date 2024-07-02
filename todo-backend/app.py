from flask import Flask, request, jsonify
from flask_cors import CORS
from typing import List, Dict

app = Flask(__name__)
CORS(app)

# In-memory storage for todos
todos: List[Dict[str, any]] = []
todo_id_counter = 1

@app.route('/todos', methods=['GET'])
def get_todos():
    return jsonify(todos)

@app.route('/todos', methods=['POST'])
def add_todo():
    global todo_id_counter
    data = request.json
    new_todo = {
        'id': todo_id_counter,
        'title': data['title'],
        'completed': False
    }
    todos.append(new_todo)
    todo_id_counter += 1
    return jsonify(new_todo), 201

@app.route('/todos/<int:todo_id>', methods=['PUT'])
def update_todo(todo_id):
    data = request.json
    for todo in todos:
        if todo['id'] == todo_id:
            todo.update(data)
            return jsonify(todo)
    return jsonify({'error': 'Todo not found'}), 404

@app.route('/todos/<int:todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    global todos
    todos = [todo for todo in todos if todo['id'] != todo_id]
    return '', 204

if __name__ == '__main__':
    app.run(debug=True)