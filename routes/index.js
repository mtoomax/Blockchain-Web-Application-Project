/*
    Michael Toomey
    10 /08 / 25
    index.js
*/

const express = require('express'); // Import express
const router = express.Router(); // Import the Web3 library 
const Web3 = require('web3').default; //import web3
const dotenv = require('dotenv'); // Import the contract ABI
const contractABI = require('../abi.js'); // Import contract ABI 

dotenv.config(); //configure dotenv 

const web3 = new Web3(process.env.RPC_URL); // new instance of Web3  
const contract = new web3.eth.Contract(contractABI, process.env.CONTRACT_ADDRESS); // contract instance 


router.get('/', (req, res) => { // Render index page
    res.render('index', { title: 'Tennis App' });
});

router.get('/searchPlayer', (req, res) => { //render searchPlayer page
    res.render('searchPlayer');
});

router.get('/enterPlayerDetails', (req, res) => { //render enterPlayerDetails
    res.render('enterPlayerDetails', { 
        contractABI, // contract
        contractAddress: process.env.CONTRACT_ADDRESS, //contract address
    });
});

router.post('/searchPlayer', async (req, res) => { //submit token ID

    const tokenId = req.body.tokenId; //from user input

    try {
        const getDetails = await contract.methods.getPlayerDetails(tokenId).call(); // token id from input

        const nameOfPlayer = getDetails[0]; //assign values 
        const dateOfTest = getDetails[1];
        const skillOfPlayer = getDetails[2];

        if (!nameOfPlayer || nameOfPlayer === "") { //if player exists 
            return res.render("result", {
                nameOfPlayer: "No Record Found", //message to user
                dateOfTest: "No Record Found",
                skillOfPlayer: "No Record Found"
            });
        }

        return res.render("result", { //render search results 
            nameOfPlayer,
            dateOfTest,
            skillOfPlayer
        });

    } catch (error) { //catch error
        console.error("Error: ", error); //show error 
        return res.render("result", {
            nameOfPlayer: "Error", //error
            skillOfPlayer: "Error"
        });
    }
});




module.exports = router; //export router



