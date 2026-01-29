import React, { useState, useEffect, useRef } from "react";
import "./SortingVisualizer.css";
import { bubbleSortAnimation } from "../SortingAlgorithms/BubbleSort";
import { quickSortAnimation } from "../SortingAlgorithms/QuickSort";
import { mergeSortAnimation } from "../SortingAlgorithms/MergeSort";
import { heapSortAnimation } from "../SortingAlgorithms/HeapSort";


function LegendItem({ color, text }) {
  return (
    <div className="legend-item">
      <span
        className="legend-square"
        style={{ backgroundColor: color }}
      />
      <span className="legend-text">{text}</span>
    </div>
  );
}


const bubbleSortLegend = [
  { color: "#00ff41", label: "Base" },
  { color: "#ff0000", label: "Comparing" },
  { color: "#ffe600", label: "Sorted" },
];

const quickSortLegend = [
  { color: "#00ff41", label: "Base" },
  { color: "#00aaff", label: "Pivot" },
  { color: "#ff0000", label: "Comparing" },
  { color: "#ffe600", label: "Sorted" },
];

const mergeSortLegend = [
  { color: "#00ff41", label: "Base" },
  { color: "#ff0000", label: "Comparing" },
  { color: "#ffe600", label: "Sorted" },
];

const heapSortLegend = [
  { color: "#00ff41", label: "Base" },
  { color: "#ff0000", label: "Comparing" },
  { color: "#ffe600", label: "Sorted" },
];

