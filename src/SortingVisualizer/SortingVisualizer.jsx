import React, { useState, useEffect, useRef } from "react";
import "./SortingVisualizer.css";
import { bubble_sort_animation } from "../SortingAlgorithms/BubbleSort"; 
import { quick_sort_animation } from "../SortingAlgorithms/QuickSort"; 
import { merge_sort_animation } from "../SortingAlgorithms/MergeSort"; 
import { heap_sort_animation } from "../SortingAlgorithms/HeapSort";

export default function SortingVisualizer() {
  const [array, setArray] = useState([]);
  const [array_size, set_array_size] = useState(50);
  const [animation_speed, set_animation_speed] = useState(10);

  const timeoutIds = useRef([]);
  const [is_sorting, set_is_sorting] = useState(false);



  useEffect(() => {
    reset_array();
  }, [array_size]);

  function clear_all_timeouts() {
    timeoutIds.current.forEach(clearTimeout);
    timeoutIds.current = [];
  }

  function reset_array() {
    clear_all_timeouts();
    set_is_sorting(false);

    const bars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < bars.length; i++) {
      bars[i].style.backgroundColor = "#00ff41";
    }

    const arr = [];
    for (let i = 0; i < array_size; i++) {
      arr.push(random_num(5, 150));
    }
    setArray(arr);
  }

  function random_num(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function bubble_sort(array){
    const base_color = "#00ff41";
    const comparing_color = "#6aff8a";
    const swapping_color = "#ff2d55";
    const sorted_color = "#ffe600";
   
  if (is_sorting) return;      // prevents double clicks
  set_is_sorting(true);
    const animations = bubble_sort_animation(array);
    const bars = document.getElementsByClassName("array-bar");
    animations.forEach((animation, index) =>{
      const [action, val1, val2] = animation;

      const id = setTimeout(() => {
        if (action === "comparing"){

          const [_, val1, val2] = animation;
          bars[val1].style.backgroundColor = comparing_color;
          bars[val2].style.backgroundColor = comparing_color;

          setTimeout(() =>{
            bars[val1].style.backgroundColor = base_color;
            bars[val2].style.backgroundColor = base_color;

          }, animation_speed / 2)
        }

        else if (action === "swapping"){
          const [_, idx, new_height] = animation;
          bars[idx].style.backgroundColor = swapping_color;
          bars[idx].style.height = `${new_height * 3.5}px`;


          setTimeout(() =>{
            bars[idx].style.backgroundColor = base_color;
          }, animation_speed / 2)
        }

        else if (action === "sorted"){
          const [_, idx] = animation;
          setTimeout(() => {
          bars[idx].style.backgroundColor = sorted_color;
          }, animation_speed / 2)
        }
      }, index * animation_speed);

      timeoutIds.current.push(id);
    }
    
    )
  }



  function quick_sort(array){
      if (is_sorting) return;      // prevents double clicks
  set_is_sorting(true);
    const animations = quick_sort_animation(array);
    const bars = document.getElementsByClassName("array-bar");

    const base_color = "#00ff41";
    const pivot_color = "blue";
    const comparing_color = "#00aaff";
    const swapping_color = "green";
    const sorted_color = "#ffe600";
    
    animations.forEach((animation, index)=>{

      const [action, val1, val2] = animation;
      
      const id = setTimeout(() => {
        if (action === "pivot"){
          const [_, idx] = animation;

          bars[idx].style.backgroundColor = pivot_color;

        }

        else if (action === "comparing"){
          const [_, idx1] = animation;
          bars[idx1].style.backgroundColor = comparing_color;
          

          setTimeout(() => {
            bars[idx1].style.backgroundColor = base_color;
            
          }, animation_speed / 2)
        }

        else if (action === "swapping"){
          const[_, idx, new_height] = animation;
          bars[idx].style.backgroundColor = swapping_color;
          bars[idx].style.height = `${new_height * 3.5}px`;

          setTimeout(() => {
            bars[idx].style.backgroundColor = base_color;
          }, animation_speed / 2);
        }

        else if (action === "sorted"){
          const[_, idx] = animation;
          setTimeout(() => {
          bars[idx].style.backgroundColor = sorted_color;
          }, animation_speed / 2)
        }
      }, index * animation_speed)

      timeoutIds.current.push(id);
    })
  }

  function merge_sort(array){
      if (is_sorting) return;      // prevents double clicks
  set_is_sorting(true);
    const animations = merge_sort_animation(array);
    const bars = document.getElementsByClassName("array-bar");

    const base_color = "#00ff41";
    
    const comparing_color = "#ff2d55";
    const changing_color = "#00ff41";
    const sorted_color = "#ffe600";

    animations.forEach((animation, index) =>{
      const [action, val1, val2] = animation;
      const id = setTimeout(() => {
        if (action === "comparing"){
          const [_, idx1, idx2] = animation;
          bars[idx1].style.backgroundColor = comparing_color;
          bars[idx2].style.backgroundColor = comparing_color;

          setTimeout(() =>{
            bars[idx1].style.backgroundColor = base_color;
            bars[idx2].style.backgroundColor = base_color;
            
          }, animation_speed / 2)
        
        }

        else if (action === "changing") {
          const [_, idx, new_height] = animation;
          bars[idx].style.backgroundColor = changing_color;
          bars[idx].style.height = `${new_height * 3.5}px`;

          setTimeout(() => {
            bars[idx].style.backgroundColor = base_color;
          }, animation_speed / 2)
        }
        else if (action === "sorted"){
          const[_, idx] = animation;
          bars[idx].style.backgroundColor = sorted_color;
        }
        
      }, index * animation_speed);

      timeoutIds.current.push(id);
    })
  }

  function heap_sort(array){
    if (is_sorting) return;
    set_is_sorting(true);
    const animations = heap_sort_animation(array);
    const bars = document.getElementsByClassName("array-bar");
    const base_color = "#00ff41";
    
    const comparing_color = "#ff2d55";
    const swapping_color = "#00ff41";
    const sorted_color = "#ffe600";

    animations.forEach((animation, index) => {
      const [action, val1, val2] = animation;

      const id = setTimeout(() => {

        if (action === "swapping"){
          const [_, idx, new_height] = animation;

          bars[idx].style.backgroundColor = swapping_color;
          bars[idx].style.height = `${new_height * 3.5}px`;

          setTimeout(() => {
            bars[idx].style.backgroundColor = base_color;
          }, animation_speed / 2)
        }

        else if (action === "sorted"){
          const [_, idx] = animation;
          setTimeout(() => {
          bars[idx].style.backgroundColor = sorted_color;
          }, animation_speed / 2)
        }
      }, index * animation_speed);

      timeoutIds.current.push(id);
    })
  if (bars[0].style.backgroundColor === "#ffe600"){
    bars[0].style.backgroundColor = "#ffe600";
  }  
  }
  return (
    
  <div className="array-container">
    <p className = "header">SORTING ALGORITHM VISUALIZER</p>
    <div className="top-layout">

      {/* Left: Bars */}
      <div className="bars">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              height: `${value * 3.5}px`,
              backgroundColor: "#00ff41",
              width: `${(1600 + (300 - array_size) * 5) / array_size}px`,
              transition: "height 200ms ease-in-out",
              margin: 0,
              
            }}
          />
        ))}
      </div>

      {/* Right: sliders + buttons stacked */}
      <div className="right-panel">
        <div className="right-controls">
          <label>
            Array Size: {array_size}
             <input
    type="number"
    min="5"
    max="300"
    value={array_size}
    onChange={(e) => set_array_size(Number(e.target.value))}
    style={{ width: "60px", marginLeft: "8px" }}
  />

            <input
              type="range"
              min="5"
              max="300"
              value={array_size}
              onChange={(e) => set_array_size(Number(e.target.value))}
            />
          </label>

          <label>
            Speed (ms): {animation_speed}
              <input
    type="number"
    min="1"
    max="500"
    value={animation_speed}
    onChange={(e) => set_animation_speed(Number(e.target.value))}
    style={{ width: "60px", marginLeft: "8px" }}
  />
            <input
              type="range"
              min="1"
              max="500"
              value={animation_speed}
              onChange={(e) => set_animation_speed(Number(e.target.value))}
            />
          </label>
        </div>

        <div className="button-column">
          <button onClick={reset_array}>Generate New Array</button>
        <button onClick={() => bubble_sort(array)}>
  Bubble Sort
</button>

          <button onClick = {() => quick_sort(array)}>Quick Sort</button>
          <button onClick = {() => merge_sort(array)}>Merge Sort</button>
          <button onClick = {() => heap_sort(array)}>Heap Sort</button>
        </div>
      </div>

    </div> 
  </div>  
);
}
