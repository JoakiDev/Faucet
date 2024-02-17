import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [cuenta, setCuenta] = useState(0)
  const [tx, setTx] = useState(null)
  const [saldo, setSaldo] = useState(0)
  useEffect(() => {
    window.ethereum.request({
      method:"eth_requestAccounts"
    }).then(cuentas => {
      setCuenta(cuentas[0])
      window.ethereum.on("accountsChanged", (cuentas) => {
        setCuenta(cuentas[0])
      })
    })
  }, [])

  useEffect(() => {
    async function saldo(){
      const url = `http://localhost:3333/balance/${cuenta}`
      const response = await fetch(url)
      const json = await response.json()
      setSaldo(json)
    }
    if(cuenta)
      saldo()
  }, [cuenta])

  async function invocarFaucet(){
    const url = `http://localhost:3333/faucet/${cuenta}`
    const response = await fetch(url)
    console.log(response)
    const json = await response.json()
    setTx(json)
  }

  return (
    <>
      <div>
        <h1>{cuenta}</h1>
        <h3>Saldo: {saldo}</h3>
        <button onClick={() => invocarFaucet()}>Enviar 0.1 eth</button>
        <div>{JSON.stringify(tx, null, 4)}</div>
      </div>
    </>
  )
}

export default App
