// src/components/cpoe/config.ts
// Mapping of test names to code templates.
// Templates support {dob:YYYYMMDD} and {seq}.
export const TEST_CODE_CONFIG: Record<string, string> = {
  'CBC': 'CBC-{dob:YYYYMMDD}-{seq}',
  'COVID PCR': 'COVID-{dob:YYYYMMDD}-{seq}',
  'Lipid Panel': 'LIPID-{dob:YYYYMMDD}-{seq}',
  '__default__': 'TST-{dob:YYYYMMDD}-{seq}',
};