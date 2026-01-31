import CrudRepository from "./crud-repository.js";
import db from "../models/index.js";

const { City } = db;

class CityRepository extends CrudRepository {
  constructor() {
    super(City);
  }
}

export default CityRepository;
