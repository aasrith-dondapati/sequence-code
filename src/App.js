import React, { useState, useEffect } from 'react';

const KeyboardLayout = () => {
  const keyboard = [
    ['A', 'B', 'C', 'D', 'E'],
    ['F', 'G', 'H', 'I', 'J'],
    ['K', 'L', 'M', 'N', 'O'],
    ['1', '2', '3']
  ];

  const knightMoves = [
    [-2, -1], [-2, 1],
    [-1, -2], [-1, 2],
    [1, -2],  [1, 2],
    [2, -1],  [2, 1]
  ];

  const [totalSequences, setTotalSequences] = useState(0);

  useEffect(() => {
    const countSequences = () => {
      let count = 0;

      const dfs = (row, col, vowelsCount, sequenceLength) => {
        const Vowel = keyboard[row][col].match(/[AEIOU]/i);

        if (Vowel && vowelsCount >= 2) {
          return;
        }

        if (sequenceLength === 10) {
          count++;
          return;
        }

        for (const move of knightMoves) {
          const nextRow = row + move[0];
          const nextCol = col + move[1];

          if (
            nextRow >= 0 &&
            nextRow < keyboard.length &&
            nextCol >= 0 &&
            nextCol < keyboard[nextRow].length
          ) {
            dfs(nextRow, nextCol, vowelsCount + (Vowel ? 1 : 0), sequenceLength + 1);
          }
        }
      };

      for (let row = 0; row < keyboard.length; row++) {
        for (let col = 0; col < keyboard[row].length; col++) {
          dfs(row, col, 0, 1);
        }
      }

      return count;
    };

    const sequencesCount = countSequences();
    setTotalSequences(sequencesCount);
  }, []);

  return (
    <div>
      <h1 style={{textAlign:'center', marginTop:'22.5%'}}>Total number of valid 10-key sequences: {totalSequences}</h1>
    </div>
  );
};

export default KeyboardLayout;
