const anchor = require('@project-serum/anchor');
const { SystemProgram } = require('@solana/web3.js');

const main = async () => {
    console.log("🚀 Starting tests...");

    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);
    const program = anchor.workspace.GifPortalSolanaBackend;

    // create a key pair for our test program to use
    const baseAccount = anchor.web3.Keypair.generate();


    const tx = await program.rpc.startStuffOff({
        accounts: {
            baseAccount: baseAccount.publicKey,
            user: provider.wallet.publicKey,
            systemProgram: SystemProgram.programId,
        },
        signers: [baseAccount],
    });

    console.log("📝 Your transaction signature", tx);

    // get account data
    let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('GIF count', account.totalGifs.toString())
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

runMain();