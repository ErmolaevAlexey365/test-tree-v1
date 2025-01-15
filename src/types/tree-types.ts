import { TreeDataNode } from 'antd';

export interface TreeDataParams {
  treeName: string;
}

export interface NodeFormData {
  treeName: string;
  parentNodeId: string;
  nodeName: string;
}

export interface EditNodeFormData {
  treeName: string;
  nodeId: string;
  newNodeName: string;
}

export interface DeleteNodeFormData {
  treeName: string;
  nodeId: string;
}

export interface TreeData {
  id: number;
  name: string;
  children: TreeData[];
}

export interface ModalTreeData {
  item: TreeDataNode;
  action: string;
}
