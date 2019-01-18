const express = require('express');
const uuidv4 = require('uuid/v4');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const counterSchema = require('../schemas/counter');
const counterQueries = require('../queries/counter');
const visitorQueries = require('../queries/visitor');
const banQueries = require('../queries/ban');
const { generate } = require('../lib/svg');

const router = express.Router();

async function updateVisitor(cookies, guid, ip, counter, res) {
  let newUser = true;
  if (cookies[guid]) {
    const id = cookies[guid];
    const visitor = await visitorQueries.findById(id);
    if (visitor) {
      newUser = false;
      await visitorQueries.update(id, visitor.visitCount + 1, ip);
    }
    else {
      newUser = true;
    }
  }
  if (newUser) {
    const visitor = {
      ip,
      counterId: counter.id,
      visitCount: 1,
      lastVisited: new Date()
    };
    const id = await visitorQueries.create(visitor);
    res.cookie(guid, id);
  }
}

router.get('/:guid', async (req, res, next) => {
  const { guid } = req.params;
  const { unique = 'false' } = req.query;
  try {
    const counter = await counterQueries.findByGuid(guid);
    if (counter) {
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      const ipHash = crypto.createHash('md5').update(ip).digest('hex');
      const banned = await banQueries.find(ipHash, counter.id);

      if (!banned) {
        await updateVisitor(req.cookies, guid, ipHash, counter, res);
      } else {
        res.status(420);
        const error = new Error('Enhance your calm.');
        next(error);
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
