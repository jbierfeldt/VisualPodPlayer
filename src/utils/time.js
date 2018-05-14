export const formatMilliseconds = milliseconds => {
  // Format hours
  var hours = Math.floor(milliseconds / 3600000);
  milliseconds = milliseconds % 3600000;

  // Format minutes
  var minutes = Math.floor(milliseconds / 60000);
  milliseconds = milliseconds % 60000;

  // Format seconds
  var seconds = Math.floor(milliseconds / 1000);
  milliseconds = Math.floor(milliseconds % 1000);

  // Return as string
  return (minutes < 10 ? '0' : '') + minutes + ':' +
  (seconds < 10 ? '0' : '') + seconds;
}

export const mixInEndStamp = (tree, trueEnd) => {
  // add end property to annotations
  for (let i = 0; i < tree.length; i++) {
    const obj = tree[i];
    const next = tree[i+1];

    if (next) {
      Object.assign(obj, {end: next.timestamp});
    } else {
      Object.assign(obj, {end: trueEnd});
    }

    // recursive
    if (tree[i].annotations) {
      for (let j = 0; j < tree[i].annotations.length; j++) {
        mixInEndStamp(tree[i].annotations, tree[i].end);
      }
    }

  }
  return tree;
}

export const isActive = (position, start, end) => (
  start <= position && position < end 
)
