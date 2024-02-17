const { Web3 } = require("web3")
const express = require("express")
const fs = require("fs")
const cors = require("cors")

const web3 = new Web3("http://localhost:9999")
const app = express();
app.use(cors())
const json = JSON.parse(fs.readFileSync("../nodo/data/keystore/UTC--2024-02-08T20-13-08.292970787Z--0f900671fd1d00a435ae9a6ff0aacfc0e239202f"))

app.listen(3333)

//CONSEGUIR BALANCE
//0xEc6c3a24d9Fb488cEFaD751d264aD4f826Df60c5
app.get("/balance/:address", async (req, res) => {
    await web3.eth.getBalance(req.params.address).then(saldo => {
        res.send(saldo.toString())
    }).catch(err => {
        res.send(err)
    })
})

//TRANSFERIR DINERO DE LA CUENTA DEL MINADO A UNA DE LAS NUESTRAS
app.get("/faucet/:address", async (req, res) => {
    const account = await web3.eth.accounts.decrypt(json, "123")

    const tx = {
        chainId: 1234567,
        to: req.params.address,
        from: account.address,
        gas: 30000,
        gasPrice: await web3.eth.getGasPrice(),
        value: web3.utils.toWei("0.1", 'ether')
    }

    const txSigned = await account.signTransaction(tx)
    const respuesta = await web3.eth.sendSignedTransaction(txSigned.rawTransaction)
    res.send(respuesta.toString())
})