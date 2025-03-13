const Profile = require("../model/userProfileModel");

exports.accountData = (req, res, next) => {
  const { fullName, dob, gender } = req.body;
  const userID = req.userID;

  if (!userID) {
    return res.status(400).json({ message: "User ID is required" });
  }

  Profile.findOne({ refID: userID })
    .then((existingProfile) => {
      if (existingProfile) {  

        existingProfile.name = fullName;
        existingProfile.gender = gender;
        existingProfile.DOB = dob;

        return existingProfile.save();
      } else {
        
        const newProfile = new Profile({
          name: fullName,
          gender: gender,
          DOB: dob,
          refID: userID,
        });

        return newProfile.save(); 
      }
    })
    .then((result) => {
      res.status(200).json({ message: "Profile saved successfully", data: result });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error saving profile", error: error.message });
    });
};


exports.sendAccoundData=(req,res,next)=>{
  const userID = req.userID
  // console.log(userID)

  Profile.findOne({ refID: userID }) 
    .then((profile) => {
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      res.status(200).json(profile);
    })
    .catch((error) => {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Server error", error });
    });
}
