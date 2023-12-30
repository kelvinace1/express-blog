const isAuthenticated = (req, res, next) => {
  if (req.user) {
    // 
    res.redirect('/')
  } else {
    res.redirect('/')
    next()
  }
}

module.exports = isAuthenticated