// // const mongoose = require("mongoose");

// // const lawyerSchema = new mongoose.Schema({
// //   name: {
// //     type: String,
// //     required: true
// //   },
// //   expertise: [String], // Array of specializations
// //   location: {
// //     type: String,
// //     required: true
// //   },
// //   experience: {
// //     type: Number,
// //     required: true
// //   }, // Years of practice
// //   availability: {
// //     type: Boolean,
// //     default: true
// //   },
// //   contact: {
// //     email: {
// //       type: String,
// //       required: true
// //     },
// //     phone: {
// //       type: String,
// //       required: true
// //     },
// //   },
// //   ratings: {
// //     totalRatings: {
// //       type: Number,
// //       default: 0
// //     },
// //     averageRating: {
// //       type: Number,
// //       default: 0
// //     },
// //   },
// //   verified: { type: Boolean, default: false },
// // });

// // const Lawyer = mongoose.model("Lawyer", lawyerSchema);
// // module.exports = Lawyer;



// const mongoose = require("mongoose");

// const lawyerSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },

//   expertise: {
//     type: [String], // Array of specializations
//     required: true
//   },

//   location: {
//     pincode: {
//       type: String,
//       required: true
//     },
//     latitude: {
//       type: Number,
//       required: true
//     },
//     longitude: {
//       type: Number,
//       required: true
//     },
//     address: {
//       type: String,
//       required: true
//     }
//   },

//   experience: {
//     type: Number, // Years of practice
//     required: true
//   },

//   availability: {
//     type: Boolean,
//     default: true
//   },

//   contact: {
//     email: {
//       type: String,
//       required: true
//     },
//     phone: {
//       type: String,
//       required: true
//     }
//   },

//   ratings: {
//     totalRatings: {
//       type: Number,
//       default: 0
//     },
//     averageRating: {
//       type: Number,
//       default: 0
//     }
//   },

//   verified: {
//     type: Boolean,
//     default: false
//   }
// });

// const Lawyer = mongoose.model("Lawyer", lawyerSchema);
// module.exports = Lawyer;



const mongoose = require("mongoose");

const lawyerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  expertise: {
    type: [String], // Array of specializations
    required: true
  },

  location: {
    pincode: {
      type: String,
      required: true
    },
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    address: {
      type: String,
      required: true
    }
  },

  experience: {
    type: Number, // Years of practice
    required: true
  },

  availability: {
    type: Boolean,
    default: true
  },

  contact: {
    email: {
      type: String,
      required: true,
      unique: true // Prevent duplicate entries
    },
    phone: {
      type: String,
      required: true
    }
  },

  ratings: {
    totalRatings: {
      type: Number,
      default: 0
    },
    averageRating: {
      type: Number,
      default: 0
    }
  },

  verified: {
    type: Boolean,
    default: false
  }
});

// ✅ Create an index for fast geolocation search
lawyerSchema.index({ "location.latitude": 1, "location.longitude": 1 });

const Lawyer = mongoose.model("Lawyer", lawyerSchema);
module.exports = Lawyer;
