require('dotenv').config();

const config = {
  frontUrl: process.env.REACT_APP_FRONT_URL,
  backUrl: process.env.REACT_APP_BACK_URL,
};

export default config;
