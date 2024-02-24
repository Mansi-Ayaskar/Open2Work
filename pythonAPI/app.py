import json
from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from flask_mail import Mail, Message
from config import Config

app = Flask(__name__)

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
    if not options:
        cursor.execute("""SELECT * FROM employees""")
        data = cursor.fetchall()
        cursor.close()
        employees = [
            {'email': row[0], 'name': row[1], 'location': row[2], 'preferred_location': row[3], 'yrs_exp': row[4],
             'open2work': row[5], 'key_skills': row[6]} for row in data]
        return jsonify(employees)

    where_conditions = []
    values = []
    for key, value in options.items():
        if key == 'key_skills':
            where_conditions.append(f"{key} LIKE %s")
            values.append(f"%{value}%")
        else:
            where_conditions.append(f"{key} = %s")
            values.append(value)

    where_clause = "open2work=1 AND ".join(where_conditions)

    select_query = f"SELECT * FROM employees WHERE {where_clause}"

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

    return jsonify(employees)


@app.route('/registerEmployee', methods=['POST'])
def create_employee():
    """
    Create a new employee.
    """
    global mysql
    employee = json.loads(request.data)

    cursor = mysql.connection.cursor()
    cursor.execute(
        ''' INSERT INTO employees(email, name, location, preferred_location, yrs_exp, open2work, key_skills) VALUES(%s,%s,%s,%s,%s,%s,%s) ''',
        (employee['email'], employee['name'], employee['location'], employee['preferred_location'], employee['yrs_exp'],
         employee['open2work'], employee['key_skills']))
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


app.run(host='localhost', port=5000)
