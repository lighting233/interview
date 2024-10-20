//24-8-17 第一次学习

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  const map = new Map();
  for(let num of nums) {
    //todo get
    map.set(num, (map.get(num) || 0) + 1)
  };
  const heap = new PriorityQueue({
    compare: (a,b) => a.value - b.value
  });

  for(let [key, value] of map) {
    heap.enqueue({key,value});
    if(heap.size() > k) {
      //堆中pop都是从堆顶pop,所以使用小顶堆
      heap.dequeue();
    }
  };
  const res = []
  while(heap.size()) {
    res.push(heap.dequeue().key)
  }
  return res;
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  const map = new Map();
  for(let num of nums) {
    map.set(num, (map.get(num) || 0) + 1);
  };

  const heap = new PriorityQueue({
    compare: (a,b) => a.val - b.val
  });

  for(let [key, val] of map) {
    heap.enqueue({key, val});
    if(heap.size() > k) {
      heap.dequeue()
    }
  };

  const res = [];
  while(heap.size()) {
    res.push(heap.dequeue().key)
  };

  return res;
};