const db = require('../dbConfig.js');

module.exports = {
	find,
	findById,
	create,
	remove,
	update,
};

async function find(id) {
	const todos = await db('todos').where({ user_id: id });
	return todos;
}

async function findById(id) {
	const todo = await db('todos').where({ id }).first();
	return todo;
}

async function create(item) {
	const [ id ] = await db('todos').insert(item).returning('id');
	if (id) {
		const todo = await findById(id);
		return todo;
	}
}

async function remove(id) {
	const todo = await findById(id);
	if (todo) {
		const deleted = await db('todos').where({ id }).del();
		if (deleted) {
			return todo;
		}
	}
}

async function update(item, id) {
	const editedTodo = await db('todos').where({ id }).update(item);
	if (editedTodo) {
		const todo = await findById(id);
		return todo;
	}
}
