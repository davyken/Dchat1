import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: function() {
                return !this.googleId;
            },
            unique: true,
            sparse: true, 
        },
        password: {
            type: String,
            required: function() {
                return !this.googleId;
            },
            minlength: 6,
        },
        gender: {
            type: String,
            required: true,
            enum: ["male", "female", "not_specified"], 
            default: "not_specified"
        },
        profilePic: {
            type: String,
            default: "",
        },
        googleId: {
            type: String,
            unique: true,
            sparse: true, 
        },
        email: {
            type: String,
            unique: true,
            sparse: true, 
            lowercase: true,
        },
        resetPasswordToken: {
            type: String,
        },
        resetPasswordExpires: {
            type: Date,
        },
        authMethod: {
            type: String,
            enum: ["local", "google"],
            required: true,
            default: "local"
        }
    },
    { timestamps: true }
);

userSchema.pre('save', function(next) {
    if (!this.isModified('googleId') && !this.isModified('password')) {
        return next();
    }

    if (this.googleId) {
        this.authMethod = 'google';
        if (!this.username) {
            this.username = `user_${this._id.toString().slice(-6)}`;
        }
    } else {
        this.authMethod = 'local';
        if (!this.password || !this.username) {
            return next(new Error('Password and username are required for local authentication'));
        }
    }
    next();
});

userSchema.methods.toSafeObject = function() {
    return {
        _id: this._id,
        fullName: this.fullName,
        username: this.username,
        gender: this.gender,
        profilePic: this.profilePic,
        email: this.email,
        authMethod: this.authMethod,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

userSchema.statics.findOrCreateGoogleUser = async function(googleData) {
    try {
        let user = await this.findOne({ googleId: googleData.googleId });
        
        if (!user && googleData.email) {
            user = await this.findOne({ email: googleData.email });
        }

        if (!user) {
            user = await this.create({
                googleId: googleData.googleId,
                email: googleData.email,
                fullName: googleData.fullName,
                profilePic: googleData.profilePic || "",
                authMethod: "google",
                gender: "not_specified" 
            });
        } else if (!user.googleId) {
            user.googleId = googleData.googleId;
            user.authMethod = "google";
            await user.save();
        }

        return user;
    } catch (error) {
        throw new Error('Error creating/finding Google user: ' + error.message);
    }
};

const User = mongoose.model("User", userSchema);

export default User;