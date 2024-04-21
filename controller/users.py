from flask import jsonify


def get_users(users_instance):
    # Retrieve all users from the Users table
    all_users = users_instance.query.all()

    # Manually serialize each user object into a dictionary
    users_list = []
    for user in all_users:
        user_data = {
            'id': user.id,
            'name': user.name,
            'branch': user.branch,
            'user_id': user.user_id,
            'username': user.username
        }
        users_list.append(user_data)

    # Return the list of users as JSON
    return jsonify(users_list)