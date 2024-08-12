const generateUsername = (name) => {
  const username = name.toLowerCase().replace(" ", "");
  return `${username}-${Date.now()}`;
};

module.exports = generateUsername