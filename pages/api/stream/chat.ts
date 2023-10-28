/* eslint-disable no-unused-vars */
import { NextApiResponse } from 'next';
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://127.0.0.1:8000';

const streamForward = async (body: any, write: (data: string) => void) => {
  /*   const encoder = new TextEncoder();
  const decoder = new TextDecoder(); */

  const res = await fetch(`${AI_SERVICE_URL}/public/chat`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body,
  });

  if (res.status !== 200) {
    console.error(res);
    throw new Error('OpenAI API returned an error');
  }
  for await (const chunk of res.body as any) {
    write(chunk);
  }
};

export default async function handle(req: Request, res: NextApiResponse) {
  res.setHeader('Content-Encoding', 'none');
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, must-revalidate');
  res.chunkedEncoding = true;
  await streamForward(JSON.stringify(req.body), msg => {
    res.write(msg);
  });
}
