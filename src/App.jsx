import { useState } from 'react'
import { InputBox } from './components'
import useCurrenecyInfo from './hooks/currenecyInfo'
function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [amountConverted, setamountConverted] = useState(0)
  
  const currencyinfo = useCurrenecyInfo(from)
  const options = Object.keys(currencyinfo)
  const swap = () => {
    setFrom(to)
    setTo(from)
    setAmount(amountConverted)
    setamountConverted(amount)
  }
  const convert = () => {
    setamountConverted(amount * currencyinfo[to])
  }

  return (
      <div
        className='w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat'
        style = {{
          backgroundImage: `url(https://images.pexels.com/photos/4386158/pexels-photo-4386158.jpeg?auto=compress&cs=tinysrgb&w=600)`,
        }}
      >
        <div className='w-full'>
          <div className='w-full max-w-md mx-auto border border-gray-50 rounded-lg p-5 backdrop-blur-sm bg-white/30'>
            <form 
              onSubmit={(e)=>{
                e.preventDefault();
                convert()
              }}
            >
              <div className='w-full mb-1'>
                <InputBox
                  label="From"
                  amount={amount}
                  currencyOption={options}
                  onAmountchange={(amount)=>{setAmount(amount)}}
                  onCurrencychange={(currency)=>{setFrom(currency)}}
                  selectOption={from}
                />
              </div>
              <div className='relative w-full h-0.5'>
                <button 
                  type="button"
                  className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5'
                  onClick={swap}
                >
                  swap
                </button>
              </div>
                <div className='w-full mt-1 mb-4'>
                  <InputBox
                    label="To"
                    amount={amountConverted}
                    currencyOption={options}
                    selectOption={to}
                    onCurrencychange={(currency)=>setTo(currency)}
                    amountDisable
                  />
                </div>
                <button type="submit" className='w-full bg-blue-600 text-white px-4 py-3 rounded-lg'>
                  Convert {from.toUpperCase()} to {to.toUpperCase()}
                </button>
            </form>
          </div>
        </div>  
      </div>
  );
}

export default App
