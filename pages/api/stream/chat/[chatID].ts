/* eslint-disable no-unused-vars */
import { NextApiRequest, NextApiResponse } from 'next';
const AI_SERVICE_URL = process.env.NEXT_PUBLIC_AI_SERVICE_URL;

const streamForward = async (
  chatID: any,
  headers: any,
  body: any,
  write: (data: string) => void
) => {
  /*   const encoder = new TextEncoder();
  const decoder = new TextDecoder(); */

  const res = await fetch(`${AI_SERVICE_URL}/public/message/${chatID}`, {
    headers,
    method: 'PUT',
    body,
  });

  if (res.status !== 200) {
    // eslint-disable-next-line no-console
    throw new Error('OpenAI API returned an error');
  }
  for await (const chunk of res.body as any) {
    write(chunk);
  }
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('Content-Encoding', 'none');
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, must-revalidate');
  res.chunkedEncoding = true;
  const { chatID } = req.query;
  await streamForward(chatID, req.headers, JSON.stringify(req.body), msg => {
    res.write(msg);
  });
}
