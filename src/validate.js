function validate_email(email) {
	var re = /\S+@\S+/g;
	return re.test(email)
}

module.exports = {
  validate_email
}