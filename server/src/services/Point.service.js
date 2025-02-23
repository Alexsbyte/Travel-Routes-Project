const { Point } = require("../db/models");

class PointService {
 

  static async bulkCreate(points) {
    return await Point.bulkCreate(points);
  }

//   static async getAllByRoute(route_id) {
//     return await Point.findAll({ where: { route_id } });
//   }

//   static async getById(id) {
//     return await Point.findByPk(id);
//   }

//   static async update(id, data) {
//     const point = await Point.findByPk(id);
//     if (!point) throw new Error("Point not found");
//     return await point.update(data);
//   }

//   static async delete(id) {
//     const point = await Point.findByPk(id);
//     if (!point) throw new Error("Point not found");
//     return await point.destroy();
//   }
}

module.exports = PointService;
