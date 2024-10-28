import os
from flask import Flask, render_template, jsonify, request

app = Flask(__name__)
application = app
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)

# Simulating an in-memory database
todos = []

@app.route('/')
def index():
    return render_template('index.html')

# API to get all todos
@app.route('/todos', methods=['GET'])
def get_todos():
    return jsonify(todos)

# API to add a new todo
@app.route('/todo', methods=['POST'])
def add_todo():
    data = request.json
    new_todo = {
        'id': len(todos) + 1,
        'title': data['title'],
        'status': 'pending',  # Default status
        'favorite': False
    }
    todos.append(new_todo)
    return jsonify(new_todo)

# API to update a todo's status
@app.route('/todo/<int:todo_id>', methods=['GET'])
def get_todo(todo_id):
    todo = next((t for t in todos if t['id'] == todo_id), None)
    if todo is None:
        return jsonify({"error": "Todo not found"}), 404
    return jsonify(todo)

@app.route('/todo/<int:todo_id>', methods=['PUT'])  
def update_todo(todo_id):
    todo = next((t for t in todos if t['id'] == todo_id), None)
    if todo is None:
        return jsonify({"error": "Todo not found"}), 404

    data = request.json
    if 'favorite' in data:
        todo['favorite'] = data['favorite']  # Update favorite status
    if 'status' in data:
        todo['status'] = data['status']  # Update the task status (pending/completed)

    return jsonify(todo)

# API to delete a todo
@app.route('/todo/<int:todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    global todos
    todos = [todo for todo in todos if todo['id'] != todo_id]
    return jsonify({'success': True})

if __name__ == '__main__':
    app.run(debug=True)
