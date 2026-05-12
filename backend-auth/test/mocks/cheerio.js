module.exports = {
  load: jest.fn(() => Object.assign(jest.fn().mockReturnThis(), {
    eq: jest.fn().mockReturnThis(),
    find: jest.fn().mockReturnThis(),
    first: jest.fn().mockReturnThis(),
    text: jest.fn().mockReturnValue(''),
  }))
};
