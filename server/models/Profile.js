const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const Profile = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  currentTitle: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  location: {
    city: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    }
  },
  imgURL: {
    type: String,
    required: true
  },
  aboutme: String,
  socialLinks: {
    facebook: String,
    linkedin: String,
    github: String,
    youtube: String
  },
  education: [
    {
      start: {
        type: String,
        required: true
      },
      end: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      school: {
        type: String,
        required: true
      },
      location: {
        city: {
          type: String,
          required: true
        },
        country: {
          type: String,
          required: true
        }
      }
    }
  ],
  experience: [
    {
      start: {
        type: String,
        required: true
      },
      end: {
        type: String,
        required: true
      },
      position: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        city: {
          type: String,
          required: true
        },
        country: {
          type: String,
          required: true
        }
      }
    }
  ],
  aboutresearch: {
    type: String
  },
  interests: [
    {
      title: String
    }
  ],
  projects: [
    {
      name: {
        type: String,
        required: true
      },
      detail: {
        type: String,
        required: true
      },
      imgURL: {
        type: String
      }
    }
  ],
  publications: [
    {
      title: {
        type: String,
        required: true
      },
      catagory: {
        type: String,
        required: true
      },
      authors: [{ type: String }],
      info: {
        type: String,
        required: true
      },
      year: {
        type: String,
        required: true
      }
    }
  ]
})

module.exports = Team = mongoose.model('profile', Profile)
