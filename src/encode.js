const zeroPad = num => '00000000'.slice(String(num).length) + num;

const textToBinary = string => (
  string.split('').map(char => zeroPad(char.charCodeAt(0).toString(2))).join(' ')
);

const binaryToZeroWidth = binary => (
  binary.split('').map((binaryNum) => {
    const num = parseInt(binaryNum, 10);
    if (num === 1) {
      return '​'; // invisible &#8203;
    } else if (num === 0) {
      return '‌'; // invisible &#8204;
    }
    return '‍'; // invisible &#8205;
  }).join('﻿') // invisible &#65279;
);

module.exports = (plaintext) => {
  const binary = textToBinary(plaintext);
  const encoding = binaryToZeroWidth(binary);
  return encoding;
};
