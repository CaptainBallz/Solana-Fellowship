const solanaWeb3 = require('@solana/web3.js');

//  First Exercise ,
// Connecting to the Devnet cluster
// Generating a new keypair for the sender
// Generating a new keypair for the receiver
// Airdrop some SOLs to the sender's account for testing
// Create a transaction to transfer SOL from sender to receiver

async function main() {
    const connection = new solanaWeb3.Connection(
        solanaWeb3.clusterApiUrl('devnet'),
        'confirmed'
    );

    const sender = solanaWeb3.Keypair.generate();
    console.log('Sender Public Address =>', sender.publicKey.toString());

    const receiver = solanaWeb3.Keypair.generate();
    console.log('Receiver Public Address =>', receiver.publicKey.toString());

    const airdropSignature = await connection.requestAirdrop(
        sender.publicKey,
        solanaWeb3.LAMPORTS_PER_SOL // 1 SOL
    );

    // Confirm the transaction
    await connection.confirmTransaction(airdropSignature);

    // Check the balance of the sender's account after airdrop
    let senderBalance = await connection.getBalance(sender.publicKey);
    console.log("Sender's Balance After Airdrop =>", senderBalance);

    const transaction = new solanaWeb3.Transaction().add(
        solanaWeb3.SystemProgram.transfer({
            fromPubkey: sender.publicKey,
            toPubkey: receiver.publicKey,
            lamports: solanaWeb3.LAMPORTS_PER_SOL / 100, // Transfering 0.01 SOL
        })
    );

    // Sign the transaction
    const signature = await solanaWeb3.sendAndConfirmTransaction(
        connection,
        transaction,
        [sender]
    );

    console.log('Transaction Signature =>', signature);

    // Check and print the balance of both accounts after transfer
    senderBalance = await connection.getBalance(sender.publicKey);
    const receiverBalance = await connection.getBalance(receiver.publicKey);

    console.log("Sender's Balance After Transfer =>", senderBalance);
    console.log("Receiver's Balance After Transfer =>", receiverBalance);
}

main().catch(err => {
    console.error(err);
});
