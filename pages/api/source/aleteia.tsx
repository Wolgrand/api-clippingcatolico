import {NextApiRequest, NextApiResponse} from 'next'
import {UserSuccessResponseType, ErrorResponseType} from '../../../utils/interfaces'
import connect from '../../../utils/database';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType | UserSuccessResponseType>
): Promise<void> => {

  if (req.method === 'GET') {

    const { db } = await connect('feed');

    const response:any = await db.find({source: 'Aleteia'}).limit(10).sort({'pubDate': -1}).toArray();

    res.status(200).json(response);
  } else {
    res.status(400).json({ error: 'Wrong request method' });
  }
};
