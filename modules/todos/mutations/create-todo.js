const models = require('../../../models');

module.exports = async (root, { input }, context) => {
	// Generate a new ID (get the highest existing ID and add 1)
  const todosIds = models.todos.map(todo => Number(todo.id));
  const newId = Math.max(...todosIds) + 1;

	// Create the new todo object
	const newTodo = {
		id: newId.toString(),
		title: input.title,
		description: input.description || "",
		user_d: 1, // You might want to get this from context/auth later
		isCompleted: input.isCompleted || false,
	};

	// Add to the todos array
	models.todos.push(newTodo);

	// Return the created todo
	return newTodo;
};
