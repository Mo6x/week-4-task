import FileTree from './fileTree';

export function createFileTree(input) {
  const fileTree = new FileTree();

// fixd bug
  let sortParent = input.sort((parent1, parent2) => parent1.id - parent2.id)
    // console.log(sortParent);
  sortParent[0].parentId = null


  for (const inputNode of input) {
    const parentNode = inputNode.parentId
      ? fileTree.findNodeById(inputNode.parentId)
      : null;

    fileTree.createNode(
      inputNode.id,
      inputNode.name,
      inputNode.type,
      parentNode
    );
  }

  return fileTree;
}