// Open web pages routes
const open_post = (request, response) => {
  response.render("post");
};

const open_new_post = (request, response) => {
  response.render("new-post");
};

const open_archive = (request, response) => {
  response.render("archive");
};

module.exports = {
  open_post,
  open_new_post,
  open_archive,
};
