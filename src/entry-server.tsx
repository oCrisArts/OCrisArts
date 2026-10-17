import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { PassThrough } from 'node:stream'
import { AppContent } from './App'
export { allPaths, headMarkup, pageMetadata, indexable, origin } from './seo/pages'

export function render(path: string): Promise<string> {
 return new Promise((resolve,reject)=>{
  const chunks:Buffer[]=[]
  const output=new PassThrough()
  output.on('data',chunk=>chunks.push(Buffer.from(chunk)))
  output.on('end',()=>resolve(Buffer.concat(chunks).toString('utf8')))
  output.on('error',reject)
  const stream=renderToPipeableStream(<StaticRouter location={path}><AppContent /></StaticRouter>,{
   onAllReady(){stream.pipe(output)}, onError(error){reject(error)}
  })
 })
}
