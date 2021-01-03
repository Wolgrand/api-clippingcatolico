import {NextApiRequest, NextApiResponse} from 'next'
import {UserSuccessResponseType, ErrorResponseType} from '../../utils/interfaces'
import connect from '../../utils/database';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType | UserSuccessResponseType>
): Promise<void> => {

  if (req.method === 'POST') {
    const {
      source,
      title,
      link,
      thumbnail,
      pubDate,
    }: {
      source: string;
      title: string;
      link: string;
      thumbnail: string;
      pubDate: number;

    } = req.body;

      if (
        !source ||
        !title ||
        !link ||
        !thumbnail ||
        !pubDate
        ) {
        res.status(400).json({ error: 'Missing body parameter' });
        return;
      }


    const { db } = await connect('feed');




    const response = await db.insertOne({
      source,
      title,
      link,
      thumbnail,
      pubDate,
    });

    res.status(200).json(response.ops[0]);
  } else if (req.method === 'GET') {

    const { db } = await connect('feed');

    const response:any = await db.find().toArray();

    res.status(200).json(response);
  } else {
    res.status(400).json({ error: 'Wrong request method' });
  }
};
