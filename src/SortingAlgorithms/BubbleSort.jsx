// src/SortingVisualizer/SortingAlgorithms/BubbleSort.js
export function bubbleSortAnimation(array) {
  const animations = [];
  const arr = array.slice();
  // const sorted_array = [...arr].sort((a, b) => a - b); 
  const sorted_values = [];
  const length = arr.length;

  for (let i = 0; i < length; i++) {
    let swapped = false;
    for (let j = 0; j < length - i - 1; j++) {
      animations.push(["comparing", j, j + 1]);

      if (arr[j] > arr[j + 1]) {
        animations.push(["swapping", j, arr[j + 1]]);
        animations.push(["swapping", j + 1, arr[j]]);

        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        // swapped = true;

       

      }
    }
    

    
   
    animations.push(["sorted", length - i - 1]);
    sorted_values.push(arr[length - i - 1]);
//     if (swapped == false){  for (let k = 0; k <= i; k ++){
//     animations.push(["sorted", k]);
//   }
// break;}
 

  // for (let k = 0; k <= i; k ++){
  //   animations.push(["sorted", k]);
  // }

   

    // for(let j = length - i - 1; j >= 0; j--)
    // {
    //   if (arr[j] == sorted_array[j]){
    //     if(!sorted_values.includes(arr[j])){
    //       animations.push(["sorted", j]);
    //     }
    //   }
    //   else break;
    // }


  }
  // for(let i = 0; i < length; i++)
  // {
  //   if (!sorted_values.includes(arr[i])){
  //     animations.push(["sorted", i]);
  //     sorted_values.push(arr[i]);
  //   }
  // }

  return animations;
}


