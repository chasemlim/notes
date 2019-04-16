//////////////////////////////////////
// Binary Search - works only on sorted arrays
// O(logn)
//////////////////////////////////////
const bSearch = (arr, target) => {
  if (arr.length === 0) return false;
  if (arr.length === 1) {
    if (arr[0] == target) return true;
    return false;
  }

  let tempArr = arr;
  let mid = Math.floor(tempArr.length / 2);

  while (tempArr.length > 1 && tempArr[mid] !== target) {
    if (tempArr[mid] > target) {
      tempArr = tempArr.slice(0, mid);
    } else {
      tempArr = tempArr.slice(mid);
    }

    mid = Math.floor(tempArr.length / 2);
  }

  return (tempArr[mid] == target) ? true : false;
}