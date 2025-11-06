export function quick_sort_animation(array) {
  const animations = [];
  const arr = array.slice();

  function swap(arr, i, j) {
    if (i != j){
    animations.push(["swapping", i, arr[j]]);
    animations.push(["swapping", j, arr[i]]);}
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  function partition(arr, low, high) {
    const pivot = arr[high];
    animations.push(["pivot", high]);
    let i = low - 1;
    for (let j = low; j <= high - 1; j++) {
      animations.push(["comparing", j]);
      if (arr[j] < pivot) {
        i++;
        swap(arr, i, j);
      }
    }
    swap(arr, i + 1, high);
    animations.push(["sorted", i + 1]);
    if ((high - low) == 1) {animations.push(["sorted", high]);}
    return i + 1;
  }

  function quick_sort(arr, low, high) {
    if (low < high) {
      const pi = partition(arr, low, high);
      quick_sort(arr, low, pi - 1);
      quick_sort(arr, pi + 1, high);
    }
    else{
        animations.push(["sorted", low]);
    }
  }


  quick_sort(arr, 0, arr.length - 1);
  return animations;
}
