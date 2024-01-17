from controllers.profit import get_summary_by_user_id
from flask import Blueprint, jsonify, request

profit_blueprint = Blueprint('profit_blueprint', __name__)

@profit_blueprint.route('/api/profit/getSummary', methods = ["POST"])
def getsumm():
    data = request.get_json()
    user_id = data.get('user_id')
   
    if not user_id:
        return jsonify({'data': 'Missing required fields'}), 400
    
    summary = get_summary_by_user_id(user_id)
    if summary:
        return jsonify(summary.serialize()), 200
    else:
        return jsonify({'data': "Error."}), 500