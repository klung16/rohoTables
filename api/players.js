const router = require('express').Router();
const db = require('../db');
const { getPlayerStatsSql, getGoalieStatsSql } = require('./sql/getPlayer');

router.get('/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const [playerStats] = await db.raw(
      getPlayerStatsSql.replace('!!{playerName}!!', name)
    );
    const [goalieStats] = await db.raw(
      getGoalieStatsSql.replace('!!{playerName}!!', name)
    );
    if (playerStats) {
      const returnObj = {};

      returnObj.goalieNormalStats = goalieStats.filter(
        (stats) => stats.season_type === 'normal'
      );
      returnObj.goaliePlayoffStats = goalieStats.filter(
        (stats) => stats.season_type === 'playoff'
      );

      returnObj.normalStats = playerStats.filter(
        (stats) => stats.season_type === 'normal'
      );
      returnObj.playoffStats = playerStats.filter(
        (stats) => stats.season_type === 'playoff'
      );

      res.status(200).json(returnObj);
    } else {
      res.status(404).json({ message: `${name} not found` });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;