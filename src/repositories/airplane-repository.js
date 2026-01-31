import CrudRepository from "./crud-repository.js";
import db from "../models/index.js";

const { Airplane } = db;

class AirplaneRepository extends CrudRepository {
  constructor() {
    super(Airplane);
  }
}

export default AirplaneRepository;
