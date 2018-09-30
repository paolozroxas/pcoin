import crypto from 'crypto';

class Blockchain {
  constructor() {
    this.chain = [];
    this.chain.push(this.createBlock(1, 0x0));
  }

  createBlock = (proof, previousHash) => {
    const block = {
      index: this.chain.length,
      timestamp: Date.now(),
      proof,
      previousHash,
    }
    this.chain.push(block);
    return block;
  }

  getLastBlock = () => {
    return this.chain[this.chain.length - 1];
  }

  proofOfWork = (previousProof) => {
    let newProof = 1;
    let checkProof = false;
    while (!checkProof) {
      const hashOperation = this.hash(Math.pow(newProof, 2) - Math.pow(previousProof, 2))
      if (hashOperation.slice(0, 4) === '0000') {
        checkProof = true;
      } else {
        newProof++;
      }
    }
    return newProof;
  }

  hash = (input) => {
    return crypto.createHash('sha256').update(proofAmalgam).digest('hex');
  }

  hashBlock = (block) => {
    const orderedBlockValues = Object.keys(block).sort().map((key) => {
      return [key, block[key]];
    });
    return this.hash(JSON.stringify(orderedBlockValues));
  }

  
  isChainValid = (chain) => {
    // check if previousHash link is valid
    for (var i = 1; i < chain.length; i++) {
      const prevBlock = chain[i - 1];
      const currBlock = chain[i];
      if (this.hashBlock(prevBlock) !== currBlock.previousHash) {
        return false;
      }

      // check if Proof of Work link is valid
      const hashOperation = this.hash(Math.pow(currBlock.proof, 2) - Math.pow(prevBlock.proof, 2));
      if (hashoperation.slice(0, 4) !== '0000') {
        return false;
      }
    }
    return true;
  }

  
}

export default Blockchain;