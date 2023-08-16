const { Router } = require('express');
const router = Router();
const _ = require('underscore');
const players = require('../sample.json');

router.get('/', (req, res) => {
  res.json(players);
});

router.post('/', (req, res) => {
  const { nickname, name, age, country, role } = req.body;

  if (nickname && name && age && country && role){
    const id = players.length + 1;
    const newPlayer = { ...req.body, id };
    players.push(newPlayer);
    res.json(players);
  } else {
    res.status(500).send({error:'There was an error.'});
  }
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nickname, name, age, country, role } = req.body;
  if (nickname && name && age && country && role) {
    _.each(players, (player, i) => {
      if (player.id == id) {
        player.nickname = nickname;
        player.name = name;
        player.age = age;
        player.country = country;
        player.role = role;
      }
    });
    res.json(players);
  } else {
    res.status(500).json({error: 'There was an error.'})
  }
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  _.each(players, (player, i) => {
    if (player.id == id) {
      players.splice(i, 1);
    }
  });
  res.json(players);
});

module.exports = router;