import User from "../model/User.js"

const isAdmin = async (req, res, next) => {
    //find the login user
    const user = await User.findById(req.userAuthId);
    // check if the user is admin
    if (user.isAdmin ) {
        next();
    } else {
        next(new Error("Access denied, admin only"))
    };
};

export default isAdmin;  