export default function SortingVisualizer() {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(50);
  const [animationSpeed, setAnimationSpeed] = useState(50);

  const timeoutIds = useRef([]);
  const [isSorting, setIsSorting] = useState(false);

  const [isBubbleSort, setIsBubbleSort] = useState(false);
  const [isQuickSort, setIsQuickSort] = useState(false);
  const [isMergeSort, setIsMergeSort] = useState(false);
  const [isHeapSort, setIsHeapSort] = useState(false);


  useEffect(() => {
    reset_array();
  }, [arraySize]);

  function clear_all_timeouts() {
    timeoutIds.current.forEach(clearTimeout);
    timeoutIds.current = [];
  }

  function reset_array() {
    clear_all_timeouts();
    setIsSorting(false);
    setIsBubbleSort(false);
    setIsQuickSort(false);
    setIsMergeSort(false);
    setIsHeapSort(false);

    const bars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < bars.length; i++) {
      bars[i].style.backgroundColor = "#00ff41";
    }

    const arr = [];
    for (let i = 0; i < arraySize; i++) {
      arr.push(random_num(5, 150));
    }
    setArray(arr);
  }

  function random_num(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function bubbleSort(array) {
    console.log("Bubble Sort Called");
    setIsBubbleSort(true);
    const base_color = "#00ff41";
    const comparing_color = "#ff0000ff";

    const sorted_color = "#ffe600";

    if (isSorting) return;      // prevents double clicks
    setIsSorting(true);
    const animations = bubbleSortAnimation(array);
    const bars = document.getElementsByClassName("array-bar");
    animations.forEach((animation, index) => {
      const [action, val1, val2] = animation;

      const id = setTimeout(() => {
        if (action === "comparing") {

          const [_, val1, val2] = animation;
          bars[val1].style.backgroundColor = comparing_color;
          bars[val2].style.backgroundColor = comparing_color;

          setTimeout(() => {
            bars[val1].style.backgroundColor = base_color;
            bars[val2].style.backgroundColor = base_color;

          }, animationSpeed / 2)
        }

        else if (action === "swapping") {
          const [_, idx, new_height] = animation;
          // bars[idx].style.backgroundColor = swapping_color;
          bars[idx].style.height = `${new_height * 3.5}px`;


          setTimeout(() => {
            bars[idx].style.backgroundColor = base_color;
          }, animationSpeed / 2)
        }

        else if (action === "sorted") {
          const [_, idx] = animation;
          setTimeout(() => {
            bars[idx].style.backgroundColor = sorted_color;
          }, animationSpeed / 2)
        }
      }, index * animationSpeed);

      timeoutIds.current.push(id);
    }

    )
    return (<span>Bubble Sort</span>)
  }



  function quick_sort(array) {
    if (isSorting) return;      // prevents double clicks
    setIsSorting(true);
    setIsQuickSort(true);
    const animations = quickSortAnimation(array);
    const bars = document.getElementsByClassName("array-bar");

    const base_color = "#00ff41";
    const pivot_color = "#00aaff";
    const comparing_color = "#ff0000ff";

    const sorted_color = "#ffe600";

    animations.forEach((animation, index) => {

      const [action, val1, val2] = animation;

      const id = setTimeout(() => {
        if (action === "pivot") {
          const [_, idx] = animation;

          bars[idx].style.backgroundColor = pivot_color;

        }

        else if (action === "comparing") {
          const [_, idx1] = animation;
          bars[idx1].style.backgroundColor = comparing_color;


          setTimeout(() => {
            bars[idx1].style.backgroundColor = base_color;

          }, animationSpeed / 2)
        }

        else if (action === "swapping") {
          const [_, idx, new_height] = animation;
          // bars[idx].style.backgroundColor = swapping_color;
          bars[idx].style.height = `${new_height * 3.5}px`;

          setTimeout(() => {
            bars[idx].style.backgroundColor = base_color;
          }, animationSpeed / 2);
        }

        else if (action === "sorted") {
          const [_, idx] = animation;
          setTimeout(() => {
            bars[idx].style.backgroundColor = sorted_color;
          }, animationSpeed / 2)
        }
      }, index * animationSpeed)

      timeoutIds.current.push(id);
    })
  }

  function merge_sort(array) {
    if (isSorting) return;      // prevents double clicks
    setIsSorting(true);
    setIsMergeSort(true);
    const animations = mergeSortAnimation(array);
    const bars = document.getElementsByClassName("array-bar");

    const base_color = "#00ff41";

    const comparing_color = "#ff0000ff";

    const sorted_color = "#ffe600";

    animations.forEach((animation, index) => {
      const [action, val1, val2] = animation;
      const id = setTimeout(() => {
        if (action === "comparing") {
          const [_, idx1, idx2] = animation;
          bars[idx1].style.backgroundColor = comparing_color;
          bars[idx2].style.backgroundColor = comparing_color;

          setTimeout(() => {
            bars[idx1].style.backgroundColor = base_color;
            bars[idx2].style.backgroundColor = base_color;

          }, animationSpeed / 2)

        }

        else if (action === "changing") {
          const [_, idx, new_height] = animation;

          bars[idx].style.height = `${new_height * 3.5}px`;

          setTimeout(() => {
            bars[idx].style.backgroundColor = base_color;
          }, animationSpeed / 2)
        }
        else if (action === "sorted") {
          const [_, idx, new_height] = animation;
          if (new_height !== undefined) {
            bars[idx].style.height = `${new_height * 3.5}px`;
          }
          setTimeout(() => {
            bars[idx].style.backgroundColor = sorted_color;
          }, animationSpeed / 2)
        }

      }, index * animationSpeed);

      timeoutIds.current.push(id);
    })
  }

  function heap_sort(array) {
    if (isSorting) return;
    setIsSorting(true);
    setIsHeapSort(true);
    const animations = heapSortAnimation(array);
    const bars = document.getElementsByClassName("array-bar");
    const base_color = "#00ff41";
    const comparing_color = "#ff0000";
    const sorted_color = "#ffe600";

    animations.forEach((animation, index) => {
      const [action, val1, val2] = animation;

      const id = setTimeout(() => {

        if (action === "comparing") {
          const [_, idx1, idx2] = animation;
          bars[idx1].style.backgroundColor = comparing_color;
          bars[idx2].style.backgroundColor = comparing_color;

          setTimeout(() => {
            bars[idx1].style.backgroundColor = base_color;
            bars[idx2].style.backgroundColor = base_color;
          }, animationSpeed / 2)
        }

        else if (action === "swapping") {
          const [_, idx, new_height] = animation;
          bars[idx].style.height = `${new_height * 3.5}px`;

          setTimeout(() => {
            bars[idx].style.backgroundColor = base_color;
          }, animationSpeed / 2)
        }

        else if (action === "sorted") {
          const [_, idx] = animation;
          setTimeout(() => {
            bars[idx].style.backgroundColor = sorted_color;
          }, animationSpeed / 2)
        }
      }, index * animationSpeed);

      timeoutIds.current.push(id);
    })
    if (bars[0].style.backgroundColor === "#ffe600") {
      bars[0].style.backgroundColor = "#ffe600";
    }
  }
  return (

    <div className="array-container">
      <p className="header">SORTING ALGORITHM VISUALIZER</p>
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
                width: `${(1600 + (300 - arraySize) * 5) / arraySize}px`,
                transition: "height 200ms ease-in-out",
                margin: 0,
              }}
            />
          ))}
        </div>

        {/* Legend - positioned absolutely under the bars */}
        {isBubbleSort && (
          <div className="legend">
            {bubbleSortLegend.map(item => (
              <LegendItem
                key={item.label}
                color={item.color}
                text={item.label}
              />
            ))}
          </div>
        )}
        {isQuickSort && (
          <div className="legend">
            {quickSortLegend.map(item => (
              <LegendItem
                key={item.label}
                color={item.color}
                text={item.label}
              />
            ))}
          </div>
        )}
        {isMergeSort && (
          <div className="legend">
            {mergeSortLegend.map(item => (
              <LegendItem
                key={item.label}
                color={item.color}
                text={item.label}
              />
            ))}
          </div>
        )}
        {isHeapSort && (
          <div className="legend">
            {heapSortLegend.map(item => (
              <LegendItem
                key={item.label}
                color={item.color}
                text={item.label}
              />
            ))}
          </div>
        )}

        {/* Right: sliders + buttons stacked */}
        <div className="right-panel">
          <div className="right-controls">
            <label>
              Array Size: {arraySize}
              <input
                type="number"
                min="5"
                max="300"
                value={arraySize}
                onChange={(e) => setArraySize(Number(e.target.value))}
                style={{ width: "60px", marginLeft: "8px" }}
              />

              <input
                type="range"
                min="5"
                max="300"
                value={arraySize}
                onChange={(e) => setArraySize(Number(e.target.value))}
              />
            </label>

            <label>
              Speed (ms): {animationSpeed}
              <input
                type="number"
                min="1"
                max="500"
                value={animationSpeed}
                onChange={(e) => setAnimationSpeed(Number(e.target.value))}
                style={{ width: "60px", marginLeft: "8px" }}
              />
              <input
                type="range"
                min="1"
                max="500"
                value={animationSpeed}
                onChange={(e) => setAnimationSpeed(Number(e.target.value))}
              />
            </label>
          </div>

          <div className="button-column">
            <button onClick={reset_array}>Generate New Array</button>
            <button onClick={() => bubbleSort(array)}>
              Bubble Sort
            </button>

            <button onClick={() => quick_sort(array)}>Quick Sort</button>
            <button onClick={() => merge_sort(array)}>Merge Sort</button>
            <button onClick={() => heap_sort(array)}>Heap Sort</button>
          </div>
        </div>

      </div>
    </div>
  );
}
