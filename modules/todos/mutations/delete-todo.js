const models = require('../../../models');

module.exports = async (root, { id }, context) => {
  const index = models.todos.findIndex((item) => item.id === Number(id));
  console.log("🚀 ~ index:", index)
  const toBeDeleted = models.todos[index];
  console.log("🚀 ~ toBeDeleted:", toBeDeleted)
  models.todos.splice(index, 1);

  return toBeDeleted;
};
