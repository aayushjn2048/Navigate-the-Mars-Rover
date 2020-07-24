function backtrace(node) {
  const path = [];
  path.push(node);
  while (node.parent) {
    node = node.parent;
    path.push(node);
  }
  return path.reverse();
}
exports.backtrace = backtrace;
