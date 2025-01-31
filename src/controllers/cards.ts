import {Request, Response, Router} from 'express';
import express from 'express';
import db from '../models';
import CardAttributes from '../interfaces/card';

// eslint-disable-next-line new-cap
const router: Router = express.Router();

// GET / - Obtiene una lista de todas las cartas.
router.get('/', async (req: Request, res: Response) => {
  const collection: Array<CardAttributes> =
        await db.Card.findAll({user_id: req.user});
  return res.json({
    status: 200,
    data: {
      size: collection.length,
      collection: collection,
    },
  });
});

router.get('/:userID', async (req: Request, res: Response) => {
  const collection: Array<CardAttributes> =
      await db.Card.findAll({user_id: req.query.user_id});

  return res.json({
    status: 200,
    data: {
      size: collection.length,
      collection: collection,
    },
  });
});

export default router;
