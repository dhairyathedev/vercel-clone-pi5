import { Hono } from 'hono'
import simpleGit from 'simple-git'
import path from 'path'
import { generateId } from '../lib/id'
import { getFiles } from '../util/file'
import { uploadFile } from '../util/r2'
const app = new Hono()

const REPO_URL = "https://github.com/dhairyathedev/test-react-app"

app.get('/', async (c) => {
  const git = simpleGit()
  const id = generateId()
  await git.clone(REPO_URL, path.join(__dirname, `repo/${id}`))
  const files = getFiles(path.join(__dirname, `repo/${id}`))
  
  files.forEach(async file => {
    await uploadFile(file.slice(__dirname.length + 1), file);
})

  return c.text('Hello World! ' + REPO_URL + " " + id)
})

export default app
