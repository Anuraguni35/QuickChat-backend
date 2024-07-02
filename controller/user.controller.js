import User from "../model/user.model.js";

export const getUsersList = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;
		 
		
		const usersPhoneNumber=req.body.phoneNumberArray;
		if (!usersPhoneNumber) {
            return res.status(400).json({ error: "Please provide the phone numbers of users" });
        }
		const filteredUsers=await User.find({phoneNumber:{$in:usersPhoneNumber},_id: {$ne : loggedInUserId}}).select("-password")
          
		// const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};