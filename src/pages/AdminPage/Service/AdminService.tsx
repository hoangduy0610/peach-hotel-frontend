import { AdminApiRequest } from '@/services/AdminApiRequest';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, GetProp, Input, Modal, Popconfirm, Progress, Select, Space, Table, Upload, UploadProps } from 'antd';
import { useEffect, useState } from 'react';
import './AdminService.scss';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
type UploadRequestOption = Parameters<GetProp<UploadProps, 'customRequest'>>[0];
const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const AdminService = () => {
    const [form] = Form.useForm();
    const [serviceList, setServiceList] = useState<any[]>([]);
    const [serviceTierList, setServiceTierList] = useState<any[]>([]);
    const [openCreateServiceModal, setOpenCreateServiceModal] = useState(false);
    const [openCreateServiceTierModal, setOpenCreateServiceTierModal] = useState(false);
    const [editingService, setEditingService] = useState<any | null>(null);
    const [editingServiceTier, setEditingServiceTier] = useState<any | null>(null);
    const [progress, setProgress] = useState(0);
    const [fileList, setFileList] = useState<any[]>([]);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const handleChange = (info: any) => {
        setFileList(info.fileList);
        console.log("info: ", info);
    };

    const handleUpload = async (options: UploadRequestOption) => {
        const { onSuccess, onError, file, onProgress } = options;

        const fmData = new FormData();
        const config = {
            headers: { "content-type": "multipart/form-data" },
            onUploadProgress: (event: any) => {
                const percent = Math.floor((event.loaded / event.total) * 100);
                setProgress(percent);
                if (percent === 100) {
                    setTimeout(() => setProgress(0), 1000);
                }
                onProgress && onProgress({ percent: (event.loaded / event.total) * 100 });
            }
        };
        fmData.append("file", file);
        try {
            const res = await AdminApiRequest.post("/file/upload", fmData, config);
            const { data } = res;
            setImageUrls([...imageUrls, data.url]);
            onSuccess && onSuccess("Ok");
        } catch (err: any) {
            console.log("Eroor: ", err);
            const error = new Error("Some error");
            onError && onError(error);
        }
    }

    const handlePreview = async (file: any) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
    }

    const fetchServiceList = async () => {
        const res = await AdminApiRequest.get('/service/list');
        setServiceList(res.data);
    };

    const fetchServiceTierList = async () => {
        const res = await AdminApiRequest.get('/service/tier/list');
        setServiceTierList(res.data);
    };

    useEffect(() => {
        fetchServiceList();
        fetchServiceTierList();
    }, []);

    const onOpenCreateServiceModal = () => {
        setOpenCreateServiceModal(true);
    };

    const onOpenCreateServiceTierModal = () => {
        setOpenCreateServiceTierModal(true);
    };

    const onOKCreateService = async () => {
        setOpenCreateServiceModal(false);
        // const data = form.getFieldsValue();
        const data = {
            name: form.getFieldValue('name'),
            serviceTierId: form.getFieldValue('serviceTierId'),
            price: parseInt(form.getFieldValue('price'))
        };
        if (editingService) {
            await AdminApiRequest.put(`/service/${editingService.id}`, data);
        } else {
            await AdminApiRequest.post('/service', data);
        }
        fetchServiceList();
        setEditingService(null);
        form.resetFields();
    };

    const onOKCreateServiceTier = async () => {
        setOpenCreateServiceTierModal(false);
        // const data = form.getFieldsValue();
        const data = {
            name: form.getFieldValue('name'),
            type: form.getFieldValue('type'),
            slot: 1,
            description: form.getFieldValue('description'),
            images: imageUrls
        };
        if (editingServiceTier) {
            await AdminApiRequest.put(`/service/tier/${editingServiceTier.id}`, data);
        } else {
            await AdminApiRequest.post('/service/tier', data);
        }
        fetchServiceTierList();
        setEditingServiceTier(null);
        form.resetFields();
    };

    const onCancelCreateService = () => {
        setOpenCreateServiceModal(false);
        setEditingService(null);
        form.resetFields();
    };

    const onCancelCreateServiceTier = () => {
        setOpenCreateServiceTierModal(false);
        setEditingServiceTier(null);
        form.resetFields();
    };

    const onEditService = (service: any) => {
        setEditingService(service);
        form.setFieldsValue(service);
        form.setFieldsValue({ serviceTierId: service.serviceTier.id });
        setOpenCreateServiceModal(true);
    };

    const onDeleteService = async (id: number) => {
        await AdminApiRequest.delete(`/service/${id}`);
        fetchServiceList();
    };

    const onEditServiceTier = (tier: any) => {
        setEditingServiceTier(tier);
        form.setFieldsValue(tier);
        setFileList(tier.images?.map((image: string, index: number) => ({
            uid: index.toString(),
            name: tier.name + ".png",
            status: "done",
            response: '{"status": "success"}',
            url: image,
        })) || []);
        setImageUrls(tier.images || []);
        setOpenCreateServiceTierModal(true);
    };

    const onDeleteServiceTier = async (id: number) => {
        await AdminApiRequest.delete(`/service/tier/${id}`);
        fetchServiceTierList();
        fetchServiceList();
    };

    const handleRemove = (file: any) => {
        const newFileList = fileList.filter((item) => item.uid !== file.uid);
        setFileList(newFileList);
        setImageUrls(imageUrls.filter((url) => url !== file.url));
    };

    console.log(serviceList);

    return (
        <div className="container-fluid m-2">
            <h3 className="h3">Service Management</h3>

            <Button type="primary" onClick={() => onOpenCreateServiceModal()}>
                Create Service
            </Button>
            <Button
                type="primary"
                onClick={() => onOpenCreateServiceTierModal()}
                style={{ marginLeft: '10px' }}
            >
                Create Service Tier
            </Button>

            {/* Service Modal */}
            <Modal
                className="service-modal"
                title={editingService ? "Edit Service" : "Create Service"}
                open={openCreateServiceModal}
                onOk={onOKCreateService}
                onCancel={onCancelCreateService}
            >
                <Form form={form} layout="vertical">
                    <div className="field-row">
                        <Form.Item
                            label="Service Name"
                            name="name"
                            rules={[{ required: true, message: "Please input service name!" }]}
                        >
                            <Input type="text" />
                        </Form.Item>
                        <Form.Item
                            label="Service Tier"
                            name="serviceTierId"
                            rules={[{ required: true, message: "Please select service tier!" }]}
                        >
                            <Select>
                                {serviceTierList.map((tier) => (
                                    <Select.Option key={tier.id} value={tier.id}>
                                        {tier.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </div>
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: "Please input price!" }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                </Form>
            </Modal>

            {/* Service Tier Modal */}
            <Modal
                className="service-modal"
                title={editingServiceTier ? "Edit Service Tier" : "Create Service Tier"}
                open={openCreateServiceTierModal}
                onOk={onOKCreateServiceTier}
                onCancel={onCancelCreateServiceTier}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Images"
                        name="imageUrl"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => e.fileList}
                    >
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Upload
                                listType="picture-card"
                                fileList={fileList}
                                accept="image/*"
                                onPreview={handlePreview}
                                customRequest={handleUpload}
                                onChange={handleChange}
                                onRemove={handleRemove}
                            >
                                <button style={{ border: 0, background: 'none' }} type="button">
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </button>
                            </Upload>
                            {progress > 0 ? <Progress percent={progress} /> : null}
                        </div>
                    </Form.Item>
                    <Form.Item
                        label="Tier Name"
                        name="name"
                        rules={[{ required: true, message: "Please input tier name!" }]}
                    >
                        <Input type="text" />
                    </Form.Item>
                    <div className="field-row">
                        <Form.Item
                            label="Type"
                            name="type"
                            rules={[{ required: true, message: "Please input tier type!" }]}
                        >
                            <Select>
                                <Select.Option value="Restaurent">RESTAURENT</Select.Option>
                                <Select.Option value="Other">OTHER</Select.Option>
                            </Select>
                        </Form.Item>
                    </div>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: "Please input description!" }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>

            <h4 className="h4 mt-3">Service List</h4>
            {/* Service List Table */}
            <Table
                dataSource={serviceList}
                columns={[
                    { title: 'ID', dataIndex: 'id', key: 'id' },
                    { title: 'Service Name', dataIndex: 'name', key: 'name' },
                    { title: 'Price', dataIndex: 'price', key: 'price' },
                    {
                        title: 'Tier', dataIndex: 'serviceTier', key: 'serviceTier', render(serviceTier, record) {
                            return serviceTier.name;
                        }

                    },

                    {
                        title: 'Actions', key: 'action', render: (_, record) => (
                            <Space size="middle">
                                <Button onClick={() => onEditService(record)}>
                                    <i className="fas fa-edit"></i>
                                </Button>
                                <Popconfirm
                                    title="Are you sure to delete this service?"
                                    onConfirm={() => onDeleteService(record.id)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button danger>
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </Popconfirm>
                            </Space>
                        )
                    }
                ]}
            />

            {/* Service Tier List Table */}
            <h4 className="h4 mt-3">Service Tier List</h4>
            <Table
                dataSource={serviceTierList}
                columns={[
                    {
                        title: 'Img', dataIndex: 'images', key: 'images',
                        render: (images) => <img src={images?.[0]} alt="Service" style={{ width: '100px', height: '100px', borderRadius: '8px' }} />
                    },
                    { title: 'Tier Name', dataIndex: 'name', key: 'name' },
                    { title: 'Type', dataIndex: 'type', key: 'type' },
                    { title: 'Description', dataIndex: 'description', key: 'description' },
                    { title: 'Available people', dataIndex: 'available', key: 'available' },
                    {
                        title: 'Actions',
                        key: 'action',
                        render: (_, record) => (
                            <Space size="middle">
                                <Button onClick={() => onEditServiceTier(record)}>
                                    <i className="fas fa-edit"></i>
                                </Button>
                                <Popconfirm
                                    title="Are you sure to delete this service tier?"
                                    onConfirm={() => onDeleteServiceTier(record.id)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button danger>
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </Popconfirm>
                            </Space>
                        )
                    }
                ]}
            />
        </div>
    );
};

export default AdminService;
