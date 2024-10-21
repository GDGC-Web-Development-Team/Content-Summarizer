import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, password, mail } = req.body;

  if (!username || !password || !mail) {
    throw new ApiError(400, "all details must be provided to register");
  }

  const existingUser = await User.findOne({ mail });
  if (existingUser) {
    throw new ApiError(400, "User with this mail already exists");
  }

  const user = await User.create({
    username,
    mail,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "some error occured while registering");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { mail, password } = req.body;

  if (!mail || !password) {
    throw new ApiError(400, "Email and password must be provided");
  }

  const user = await User.findOne({ mail });
  if (!user) {
    throw new ApiError(400, "Email isn't registered with any account");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const loggedInUser = await User.findById(user._id).select("-password");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser },
        "User logged in successfully"
      )
    );
});

export { registerUser, loginUser };
