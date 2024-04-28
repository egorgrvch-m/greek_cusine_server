const uuid = require("uuid");
const path = require("path");
const { Device } = require("../models/models.js");
const ApiError = require("../error/ApiError.js");
const { application } = require("express");

class DeviceController {
  async create(req, res, next) {
    try {
      let { name, price, typeId, text } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".png";
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      const device = await Device.create({
        name,
        price,
        typeId,
        img: fileName,
        text,
      });
      return res.json(device);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async getAll(req, res) {
    let { typeId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let devices;
    if (!typeId) {
      devices = await Device.findAndCountAll({ limit, offset });
    } else if (typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    }

    return res.json(devices);
  }
  async getOne(req, res) {
    const { id } = req.params;
    const device = await Device.findOne({
      where: { id },
    });
    return res.json(device);
  }
}

module.exports = new DeviceController();
