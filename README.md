<img alt="Coding" width="400%" src="https://drive.google.com/uc?export=view&id=1PPqzUhf97S1mGPyVeMizQDssPl6BI_nr">

# Introduction

Fund Chain is a blockchain-base crowdfunding platform where entrepreneurs can raise financial support for their business. Any entrepreneur who wants to raise funds can create a project on the platform by providing the necessary details. Any user who finds the project worth investing can fund the project. In this way, the funded amount for a project keeps on increasing and the list of funders keeps on growing. When the project owner wants to spend the raised amount, he will have to create a request describing the purpose for which he wants to spend the raised amount and a virtual voting will be conducted among the funders to decide whether or not to allow the owner to spend raised amount for that particular purpose. If more than 50% of the funders allow, then only the project owner will be allowed to spend the money.


# Technologies Used

1. Smart Contract: A smart contract is simply an agreement between the parties included in a transaction that is required to ensure a party that the counter-party will fulfill the terms and conditions listed in the contract. It contains the logic behind the execution of all the transactions executed on the blockchain. The smart contract is written using 'Solidity' language.

2. Hardhat: Hardhat is a tool that provides us with a development environment for web3-based applications. It can help with everything from compiling, testing, deploying, and debugging a smart contract. Hardhat provides some test accounts with fake ethers that we can use to test the working of various functions of our smart contract.

3. Inter Planetary File System: Storing large files on blockchain can be very costly. So, Inter Planetary File System or IPFS is used to store images and videos related to a project. Whenever a file is uploaded to IPFS, it is chunked into smaller pieces and distributed across the peer-to-peer network.

4. Metamask: It is a browser extension that provides a user-friendly interface to interact with the blockchain. It is simply a cryptocurrency wallet that enables users to execute various transactions on a decentralized application. By connecting to Metamask, users can send and receive digital currency. It also provides some essential features such as gas price estimation, which helps users to optimize transaction fees. Metamask is used to pay the cost associated with the execution of various functions written in the smart contract.

5. MERN: MERN is a combination of four open-source technologies: MongoDB, Express.js, React, and Node.js. React is used to develop the frontend part of the application and MongoDB is used in order to store the data that is comparatively less private as storing less private data on blockchain will result in unncessary storage fees.


# How To Use The platform

On the first visit, the users have to register on the platform by providing necessary details and email id. A verification email with a 4-digit OTP will be sent to the email id of the user and as soon as the correct OTP in entered, the users will be directed to login page where they can log themselves into the platform by entering email id and password. 

As soon as the user is logged in, they will be redirected to the home page. If the user wants to raise funds for their business, they can do so by providing all the necessary details and legal documents. If the user wants to invest in some project, they can explore the campaigns that are currently active and raise funds. The user can explore the campaigns of a particular category like technology-based projects, products-based projects, service-based projects, etc. If the user finds any project worth investing in, they can simply fund the project using their Metamask wallet. There is also a minimum investment amount decided by the project owner at the time of the creation of the project. The user can't invest an amount less than the minimum investment amount. If the user finds a project interesting and wants to refer to the project in the future, they can add the project to their favorites. The users can maintain track of the projects they have created or invested in using the dashboard on their profile page.

The owner of a project can withdraw the raised money only if the deadline of the project has been reached and the target amount has been raised. If the amount of money raised by the project is less than the target amount, the project will be aborted and the amount raised will be refunded to the funders.
