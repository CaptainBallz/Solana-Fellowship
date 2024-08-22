const solanaWeb3 = require('@solana/web3.js');

    // First activity => Generating new Public and Private Keys and displaying them in console

async function generateKeys() {
    const keypair = solanaWeb3.Keypair.generate();

    const publicKey = keypair.publicKey.toBase58();
    const privateKey = keypair.secretKey;

    // Print the keys
    console.log('Public Key:', publicKey);
    console.log('Private Key:', privateKey);
}

generateKeys();
