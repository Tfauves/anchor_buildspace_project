import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { BuildspaceProject } from "../target/types/buildspace_project";

describe("buildspaceProject", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.BuildspaceProject as Program<BuildspaceProject>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });

});
