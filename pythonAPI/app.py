import json
from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from flask_mail import Mail, Message
from flask_cors import CORS
from langchain_community.chat_models import ChatOpenAI
from langchain_core.messages import HumanMessage

from config import Config

app = Flask(__name__)

CORS(app)
# cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config.from_object(Config)

mysql = MySQL(app)
mail = Mail(app)


@app.route('/')
def hello():
    return "Hello Employees!"


@app.route("/send_mail", methods=['POST'])
def index():
    msg = Message(
        'Hello',
        sender='adityadhamale2303@gmail.com',
        recipients=['karthikcpatel@gmail.com']
    )
    msg.body = 'Hello this is sample mail.'
    mail.send(msg)
    return 'Sent'


@app.route('/getAllRegisteredEmployees', methods=['GET'])
def get_employee_by_param():
    cursor = mysql.connection.cursor()
    options = request.args.to_dict()
    select_query = f"SELECT * FROM employees WHERE open2work = 1"
    values = []
    if options:
        where_conditions = []
        for key, value in options.items():
            if key == 'key_skills':
                where_conditions.append(f"{key} LIKE %s")
                values.append(f"%{value}%")
            else:
                where_conditions.append(f"{key} = %s")
                values.append(value)
        where_clause = " AND ".join(where_conditions)
        select_query = f"{select_query} and {where_clause}"

    cursor.execute(select_query, tuple(values))
    data = cursor.fetchall()
    cursor.close()

    if not data:
        return jsonify({'error': 'No employees found for the specified options'}), 404

    employees = []
    for row in data:
        employee = {'email': row[0], 'name': row[1], 'location': row[2], 'preferred_location': row[3],
                    'yrs_exp': row[4], 'open2work': row[5], 'key_skills': row[6]}
        employees.append(employee)

    response = jsonify(employees)
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response


@app.route('/registerEmployee', methods=['POST'])
def create_employee():
    """
    Create a new employee.
    """
    global mysql
    employee = json.loads(request.data)

    description = invoke_langchain(employee)

    cursor = mysql.connection.cursor()
    cursor.execute(
        ''' INSERT INTO employees(email, name, location, preferred_location, yrs_exp, open2work, key_skills, description) VALUES(%s,%s,%s,%s,%s,%s,%s, %s) ''',
        (employee['email'], employee['name'], employee['location'], employee['preferred_location'], employee['yrs_exp'],
         employee['open2work'], employee['key_skills'], description))
    mysql.connection.commit()
    cursor.close()

    return jsonify({'message': 'Employee created successfully'})


@app.route('/updateEmployeeDetail/<string:email>', methods=['PUT'])
def update_employee(email: str):
    """
    Update an existing employee.
    """
    update_data = json.loads(request.data)

    columns_to_update = []
    values_to_update = []
    for key, value in update_data.items():
        if key != 'email':
            columns_to_update.append(f"{key} = %s")
            values_to_update.append(value)

    if not columns_to_update:
        return jsonify({'error': 'No valid columns to update'}), 400

    update_query = f"UPDATE employees SET {', '.join(columns_to_update)} WHERE email = %s"

    values_to_update.append(email)

    cursor = mysql.connection.cursor()
    cursor.execute(update_query, tuple(values_to_update))
    mysql.connection.commit()
    cursor.close()

    return jsonify({'message': 'Employee updated successfully'})


@app.route('/deleteEmployeeDetail/<string:email>', methods=['DELETE'])
def delete_employee(email: str):
    """
    Delete an employee.
    """
    cursor = mysql.connection.cursor()
    cursor.execute("""DELETE FROM employees WHERE email = %s""", (email,))
    mysql.connection.commit()
    cursor.close()
    return jsonify({'message': 'Employee deleted successfully'})


def invoke_langchain(data):
    prompt = (f"This is the data of an employee:"
              f"name: {data['name']}, years of experience: {data['yrs_exp']}, current location: {data['location']}, preferred location: {data['preferred_location']}, key skills: {data['key_skills']}"
              f"Generate a simple 100 words description for this employee in third person perspective applying for the job.")

    messages = [
        HumanMessage(content=prompt),
    ]
    llm = ChatOpenAI(
        model_name="amazon.titan-text-express-v1",
        temperature=0.2,
        openai_api_base="https://4veynppxjm.us-east-1.awsapprunner.com",
        openai_api_key="sk-U4Lz7xk2aDIdbYOOdSnkZg",
    )
    result = llm.invoke(messages)
    return str(result.content)


app.run(host='10.53.103.204', port=5000)
# app.run(host='localhost', port=5000)
