const router = require('express').Router();

const db = require('../data/helpers/todos-model.js');

router.get('/', async (req, res) => {
	try {
		const todos = await db.find();
		if (todos) {
			res.status(200).json(todos);
		}
	} catch (error) {
		res.status(500).json({ message: `Todos could not be found ${error}.` });
	}
});

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const todo = await db.findById(id);
		if (todo) {
			res.status(200).json(todo);
		} else {
			res.status(404).json({ message: 'Todo with specified ID does not exist' });
		}
	} catch (error) {
		res.status(500).json({ message: `Todo request failed ${error}.` });
	}
});

router.post('/', async (req, res) => {
	const todo = req.body;
	try {
		if (!todo.title || !todo.task || !todo.setDate) {
			res.status(400).json({
				message : 'Your Todo needs a title, task and setDate',
			});
		}
		const newTodo = await db.create(todo);
		if (newTodo) {
			res.status(201).json(newTodo);
		}
	} catch (error) {
		res.status(500).json({ message: `Your Todo could not be created ${error} ` });
	}
});

router.delete('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const todo = await db.remove(id);
		if (todo) {
			res.status(200).json({ message: 'The Todo has been successfully deleted.' });
		} else {
			res.status(404).json({ message: 'The Todo with the specified ID does not exist.' });
		}
	} catch (error) {
		res.status(500).json({
			message : `The Todo information could not be modified ${error}.`,
		});
	}
});

router.put('/:id', async (req, res) => {
	const { id } = req.params;
	const newTodo = req.body;

	try {
		const editedTodo = await db.update(newTodo, id);
		if (editedTodo) {
			res.status(200).json(editedTodo);
		} else {
			res.status(404).json({
				message : 'The Todo with the specified ID does not exist.',
			});
		}
	} catch (error) {
		res.status(500).json({
			message : `The Todo information could not be modified ${error}.`,
		});
	}
});

module.exports = router;
