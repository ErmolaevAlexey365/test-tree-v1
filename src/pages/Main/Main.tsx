import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Flex, Form, Input, Modal, notification, Tree, Typography } from 'antd';
import type { TreeDataNode } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';
import { GENERAL_REQUIRED_FIELD } from 'constants/formRules';
import useModal from 'hooks/useModal';
import ApiUserTree from 'services/api-user-tree';
import { ModalTreeData, TreeData } from 'types/tree-types';
import styles from './Main.scss';

const DEMO_TREE_NAME = 'uniq_tree_name_id_15_01_2025';

const Main = () => {
  const [form] = useForm();
  const [treeData, setTreeData] = useState<TreeData>();
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [{ visible, data }, openModal, closeModal] = useModal<ModalTreeData>();
  const isCreateNodeProcess = data?.action === 'create';
  const [api, contextHolder] = notification.useNotification();

  const onExpand = (newExpandedKeys: React.Key[]) => setExpandedKeys(newExpandedKeys);

  const transformTree = (node: TreeData): TreeDataNode[] => {
    const rootNode = {
      key: node.id,
      title: node.name,
      children: node.children && node.children.length ? transformTree(node.children[0]) : [],
    };

    return [rootNode];
  };
  const { mutate: getTree } = useMutation({
    mutationFn: ApiUserTree.getTree,
    onSuccess: (res) => setTreeData(res),
  });

  const closeModalHandler = () => {
    form.resetFields();
    closeModal();
  };

  const { mutate: createNode } = useMutation({
    mutationFn: ApiUserTree.createNode,
    onError: () => {
      form.setFields([{ name: 'name', errors: ['Node name is already exist'] }]);
    },
    onSuccess: () => {
      closeModalHandler();
      getTree({ treeName: DEMO_TREE_NAME });
    },
  });

  const { mutate: editNode } = useMutation({
    mutationFn: ApiUserTree.editNode,
    onError: () => {
      form.setFields([{ name: 'name', errors: ['Node name is already exist'] }]);
    },
    onSuccess: () => {
      closeModalHandler();
      getTree({ treeName: DEMO_TREE_NAME });
    },
  });

  const { mutate: deleteNode } = useMutation({
    mutationFn: ApiUserTree.deleteNode,
    onError: () =>
      api.error({
        message: 'You should delete all child nodes before',
        placement: 'bottomRight',
        duration: 3,
      }),
    onSuccess: () => getTree({ treeName: DEMO_TREE_NAME }),
  });

  const onFinish = (formData: { name: string }) => {
    if (isCreateNodeProcess) {
      createNode({ treeName: DEMO_TREE_NAME, parentNodeId: data?.item.key as string, nodeName: formData.name });
      return;
    }
    editNode({ treeName: DEMO_TREE_NAME, nodeId: data?.item.key as string, newNodeName: formData.name });
  };

  useEffect(() => getTree({ treeName: DEMO_TREE_NAME }), [getTree]);

  const renderTreeNodeTitle = (item: TreeDataNode) => {
    const title = item.title as React.ReactNode;
    const isRootNode = item.key === treeData?.id;

    return (
      <Flex gap={8}>
        <Typography.Text className={styles.treeNodeTitle}>{title}</Typography.Text>
        <Flex gap={4} className={styles.actionGroup}>
          <PlusCircleOutlined onClick={() => openModal({ item, action: 'create' })} />
          {!isRootNode && (
            <>
              <EditOutlined onClick={() => openModal({ item, action: 'edit' })} />
              <DeleteOutlined onClick={() => deleteNode({ treeName: DEMO_TREE_NAME, nodeId: item.key as string })} />
            </>
          )}
        </Flex>
      </Flex>
    );
  };

  useEffect(() => {
    if (!isCreateNodeProcess) {
      form.setFieldsValue({ name: data?.item.title });
      return;
    }
    form.resetFields();
  }, [form, data, isCreateNodeProcess]);

  return (
    <>
      {treeData && (
        <Tree
          className={styles.treeDataRoot}
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          treeData={transformTree(treeData)}
          titleRender={renderTreeNodeTitle}
          selectable
        />
      )}

      <Form
        form={form}
        id="createNodeForm"
        initialValues={isCreateNodeProcess ? {} : { name: data?.item.title }}
        onFinish={onFinish}
        validateTrigger="onSubmit"
      >
        <Modal
          open={visible}
          title={isCreateNodeProcess ? 'Add node' : 'Edit node'}
          onCancel={closeModalHandler}
          okButtonProps={{
            htmlType: 'submit',
            form: 'createNodeForm',
            disabled: false,
          }}
          cancelButtonProps={{ type: 'link' }}
          okText={isCreateNodeProcess ? 'Add' : 'Edit'}
          width={400}
          destroyOnClose
          centered
          closable
        >
          <Form.Item rules={GENERAL_REQUIRED_FIELD} name="name">
            <Input placeholder="Node name" />
          </Form.Item>
        </Modal>
      </Form>
      {contextHolder}
    </>
  );
};

export default Main;
