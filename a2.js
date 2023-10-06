console.log('MaGnAsCo'.toLocaleLowerCase() == 'magnasco'.toLocaleLowerCase());

/* function gridChallenge(grid) {
  let res = '';
  let count = 0;
  if (Array.isArray(grid[0])) {
    for (let h = 0; h < grid.length; h++) {
      let arr = grid[h].map((str) => str.split('').sort());

      if (arr.length == 1) {
        res += 'YES';
        break;
      } else {
        for (let b = 0; b < arr.length; b++) {
          if (arr[0][b] > arr[1][b]) {
            res += ' NO ';
            break;
          }
        }
        res += ' YES ';
        count = count + 1;
      }
    }
  } else {
    console.log(' aaaaaaaaaaaaaaaaaaaaaa ');
    for (let i = 0; i < grid.length; i++) {
      arr.push(grid[i].split('').sort());
    }
    for (let i = 0; i < grid.length; i++) {
      if (arr[0][0] < arr[1][0]) {
      } else {
        return console.log('NO');
      }
    }
    return console.log('YES');
  }
  console.log(res);
}
gridChallenge([['ppp', 'ypp', 'wyw'], ['lyivr', 'jgfew', 'uweor', 'qxwyr', 'uikjd'], ['l']]); */

/* function caesarCipher(s, k) {

  let alfabeto = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  let alfabetoM = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  let arrS = s.split('');
  let res = '';
  for (let i = 0; i < arrS.length; i++) {
    if (/^[a-zA-Z]$/.test(arrS[i])) {
      let a = alfabeto.indexOf(arrS[i]);
      let M = alfabetoM.indexOf(arrS[i]);
      if (a >= 0) {
        if (a + k > 26) {
          let d = (a + k) % 26;
          res += alfabeto[d];
        } else {
          let d = (a + k) % 26;
          res += alfabeto[d];
        }
      } else if (M >= 0) {
        if (M + k > 26) {
          let d = (M + k) % 26;
          res += alfabetoM[d];
        } else {
          let d = (M + k) % 26;
          res += alfabetoM[d];
        }
      }
    } else {
      res += arrS[i];
    }
  }
  return console.log(res);
}

caesarCipher('middle-Outz', 2); */
/* function countingSort(arr) {
  let arrRes = [];
  for (let i = 0; i <= 50; i++) {
    let a = arr.filter((e) => {
      return e == i;
    });
    arrRes.push(a.length);
  }
  console.log(arrRes);
}
let arr = [0, 0, 1, 2, 3, 3, 4, 5, 4, 9,50];
countingSort(arr); */

/* function solution(s) {
    let arr = s.split('').sort()
    
    let res = arr.filter((valor,indice,array)=>{
        return array.indexOf(valor) !== indice
    })
    
    res.sort()
    
    return console.log(res[0])
    
    } */
/* function solution(s) {
  let arr = s.split('');
  for (let index = 0; index < arr.length; index++) {
    console.log('kk');
    if (arr.indexOf(arr[index]) === arr.lastIndexOf(arr[index])) {
      console.log(arr[index]);
      return arr[index];
    }
  }
  return '';
}

solution('aaccdderrge'); */
/* function findMedian(arr) {
    // Write your code here
    let a = arr.sort()
    let b = arr.length / 2 - 1
return console.log(a[b])
}
findMedian([1,2,5,8,7,4,6,3]) */
/* function diagonalDifference(arr) {

    let arr1 = [];
    let arr2 = [];
    for (let i = 0; i < arr.length; i++) {
      arr1.push(arr[i][i]);
    }
    let p = 0;
    for (let i = arr.length - 1; i >= 0; i--) {
      arr2.push(arr[i][p]);
      p = p + 1;
    }
    let arr1Acc = arr1.reduce((acc, i) => (acc = acc + i));
    let arr2Acc = arr2.reduce((acc, i) => (acc = acc + i));
    return  arr2Acc - arr1Acc;
  }
let matriz = [
  [9],
  [6, 6, 7, -10, 9, -3, 8, 9, -1],
  [9, 7, -10, 6, 4, 1, 6, 1, 1],
  [-1, -2, 4, -6, 1, -4, -6, 3, 9],
  [-8, 7, 6, -1, -6, -6, 6, -7, 2],
  [-10, -4, 9, 1, -7, 8, -5, 3, -5],
  [-8, -3, -4, 2, -3, 7, -5, 1, -5],
  [-2, -7, -4, 8, 3, -1, 8, 2, 3],
  [-3, 4, 6, -7, -7, -8, -3, 9, -6],
  [-2, 0, 5, 4, 4, 4, -3, 3, 0],
];
diagonalDifference(matriz);
 */
