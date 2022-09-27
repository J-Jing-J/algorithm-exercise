/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  // 长度为1时，最长回文就是本身
  if (s.length < 2) {
    return s;
  }
  let start = 0;
  // 有两个字符时，最长子字符串是1
  let maxLength = 1;
  // 辅助函数：判断越界+判断相等+更新起始位置和长度的值
  const expandAroundCenter = (left, right) => {
    while (
      left >= 0 &&
      right < s.length &&
      s[left] === s[right]
    ) {
      const newLength = right - left + 1;
      if (newLength > maxLength) {
        maxLength = newLength;
        start = left;
      }
      left--;
      right++;
    }
  }
  for (let i = 0; i < s.length; i++) {
    expandAroundCenter(i - 1, i + 1);
    expandAroundCenter(i, i + 1);
  }
  return s.substring(start, start + maxLength);
};