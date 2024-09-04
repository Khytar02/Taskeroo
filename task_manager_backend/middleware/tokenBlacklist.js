const blacklistedTokens = new Set();

// Function to add token to the blacklist
const blacklistToken = (token) => {
  blacklistedTokens.add(token);
};

// Function to check if a token is blacklisted
const isTokenBlacklisted = (token) => {
  return blacklistedTokens.has(token);
};

module.exports = {
  blacklistToken,
  isTokenBlacklisted,
};
