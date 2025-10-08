import bodyParser, { type BodyParser } from "body-parser";
import express, { type Request, type Response, type Express } from "express";

const app: Express = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
    res.status(400).send({ message: "Hello World" });
})

let counter = 0;

const genID = (() => {
    counter++
    return counter;
})

interface Task {
    id: number,
    title: string,
    status: string,
    createdAt: Date
}

let tasks: Task[] = [
    {
        id: genID(),
        title: "Sabonete",
        status: "PENDING",
        createdAt: new Date()
    },
    {
        id: genID(),
        title: "Água",
        status: "PENDING",
        createdAt: new Date()
    }
]

app.get('/tasks', (req: Request, res: Response) => {
    res.send(tasks).status(200);
})

app.get('/tasks/:id', (req: Request, res: Response) => {
    res.status(200).send(tasks.find((element) => element.id === Number(req.params.id)));
})

app.post('/tasks', (req: Request, res: Response) => {
    console.log("Criando uma nova tarefa");

    const now = new Date();

    const { title, status }: { title: string, status: string } = req.body;

    const newTask: Task = {
        id: genID(),
        title: title,
        status: status,
        createdAt: now
    }

    tasks.push(newTask)

    console.log("Resultado final: ", tasks);
    res.send(tasks).status(200);
})

app.put('/tasks/:id', (req: Request, res: Response) => {
    // console.log(req.params.id);
    // console.log(typeof req.params.id);
    
    if (!req.params.id) {
        return res.status(400).send({
            message: "broken"
        });
    }

    const now = new Date();
    const { title, status }: { title: string, status: string } = req.body;

    const updatedTask: Task = {
        id: Number(req.params.id),
        title: title,
        status: status,
        createdAt: now
    }

    tasks = tasks.map((item) => {
        if (item.id === (req.params.id ? parseInt(req.params.id) : 0)) {
            return updatedTask
        }
        return item;
    })
    
    res.status(200).send(updatedTask);
})

app.delete('/tasks/:id', (req: Request, res: Response) => {
    if (!req.params.id) {
        return res.status(400).send({
            message: "Argumento necessário"
        });
    }

    tasks = tasks.filter((task) => task.id !== (req.params.id ? parseInt(req.params.id) : 0));

    res.status(204);
})

app.listen(8000, () => console.log("Server running on port 8000 -> http://localhost:8000/"));
