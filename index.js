import express from 'express';

const app = express();
const port = 3000;

// Usar express.json() para parsear o corpo da requisição como JSON
app.use(express.json());

// Lista de alunos
const alunos = [
    {
        ra: 123456,
        nome: 'Marcus Barros',
        turma: 'Desenvolvimento de Software Multiplataforma',
        habilidades: ['Python', 'Node', 'Java']
    },
    {
        ra: 654321,
        nome: 'Laura Jane Antunes',
        turma: 'Análise e Desenvolvimento de Sistemas',
        habilidades: ['HTML', 'Javascript', 'Typescript']
    }
];

// GET - Listar todos os alunos (RA, Nome, Turma)
app.get('/', (req, res) => {
    const listaAlunos = alunos.map(({ ra, nome, turma }) => ({ ra, nome, turma }));
    res.json(listaAlunos);
});

// GET - Listar um aluno através do RA informado (Nome, Turma, Cursos)
app.get('/:ra', (req, res) => {
    const ra = parseInt(req.params.ra);
    const aluno = alunos.find(aluno => aluno.ra === ra);

    if (aluno) {
        res.json(aluno);
    } else {
        res.status(404).send('Aluno não encontrado');
    }
});

// POST - Adicionar um aluno na lista
app.post('/', (req, res) => {
    const { ra, nome, turma, habilidades } = req.body;

    const alunoExistente = alunos.some(aluno => aluno.ra === ra);
    if (alunoExistente) {
        return res.status(409).send('Aluno já cadastrado');
    }

    const novoAluno = {
        ra,
        nome,
        turma,
        habilidades
    };

    alunos.push(novoAluno);
    res.status(201).send('Aluno cadastrado com sucesso');
});

// PUT - Alterar os dados de um aluno através do RA
app.put('/:ra', (req, res) => {
    const ra = parseInt(req.params.ra);
    const index = alunos.findIndex(aluno => aluno.ra === ra);

    if (index === -1) {
        return res.status(404).send('Aluno não encontrado');
    }

    const { nome, turma, habilidades } = req.body;
    if (nome) alunos[index].nome = nome;
    if (turma) alunos[index].turma = turma;
    if (habilidades) alunos[index].habilidades = habilidades;

    res.send('Dados do aluno atualizados com sucesso');
});

// DELETE - Remover um aluno da lista
app.delete('/:ra', (req, res) => {
    const ra = parseInt(req.params.ra);
    const index = alunos.findIndex(aluno => aluno.ra === ra);

    if (index === -1) {
        return res.status(404).send('Aluno não encontrado');
    }

    alunos.splice(index, 1);
    res.status(200).send('Aluno removido com sucesso');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

export default app;
