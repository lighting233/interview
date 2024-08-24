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

};