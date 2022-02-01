# `guestbook`

A web3 guestbook built with solidity + hardhat (for smart contract) and react + vite.

### Development

Open [localhost:3000](http://localhost:3000) with your browser to see the result.

```bash
git clone git@github.com:JairCopete17/guestbook.git
cd guestbook/
npm install
npm run dev

# for deploying the smart contract
npx hardhat run scripts/deploy.js --network rinkeby
```

Create a `.env` file similar to `.env.example.`
