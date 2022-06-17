use anchor_lang::prelude::*;

declare_id!("DUrx4ePymCTDArf4msxweYfRsZKbrjDqD9ELgjSTdoBG");

#[program]
pub mod buildspace_project {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let base_account = &mut ctx.accounts.base_account;
        base_account.total_gifs = 0;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 9000)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    /// CHECK: This is not dangerous because we don't read or write from this account
    pub system_program: AccountInfo<'info>,
}

#[account]
pub struct BaseAccount {
    pub total_gifs: u64,
}
