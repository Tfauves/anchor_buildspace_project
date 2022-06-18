import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { BuildspaceProject } from "../target/types/buildspace_project";
import { PublicKey, SystemProgram, Transaction, Connection, Commitment } from '@solana/web3.js';

describe("buildspaceProject", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  const provider = anchor.getProvider();

  anchor.setProvider(provider);

  const program = anchor.workspace.BuildspaceProject as Program<BuildspaceProject>;
  const baseAccount = anchor.web3.Keypair.generate();

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().accounts({
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    }).signers([baseAccount]).rpc();

    console.log("Your transaction signature", tx);
  });

});
