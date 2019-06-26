// json-server --watch db.json --port 4000 --middlewares auth.js 

const users = [
  {id: Date.now(), email: 'esleyder@gmail.com', password: '123456', displayName: 'Esleyder Ordoñez'}
];

module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.path === '/login') {
    const user = users.find(user => user.email === req.body.email && user.password === req.body.password)
    if (user) {
      return res.status(200).json({
        res: 'Usario autenticado',
        user
      })
    }
    return res.status(401).json({
      message: 'Usuario no encontrado'
    })
    
  } else if (req.method === 'POST' && req.path === '/register') {
    const user = { id: Date.now(), email: req.body.email, password: req.body.password, displayName: req.body.displayName }
    users.push(user)
    return res.status(200).json({
      res: 'Usuario registrado',
      user
    })
  } else {
    next()
  }
}


