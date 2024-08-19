import './index.css'

const MoneyDetails = props => {
  const {balanceAmount, incomeAmount, expensesAmount} = props

  return (
    <div className="money-details-container">
      <div className="money-detail-card-balance-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
          className="money-detail-icon"
        />
        <div>
          <p className="money-detail-title">Your Balance</p>
          <p data-testid="balanceAmount" className="money-detail-amount">
            Rs {balanceAmount}
          </p>
        </div>
      </div>
      <div className="money-detail-card-income-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
          className="money-detail-icon"
        />
        <div>
          <p className="money-detail-title">Your Income</p>
          <p data-testid="incomeAmount" className="money-detail-amount">
            Rs {incomeAmount}
          </p>
        </div>
      </div>
      <div className="money-detail-card-expenses-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
          className="money-detail-icon"
        />
        <div>
          <p className="money-detail-title">Your Expenses</p>
          <p data-testid="expensesAmount" className="money-detail-amount">
            Rs {expensesAmount}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails
