const express = require("express")
const { v4: uuidv4 } = require("uuid")

const app = express()

app.use(express.json())

const customers = []

//middlewares
function verifyIfExistAccountCPF(request, response, next) {
  const { cpf } = request.headers

  const customer = customers.find(customer => customer.cpf === cpf)

  if (!customer) {
    return response.status(400).json({ error: "Customer not found!" })
  }

  request.customer = customer

  return next()
}

//functions
function getBalance(statement) {
  const balance = statement.reduce((acc, operation) => {
    if (operation.type === 'credit') {
      return acc + operation.amount
    } else {
      return acc - operation.amount
    }
  }, 0)

  return balance
}

//routes
app.get("/account", verifyIfExistAccountCPF, (request, response) => {
  const { customer } = request

  response.status(201).json(customer)
})

app.post("/account", (request, response) => {
  const { cpf, name } = request.body

  const cpfAlreadyExists = customers.some(customer => customer.cpf === cpf)

  if (cpfAlreadyExists) {
    response.status(400).json({ error: "Customer already exists!" })
  }

  customers.push({
    id: uuidv4(),
    cpf,
    name,
    statement: []
  })

  response.status(201).send()
})

app.put("/account", verifyIfExistAccountCPF, (request, response) => {
  const { customer } = request
  const { name } = request.body


  customer.name = name

  response.status(201).send()
})

app.delete("/account", verifyIfExistAccountCPF, (request, response) => {
  const { customer } = request

  customers.splice(customer, 1)

  response.status(200).json(customers)
})

app.get("/statement", verifyIfExistAccountCPF, (request, response) => {
  const { customer } = request

  return response.json(customer.statement)
})

app.get("/statement/date", verifyIfExistAccountCPF, (request, response) => {
  const { customer } = request
  const { date } = request.query

  const dateFormat = new Date(date + " 00:00")

  const statement = customer.statement.filter((operation) =>
    operation.created_at.toDateString() === new Date(dateFormat).toDateString()
  )

  return response.json(statement)
})

app.post("/deposit", verifyIfExistAccountCPF, (request, response) => {
  const { customer } = request
  const { description, amount } = request.body

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "credit"
  }

  customer.statement.push(statementOperation)

  return response.status(201).send()
})

app.post("/withdraw", verifyIfExistAccountCPF, (request, response) => {
  const { customer } = request
  const { amount } = request.body

  const balance = getBalance(customer.statement)

  if (balance < amount) {
    response.status(400).json({ error: "Insufficient funds!" })
  }

  const statementOperation = {
    amount,
    created_at: new Date(),
    type: "debit"
  }

  customer.statement.push(statementOperation)

  return response.status(201).send()
})

app.get("/balance", verifyIfExistAccountCPF, (request, response) => {
  const { customer } = request

  const balance = getBalance(customer.statement)

  return response.json({ balance })
})


app.listen(3333)