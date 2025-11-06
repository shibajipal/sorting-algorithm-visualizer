export function heap_sort_animation(array){
    const animations = [];
    const arr = array.slice();

    function heapify(arr, n, i){
        let largest = i;

        let left_child = 2 * i + 1;
        let right_child = 2 * i + 2;

        if (left_child < n && arr[left_child] > arr[largest]){
            largest = left_child;
        }

        if (right_child < n && arr[right_child] > arr[largest]){
            largest = right_child;
        }

        if (largest != i){
            animations.push(["swapping", i, arr[largest]]);
            animations.push(["swapping", largest, arr[i]]);
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            
            

    
    heapify(arr, n, largest);


        }
}

function heap_sort(arr){
    let n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--){
        heapify(arr, n, i);
    }

    for (let i = n - 1; i > 0; i--){
        animations.push(["swapping", 0, arr[i]])
        animations.push(["swapping", i, arr[0]]);
        [arr[0], arr[i]] = [arr[i], arr[0]];
        animations.push(["sorted", i]);
        

        heapify(arr, i, 0)
    }
}

heap_sort(arr);
animations.push(["sorted", 0])
return animations;
}