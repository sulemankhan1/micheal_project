const dev = {
  baseURL: "http://localhost:3001/api/",
  // baseURL: "https://go-xr-a-iopne-ai.vercel.app/api/",
  landingPageUrl: "https://ai-helper-site1.onrender.com",
  stripe: {
    // free: "price_1MMclIFZnO3JEB15ptvP8cTE",
    // free: "price_1MdonOL6HRIrlkEhsu9Pw3kp",
    free: "price_1Mdx3cFZnO3JEB15koSdYiCf",
    entry: "price_1MMck3FZnO3JEB15WKEEykDD",
    pro: "price_1MMcd2FZnO3JEB15iIhBW1Pj",
  },
};

const prod = {
  // baseURL: "https://ai-helper-site-be.onrender.com/api/",
  baseURL: "https://go-xr-a-iopne-ai.vercel.app/api/",
  landingPageUrl: "https://goxr.tech",
  stripe: {
    // free: "price_1MMclIFZnO3JEB15ptvP8cTE",
    // free: "price_1MdonOL6HRIrlkEhsu9Pw3kp",
    free: "price_1Mdx3cFZnO3JEB15koSdYiCf",
    entry: "price_1MMck3FZnO3JEB15WKEEykDD",
    pro: "price_1MMcd2FZnO3JEB15iIhBW1Pj",
  },
};

const config = process.env.NODE_ENV === "development" ? dev : prod;

export default config;
