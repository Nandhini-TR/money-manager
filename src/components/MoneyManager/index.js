import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    balanceAmount: 0,
    incomeAmount: 0,
    expensesAmount: 0,
    transactionsList: [],
    titleInput: '',
    amountInput: '',
    optionId: 'INCOME',
    transactionTypeOption: [...transactionTypeOptions],
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const amount = parseFloat(amountInput)
    const newTransaction = {
      id: uuidv4(),
      title: titleInput,
      amount,
      type: optionId,
    }

    this.setState(prevState => {
      const updatedTransactionsList = [
        ...prevState.transactionsList,
        newTransaction,
      ]
      let updatedIncome = prevState.incomeAmount
      let updatedExpenses = prevState.expensesAmount

      if (optionId === 'INCOME') {
        updatedIncome += amount
      } else {
        updatedExpenses += amount
      }

      const updatedBalance = updatedIncome - updatedExpenses

      return {
        transactionsList: updatedTransactionsList,
        balanceAmount: updatedBalance,
        incomeAmount: updatedIncome,
        expensesAmount: updatedExpenses,
        titleInput: '',
        amountInput: '',
        optionId: 'INCOME',
      }
    })
  }

  onDeleteTransaction = id => {
    this.setState(prevState => {
      const transactionToDelete = prevState.transactionsList.find(
        transaction => transaction.id === id,
      )
      const filteredTransactions = prevState.transactionsList.filter(
        transaction => transaction.id !== id,
      )

      let updatedIncome = prevState.incomeAmount
      let updatedExpenses = prevState.expensesAmount

      if (transactionToDelete.type === 'INCOME') {
        updatedIncome -= transactionToDelete.amount
      } else {
        updatedExpenses -= transactionToDelete.amount
      }

      const updatedBalance = updatedIncome - updatedExpenses

      return {
        transactionsList: filteredTransactions,
        balanceAmount: updatedBalance,
        incomeAmount: updatedIncome,
        expensesAmount: updatedExpenses,
      }
    })
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeOptionId = event => {
    this.setState({optionId: event.target.value})
  }

  render() {
    const {
      balanceAmount,
      incomeAmount,
      expensesAmount,
      transactionsList,
      titleInput,
      amountInput,
      optionId,
      transactionTypeOption,
    } = this.state

    return (
      <div className="app-container">
        <div>
          <nav className="money-manager-header">
            <h1 className="heading">Hi, Richard</h1>
            <p className="description">
              Welcome back to your{' '}
              <span className="highlight">Money Manager</span>
            </p>
          </nav>
          <MoneyDetails
            balanceAmount={balanceAmount}
            incomeAmount={incomeAmount}
            expensesAmount={expensesAmount}
          />
          <div className="transaction-container">
            <form className="transaction-form" onSubmit={this.onAddTransaction}>
              <h1 className="transaction-heading">Add Transaction</h1>
              <label htmlFor="title">TITLE</label>
              <input
                type="text"
                id="title"
                value={titleInput}
                onChange={this.onChangeTitle}
                className="input"
              />
              <label htmlFor="amount">AMOUNT</label>
              <input
                type="text"
                id="amount"
                value={amountInput}
                onChange={this.onChangeAmount}
                className="input"
              />
              <label htmlFor="type">TYPE</label>
              <select
                id="type"
                value={optionId}
                onChange={this.onChangeOptionId}
                className="input"
              >
                {transactionTypeOption.map(option => (
                  <option key={option.optionId} value={option.optionId}>
                    {option.displayText}
                  </option>
                ))}
              </select>
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <div className="history-container">
              <h1 className="history-title">History</h1>
              <div className="title-container">
                <p className="title-heading">Title</p>
                <p className="amount-heading">Amount</p>
                <p className="type-heading">Type</p>
              </div>
              <ul className="transaction-list">
                {transactionsList.map(transaction => (
                  <TransactionItem
                    key={transaction.id}
                    transactionDetails={transaction}
                    onDeleteTransaction={this.onDeleteTransaction}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
