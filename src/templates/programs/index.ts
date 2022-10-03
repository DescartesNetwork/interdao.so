import { BorshInstructionCoder, Idl } from '@project-serum/anchor'
import { SplTokenIDL, SPL_TOKEN_PROGRAM_ID } from './spl-token'

export type TemplateProgram = {
  encodeIxData?: (data: Buffer) => Buffer
}

export const TEMPLATE_PROGRAMS: Record<
  string,
  { coder: BorshInstructionCoder; idl: Idl }
> = {
  [SPL_TOKEN_PROGRAM_ID.toBase58()]: {
    idl: SplTokenIDL,
    coder: new BorshInstructionCoder(SplTokenIDL),
  },
}
