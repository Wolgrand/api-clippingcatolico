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
      description,
    }: {
      source: string;
      title: string;
      link: string;
      thumbnail: string;
      pubDate: number;
      description:string;

    } = req.body;

      if (
        !source ||
        !title ||
        !link ||
        !thumbnail ||
        !pubDate ||
        !description
        ) {
        res.status(400).json({ error: 'Missing body parameter' });
        return;
      }


    const { db } = await connect('feed');

    const newsAlreadyExists = await db.findOne({title});
    if (newsAlreadyExists) {
      res
        .status(400)
        .json({ error: `The article ${title} already exists n the database` });
      return;
    }


    const response = await db.insertOne({
      source,
      title,
      link,
      thumbnail,
      pubDate,
      description
    });

    res.status(200).json(response.ops[0]);
  }  else {
    res.status(400).json({ error: 'Wrong request method' });
  }
};
