import { StatusCodes } from "http-status-codes";
import  logger  from "../config/logger-config.js";
import AppError from "../utils/errors/app-error.js";

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        const response = await this.model.create(data);
        return response;
    }

    async destroy(id) {
        const response = await this.model.destroy({
            where: { id }
        });

        if (!response) {
            throw new AppError(
                "Resourse to delete not found",
                StatusCodes.NOT_FOUND
            );
        }

        return response;
    }

    async get(id) {
        const response = await this.model.findByPk(id);

        if (!response) {
            throw new AppError(
                "Resourse not found",
                StatusCodes.NOT_FOUND
            );
        }

        return response;
    }

    async getAll(filter) {
        const response = await this.model.findAll(filter);
        return response;
    }

    async update(id, data) {
        const record = await this.model.findByPk(id);

        if (!record) {
            throw new AppError(
                "Record to update not found",
                StatusCodes.NOT_FOUND
            );
        }

        const [affectedRows] = await this.model.update(data, {
            where: { id }
        });

        if (affectedRows === 0) {
            throw new AppError(
                "No records were updated",
                StatusCodes.BAD_REQUEST
            );
        }

        const updatedRecord = await this.model.findByPk(id);
        return updatedRecord;
    }
}

export default CrudRepository;
