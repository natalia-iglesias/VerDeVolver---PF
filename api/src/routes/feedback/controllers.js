const { Feedback, User, VdV } = require('../../db.js');

//ESTE ES EL BULKCREATE NO LO BORREN
const chargeDbFeedback = async () => {
  try {
    const bulkCreateFeedbacks = await Feedback.bulkCreate([
      {  comment: "Muy malo, me trataron re mal", rating:"1" , UserId: "1", VdVId: "1"},
      {  comment: "Muy bueno. Mejoraron su atencion al cliente", rating:"5" , UserId: "1", VdVId: "1"},
      {  comment: "Muy bueno, me encanto", rating:"5", UserId: "1", VdVId: "2"},
      {  comment: "Muy malo", rating:"1", UserId: "2", VdVId: "1" },
      {  comment: "Horrible todo", rating:"1", UserId: "3", VdVId: "3" },
      {  comment: "Super bien toy feliz", rating:"4", UserId: "4", VdVId: "4" },
    ]);

    return bulkCreateFeedbacks;

  } catch (error) {
    throw Error ('An error ocurred. Database was not charged');
  }
};

const createFeedback = async (body) => {
  try {
    const { comment, rating, UserId, VdVId } = body;

    const newFeedback = await Feedback.create({  
      comment, 
      rating, 
      UserId, 
      VdVId,
      });

    return newFeedback;

  } catch (error) {
    throw Error ('An error ocurred. Could not create feedback');
  }
};

const getFeedbacks = async () => {
  try {
    const feedbacks = await Feedback.findAll();
    return feedbacks;
  } catch (error) {
    throw Error ('An error ocurred. Could not get feedbacks');
  }
};

const getFeedbacksById = async (id) => {
  try {
    if (!id ) throw Error("Missing data");

    const feedback = await Feedback.findAll({ where: { id: id } });
    if (!feedback) throw Error ('Feedback does not exist'); 

    return feedback;
  } catch (error) {
    throw Error ('An error ocurred. Could not get feedback');
  }
};

const getFeedbacksByUserId = async (id) => {
  try {
    if (!id ) throw Error("Missing data");
    
    const checkuser = await User.findAll( { where: {id: id} } );
    if (!checkuser) throw Error ('User does not exist');

    const feedback = await Feedback.findAll({ where: { UserId: id } });
    if (!feedback) throw Error (`An error ocurred. Could not get feedbacks with the UserId ${id}`); 

    return feedback;
  } catch (error) {
    throw Error (error.message);
  }
};

const getFeedbacksByVdVId = async (id) => {
  try {
    if (!id ) throw Error("Missing data");
    
    const checkVdV = await VdV.findAll( { where: {id: id} } );
    if (!checkVdV) throw Error ('VdV does not exist');

    const feedback = await Feedback.findAll({ where: { VdVId: id } });
    if (!feedback) throw Error (`An error ocurred. Could not get feedbacks with the VdVId ${id}`); 

    return feedback;
  } catch (error) {
    throw Error (error.message);
  }
};

const updateFeedback = async (id, comment, rating) => {
  try {
    if (!comment || !rating || !id ) throw Error("Missing data");

    const feedbackToUpdate = await Feedback.findAll({ where: { id: id } });
    if (!feedbackToUpdate) throw Error("Feedback does not exist");

    await Feedback.update({
            comment: comment,
            rating: rating,
        },
        { where: { id: id } 
    });

    const updatedFeedback = await Feedback.findAll({ where: { id: id } });

    return updatedFeedback;
  } catch (error) {
    throw Error ({error: error.message}); 
  }
};

const deleteFeedback = async (id) => {
  try {
    if (!id ) throw Error("Missing data");

    const feedbackToDelete = await Feedback.findAll({ where: { id: id } });
    if (!feedbackToDelete) throw Error("Feedback does not exist");

    const deleting = await Feedback.destroy({ where: { id: id } });

    return deleting;
  } catch (error) {
    throw Error ({error: error.message}); 
  }
};

module.exports = {
  chargeDbFeedback,
  createFeedback,
  getFeedbacks,
  getFeedbacksById,
  getFeedbacksByUserId,
  getFeedbacksByVdVId,
  updateFeedback,
  deleteFeedback,
};
