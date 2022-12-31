import { mongoose } from 'mongoose';
import { Schema, model, models } from 'mongoose';


const UserSchema = new Schema({
  newNotifications: { type: Number, default: 0 },
  logged_in: { type: Boolean, default: false },
  //personal info
  name: { type: Object, required: true },
  birthDate: { type: String },
  gender: { type: String },


  // secure
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  loginAttempts: { type: Number, default: 0 },
  tempLoginBanTill: { type: Date, default: Date.now },

  //profile info 
  username: { type: Object, required: true, unique: true },
  date: { type: Date, default: Date.now },
  bio: { type: String, default: "" },
  profileImg: {
    type: String,
    default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
  accountType: { type: String, default: 'Public' },

  // for confirmation 
  temp_id: { type: String },
  confirmation_status: { type: String },
  resetPasswordAttempt: { type: Boolean },
  resetPasswordId: { type: String },


  // notifications
  notificationCount: { type: Number, default: 0 },
  notificationToken: { type: String },
  notificationSettings: {

    // true means notifications are allowed and vice versa
    messages: { type: Boolean, default: true },
    socialScore: { type: Boolean, default: true },
    followRequests: { type: Boolean, default: true },
    comments: { type: Boolean, default: true },
    stars: { type: Boolean, default: true },
    reposts: { type: Boolean, default: true },

  },

  tutorials: {

    home: { type: Boolean, default: true },
    guest: { type: Boolean, default: true },
    socialscore: { type: Boolean, default: true },
    fun: { type: Boolean, default: true },
    products: { type: Boolean, default: true },
    sciencetech: { type: Boolean, default: true },
    youtube: { type: Boolean, default: true },
    destress: { type: Boolean, default: true },
    news: { type: Boolean, default: true },
    stocks: { type: Boolean, default: true },
    sports: { type: Boolean, default: true },
    cryptos: { type: Boolean, default: true },
    movies: { type: Boolean, default: true },
    add: { type: Boolean, default: true },
    notifications: { type: Boolean, default: true },
    chats: { type: Boolean, default: true },




  },




  recentChats: [
    {
      chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chats" },
      recentConvo: { type: String }
    }
  ],

  // all the posts the user has done
  posts: [
    {
      contentId: { type: String },
      content: { type: mongoose.Schema.Types.ObjectId, ref: "AllContent" }
    }
  ],


  reviewPosts: [
    {
      rPostType: { type: String },
      reviewedPostUrl: { type: String },
      rPostCategory: { type: String },
      review: { type: String }
    }
  ],

  totalSocialScore: { type: Number, default: 0 },
  avgSocialScore: { type: Number, default: 0 },

  socialScores: [
    {
      isHidden: { type: Boolean, default: false },
      score: { type: Number, default: 0 },
      scorerId: { type: String },
      scorer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      scorerComment: { type: String },
      scoreDate: { type: Date, default: Date.now },
      replies: [
        {
          replierId: { type: String },
          replier: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          reply: { type: String },
          replyDate: { type: Date, default: Date.now }
        }
      ],
    }
  ],




  followers: [
    {
      followedById: { type: String },
      followedBydate: { type: Date, default: Date.now },
      followedByUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    }
  ],


  following: [
    {
      isFollowingId: { type: String },
      isFollowingDate: { type: Date, default: Date.now },
      isFollowingUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    }
  ],

  followRequests: [
    {
      requesterId: { type: String },
      requester: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      requestedDate: { type: Date, default: Date.now },
    }
  ],
  notifications: [
    {
      action: { type: String },
      actioner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      actionerId: { type: String },
      actionDate: { type: Date, default: Date.now }
    }
  ],


  // home feed to show the posts from the following people
  feed_posts: [

    {
      content_id: { type: String },   // it will be a id if its a new post or === lastActive to show older posts
      content: { type: mongoose.Schema.Types.ObjectId, ref: "AllContent" },
      conntentAuthor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      conntentAuthorId: { type: String },
      date: { type: Date, default: Date.now }
    }
  ],

  bookmarks: [
    {
      content_id: { type: String },
      content: { type: mongoose.Schema.Types.ObjectId, ref: "AllContent" },
    }
  ],

  myProducts: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "AllContent" }

    }
  ]



});


UserSchema.index({ name: 'text', username: 'text' }, { weights: { name: 10, username: 5 } })

const User = models.User || model('User', UserSchema);
module.exports = User



