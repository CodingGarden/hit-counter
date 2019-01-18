const express = require('express');
const uuidv4 = require('uuid/v4');
const bcrypt = require('bcryptjs');

const counterSchema = require('../schemas/counter');
const counterQueries = require('../queries/counter');
const visitorQueries = require('../queries/visitor');
const { generate } = require('../lib/svg');

const router = express.Router();

router.get('/:guid', async (req, res, next) => {
  const { guid } = req.params;
  const { unique = 'false' } = req.query;
  try {
    const counter = await counterQueries.findByGuid(guid);
    if (counter) {
      let newUser = true;
      if (req.cookies[guid]) {
        const id = req.cookies[guid];
        const visitor = await visitorQueries.findById(id);
        if (visitor) {
          newUser = false;
          await visitorQueries.update(id, visitor.visitCount + 1);
        } else {
          newUser = true;
        }
      }

      if (newUser) {
        const visitor = {
          counterId: counter.id,
          visitCount: 1,
          lastVisited: new Date()
        };
        const id = await visitorQueries.create(visitor);
        res.cookie(guid, id);
      }

      let count = 0;
      if (unique === 'true') {
        count = await visitorQueries.getCountByCounterId(counter.id);
      } else {
        count = await visitorQueries.getTotalVisitsByCounterId(counter.id);
      }

      res.set('content-type', 'image/svg+xml');
      res.end(generate(counter, count));
    } else {
      res.status(404);
      const error = new Error('Not Found.');
      next(error);
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const counter = await counterSchema.validate(req.body, {
      stripUnknown: true,
    });
    counter.guid = uuidv4();
    const secretKey = uuidv4();
    counter.secretKey = await bcrypt.hash(secretKey, 8);
    const id = await counterQueries.create(counter);
    const createdCounter = await counterQueries.findById(id);
    createdCounter.secretKey = secretKey;
    res.json(createdCounter);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
