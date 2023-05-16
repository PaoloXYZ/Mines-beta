export function NewField(x: number, y: number): Array<Array<string>> {
  let field: Array<Array<string>> = [];
  for (let i = 0; i < x; i++) {
    let tmpArr: Array<string> = [];
    for (let j = 0; j < y; j++) {
      tmpArr.push('O');
    }
    field.push(tmpArr);
  }
  return field;
}

const MineSymbol = '*';
export function NewSolution(
  x: number,
  y: number,
  minesNumber: number
): Array<Array<string>> {
  let resultArr: Array<Array<string>> = [];
  let numProximityArr: Array<Array<any>> = [];

  for (let i = 0; i < x; i++) {
    let tmpArr: Array<string> = [];
    let tmpArrPro: Array<number> = [];
    for (let j = 0; j < y; j++) {
      tmpArr.push('');
      tmpArrPro.push(0);
    }
    resultArr.push(tmpArr);
    numProximityArr.push(tmpArrPro);
  }
  for (let i = 0; i < minesNumber; i++) {
    let rx = Math.floor(Math.random() * x);
    let ry = Math.floor(Math.random() * y);
    if (resultArr[rx][ry] === MineSymbol) {
      i--;
      continue;
    }
    resultArr[rx][ry] = MineSymbol;
    numProximityArr[rx][ry] = MineSymbol;
    numProximityArr = updateProximityField(numProximityArr, rx, ry);
  }
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      if (numProximityArr[i][j] === 0) {
        resultArr[i][j] = '-';
        continue;
      }

      if (Number.isFinite(numProximityArr[i][j]))
        resultArr[i][j] = numProximityArr[i][j].toString();
    }
  }
  return resultArr;
}

function updateProximityField(
  proximityField: Array<Array<any>>,
  rx: number,
  ry: number
): Array<Array<number>> {
  let x = proximityField.length;
  let y = proximityField[0].length;
  let yMinus = ry - 1 >= 0;
  let xPlus = rx + 1 < x;
  let yPlus = ry + 1 < y;
  let xMinus = rx - 1 >= 0;
  let notAMine = (cx: number, cy: number) => {
    return proximityField[cx][cy] !== MineSymbol;
  };

  if (yMinus && notAMine(rx, ry - 1)) proximityField[rx][ry - 1]++;

  if (xPlus && yMinus && notAMine(rx + 1, ry - 1))
    proximityField[rx + 1][ry - 1]++;

  if (xPlus && notAMine(rx + 1, ry)) proximityField[rx + 1][ry]++;

  if (xPlus && yPlus && notAMine(rx + 1, ry + 1))
    proximityField[rx + 1][ry + 1]++;

  if (yPlus && notAMine(rx, ry + 1)) proximityField[rx][ry + 1]++;

  if (xMinus && yPlus && notAMine(rx - 1, ry + 1))
    proximityField[rx - 1][ry + 1]++;

  if (xMinus && notAMine(rx - 1, ry)) proximityField[rx - 1][ry]++;

  if (xMinus && yMinus && notAMine(rx - 1, ry - 1))
    proximityField[rx - 1][ry - 1]++;

  return proximityField;
}

export function DisplayField(field: Array<Array<string>>): void {
  let x = field[0].length;
  let alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(
    ''
  );
  if (x > alphabet.length) {
    console.error('field bigger than printable coordinates');
    return;
  }
  let out = ' \t';
  alphabet.slice(0, x).forEach((e: string) => (out += `${e} `));
  out += '\n';
  field.forEach((e: Array<string>) => {
    out += `${field.indexOf(e)}\t`;
    e.forEach((w: string) => {
      out += `${w} `;
    });
    out += '\n';
  });
  console.log(out);
}
