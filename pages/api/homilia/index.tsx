import {NextApiRequest, NextApiResponse} from 'next'
import { useRouter } from 'next/router';
import {UserSuccessResponseType, ErrorResponseType} from '../../../utils/interfaces'
import connect from '../../../utils/database';
import puppeteer from 'puppeteer';

interface RequestProps {
  url:string
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {

  if (req.method === 'GET') {


    const { url } = req.query;

    (async () => {
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      await page.tracing.start({
        path: 'trace.json',
        categories: ['devtools.timeline']
      })
      await page.goto(url as string)

      // execute standard javascript in the context of the page.
      const text = await page.$$eval('p', anchors => { return anchors.map(anchor => anchor.textContent) })
      console.log(text[3])
      const removeMultimidiaText = text.indexOf('[Multimídia]')
      text.splice(removeMultimidiaText,1)
      await page.tracing.stop()
      await browser.close()

      res.status(200).json(text);

    })()





  } else {
    res.status(400).json({ error: 'Wrong request method' });
  }
};
