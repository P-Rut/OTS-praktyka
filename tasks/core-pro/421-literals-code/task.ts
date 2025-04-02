import { split } from 'postcss/lib/list';

export type Code = `${number}-${number}-${number}`;

export function codeToDecimal(code: Code) {
  const formattedCode = code.split('-');

  function count(code: string[]) {
    let summary: number = 0;
    const weight = [4, 2, 1];
    code.forEach((value, index) => {
      summary += Number(value) * weight[index];
    });
    return summary;
  }
  // function count(code: string[]) {
  //   let summary = 0;
  //   const weights = [4, 2, 1];

  //   for (let i = 0; i < code.length; i++) {
  //     summary += Number(code[i]) * weights[i];
  //   }

  //   return summary;
  // }
  return `${count([...formattedCode[0]])}${count([...formattedCode[1]])}${count([...formattedCode[2]])}`;
}
