import express from 'express'
import routes from './routes'


const app = express()
const port = process.env.PORT || 3333


app.use(express.json());

app.use(routes);

// const test = new Date('2022-08-25T16:45:39.097Z')
app.listen(port, () => {
    console.log('servidor está up')
})

