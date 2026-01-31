import CrudRepository from "./crud-repository.js";
import db from "../models/index.js";

const { Airport } = db;

class AirportRepository extends CrudRepository {
  constructor() {
    super(Airport);
  }
}

export default AirportRepository;
