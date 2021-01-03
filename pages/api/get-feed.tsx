import {NextApiRequest, NextApiResponse} from 'next'
import axios from 'axios'
import fetch from 'node-fetch'
import connect from '../../utils/database';
import {UserSuccessResponseType, ErrorResponseType, FeedProps} from '../../utils/interfaces'


export default async (
  req: NextApiRequest,
  res: NextApiResponse<any>
): Promise<void> => {

  if (req.method === 'GET') {

    const { db } = await connect('feed');

    const response:any = await db.find().sort({'pubDate': -1}).limit(10).toArray();

    res.status(200).json(response);
  } else {
    res.status(400).json({ error: 'Wrong request method' });
  }
};
