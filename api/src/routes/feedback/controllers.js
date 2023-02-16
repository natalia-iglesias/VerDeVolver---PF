const { Feedback } = require('../../db.js');

//ESTE ES EL BULKCREATE NO LO BORREN
async function chargeDbFeedback() {

  const bulkCreateFeedbacks = await Feedback.bulkCreate([
    {  comment: "Muy malo, me trataron re mal", rating:"1" , UserId: "1", VdVId: "1"},
    {  comment: "Muy bueno. Mejoraron su atencion al cliente", rating:"5" , UserId: "1", VdVId: "1"},
    {  comment: "Muy bueno, me encanto", rating:"5", UserId: "1", VdVId: "2"},
    {  comment: "Muy malo", rating:"1", UserId: "2", VdVId: "1" },
    {  comment: "Horrible todo", rating:"1", UserId: "3", VdVId: "3" },
    {  comment: "Super bien toy feliz", rating:"4", UserId: "4", VdVId: "4" },
  ]);

  return bulkCreateFeedbacks;
}

module.exports = {
  chargeDbFeedback,
};
