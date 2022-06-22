import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { BuildspaceProject } from "../target/types/buildspace_project";



describe("buildspaceProject", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  const baseAccount = anchor.web3.Keypair.generate();

  const { SystemProgram } = anchor.web3;

  const main = async () => {
    console.log("🚀 Starting test...");

    // Create and set the provider. We set it before but we needed to update it, so that it can communicate with our frontend!
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);

    // const program = anchor.workspace.buildspaceProject;
    const program = anchor.workspace.BuildspaceProject as Program<BuildspaceProject>;

    // Create an account keypair for our program to use.
    const baseAccount = anchor.web3.Keypair.generate();

    // Call start_stuff_off, pass it the params it needs!
    const tx = await program.methods
      .initialize()
      .accounts({
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([baseAccount])
      .rpc();

    console.log("📝 Your transaction signature", tx);

    let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('👀 GIF Count', account.totalGifs.toString())

    // You'll need to now pass a GIF link to the function! You'll also need to pass in the user submitting the GIF!
    const newtx = await program.methods.addGif("insert_a_giphy_link_here").accounts({
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
    }).rpc();

    // Call the account.
    account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('👀 GIF Count', account.totalGifs.toString())

    // Access gif_list on the account!
    console.log('👀 GIF List', account.gifList)
  }

  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  //test = "yarn run ts-mocha -p ./tsconfig.json -t 1000000 tests/**/*.ts"
  //test = "node tests/buildspaceProject.js"
  runMain();

});
