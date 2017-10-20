function validate_email(email) {
	var re = /\S+@\S+/g;
	return re.test(email)
}

function validate_time(time) {
	return (new Date(time) != 'Invalid Date')
}



module.exports = {
  validate_email,
  validate_time
}