import { TemplateIdl, TemplateNames } from '../index'

export enum ZetaCreateIds {
  // Accounts
  zetaGroup = 'zetaGroup',
  systemProgram = 'systemProgram',
  zetaProgram = 'zetaProgram',
  payer = 'payer',
  authority = 'authority',
  marginAccount = 'marginAccount',
}

export const ZetaCreateIdl: TemplateIdl = {
  name: TemplateNames.ZetaCreate,
  ixName: 'initializeMarginAccount',
  accounts: [
    {
      name: ZetaCreateIds.marginAccount,
      isMut: true,
      isSigner: false,
      isMaster: false,
    },
    {
      name: ZetaCreateIds.authority,
      isMut: false,
      isSigner: true,
      isMaster: true,
    },
    {
      name: ZetaCreateIds.payer,
      isMut: true,
      isSigner: true,
      isMaster: true,
    },
    {
      name: ZetaCreateIds.zetaProgram,
      isMut: false,
      isSigner: false,
      isMaster: false,
    },
    {
      name: ZetaCreateIds.systemProgram,
      isMut: false,
      isSigner: false,
      isMaster: false,
    },
    {
      name: ZetaCreateIds.zetaGroup,
      isMut: false,
      isSigner: false,
      isMaster: false,
    },
  ],
  args: [],
  programId: 'BG3oRikW8d16YjUEmX3ZxHm9SiJzrGtMhsSR8aCw1Cd7',
}
