export default class RoutineHelper {
  /**
   * @param   {String} difficultyString a string given by the api call.
   * @returns {Number}                  the numeric representation of the difficultyString.
   */
  static getDifficulty(difficultyString) {
    //debería pasarsele el id de la rutina para luego extraer la dificultad
    switch (difficultyString) {
      case "rookie":
        return 1;
      case "beginner":
        return 2;
      case "intermediate":
        return 3;
      case "advanced":
        return 4;
      case "expert":
        return 5;
    }
  }
  /**
   * @param   {Number} score010 a score number from 0 to 10 given by the api call
   * @returns {Number}          the normalized score number (if the resulting number is float,
   *                            the Routine component will use the integer part only.
   *                            Resulting in {0...5} the only posibble score values)
   */
  //debería pasarsele el id de la rutina para luego extraer el score
  static normalizeScore(score010) {
    return score010 / 2;
  }
}
