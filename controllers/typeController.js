const { Type } = require("../models/models.js");
const ApiError = require("../error/ApiError.js");
class TypeController {
  async create(req, res) {
    const { name } = req.body;
    const type = await Type.create({ name });
    return res.json(type);
  }
  async getAll(req, res) {
    const types = await Type.findAll();
    return res.json(types);
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await Type.destroy({
        where: { id },
        cascade: true,
      });
      return res.json({
        message: `Type with id ${id} and associated items deleted successfully`,
      });
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }
}

module.exports = new TypeController();
