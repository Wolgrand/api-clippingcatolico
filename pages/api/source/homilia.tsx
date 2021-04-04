import {NextApiRequest, NextApiResponse} from 'next'
import {UserSuccessResponseType, ErrorResponseType} from '../../../utils/interfaces'
import connect from '../../../utils/database';
import Parser from 'rss-parser';

type CustomFeed = {foo: string, baz:any};
type CustomItem = {bar: number};

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {

  if (req.method === 'GET') {

    const parser: Parser<CustomFeed, CustomItem> = new Parser({
      customFields: {
        feed: ['foo', 'baz'],
        //            ^ will error because `baz` is not a key of CustomFeed
        item: ['bar']
      }
    });

    const RSS_URL = `http://www.vatican.va/content/francesco/pt.rss.xml`;

    (async () => {

      const feed = await parser.parseURL(RSS_URL);
       // feed will have a `foo` property, type as a string

      const list = feed.items.map(item=> new Object({
        title: item.title,
        link: item.link
      }))


      res.status(200).json((list).slice(0,10));
    })();



  } else {
    res.status(400).json({ error: 'Wrong request method' });
  }
};
