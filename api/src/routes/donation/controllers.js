const { Donation } = require('../../db.js');

async function chargeDbDonation() {

  const bulkCreateDonations = await Donation.bulkCreate([
    {  amount: "1500", UserId: "1", VdVId: "1"},
    {  amount: "1500", UserId: "1", VdVId: "1"},
    {  amount: "2000", UserId: "1", VdVId: "1"},
    {  amount: "2500", UserId: "2", VdVId: "1" },
    {  amount: "3000", UserId: "3", VdVId: "3" },
    {  amount: "5000", UserId: "4", VdVId: "4" },
  ]);

  return bulkCreateDonations;
}

module.exports = {
  chargeDbDonation,
};
