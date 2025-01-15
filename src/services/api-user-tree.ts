import { DeleteNodeFormData, EditNodeFormData, NodeFormData, TreeData, TreeDataParams } from 'types/tree-types';
import axios from '../interceptors/interceptors';

export default class ApiUserTree {
  public static async getTree({ treeName }: TreeDataParams): Promise<TreeData> {
    return axios({ method: 'POST', url: '/api.user.tree.get', params: { treeName } });
  }

  public static async createNode({ treeName, parentNodeId, nodeName }: NodeFormData): Promise<TreeData> {
    return axios({ method: 'POST', url: '/api.user.tree.node.create', params: { treeName, parentNodeId, nodeName } });
  }

  public static async editNode({ treeName, nodeId, newNodeName }: EditNodeFormData): Promise<TreeData> {
    return axios({
      method: 'POST',
      url: '/api.user.tree.node.rename',
      params: { treeName, nodeId, newNodeName },
    });
  }

  public static async deleteNode({ treeName, nodeId }: DeleteNodeFormData): Promise<TreeData> {
    return axios({
      method: 'POST',
      url: '/api.user.tree.node.delete',
      params: { treeName, nodeId },
    });
  }
}
