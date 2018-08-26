import React, {PureComponent} from 'react';
import { Button,Divider,Table,Modal,Row, Col,Input,Select,InputNumber,Form ,message} from 'antd'
import {inject, observer} from "mobx-react/index";
import './Domain.less'
import DomainService from '../../../services/system/DomainService';
const Option = Select.Option;
const FormItem = Form.Item;
const info = Modal.info;
@inject('stores')
@observer
@Form.create({})
export default class Domain extends PureComponent {
    //新增方法
    handleAdd = () => {
        this.setState({
            addVisible: true,
        });
    }
    //修改方法
    handleUpdate = () => {
        if (this.state.domainEditData) {
            this.setState({
                domainData: this.state.domainData,
                editVisible: true,
            });
        } else {
            const ref = info({
                title: this.state.domain.selectModifyItem,
                content: '',
                okText: this.state.domain.ok,
                cancelText: this.state.domain.Cancel,
                onOk: () => {
                    ref.destroy();
                }
            });
        }
    }
    //删除方法
    handleDelete = () => {
        if (this.state.domainDeleteData) {
            this.setState({
                domainData: this.state.domainData,
            });
            DomainService.deleteDomain(this.state.domainData).then((data) => {
                const ref = info({
                    title: this.state.domain.deleted,
                    content: '',
                    okText: this.state.domain.ok,
                    cancelText: this.state.domain.Cancel,
                    onOk: () => {
                        ref.destroy();
                    }
                });
                console.log(data)
                this.freshTable();
                this.handleOk();
            })

        } else {
            const ref = info({
                title: this.state.domain.selectDeleteItem,
                content: '',
                okText: this.state.domain.ok,
                cancelText: this.state.Cancel,
                onOk: () => {
                    ref.destroy();
                }
            });
        }
        this.freshTable();
    }
    //详情方法
    handleDetail = () => {
        if (this.state.domainUserData) {
            this.setState({
                domainData: this.state.domainData,
                userVisible: true,
            });
        } else {
            const ref = info({
                title: this.state.domain.selectedAreaItem,
                content: '',
                okText: this.state.domain.ok,
                cancelText: this.state.domain.Cancel,
                onOk: () => {
                    ref.destroy();
                }
            });
        }
    }
    constructor(props) {
        super(props);
        this.store = this.props.stores;
        this.state = {
            //树形数据展示
            bordered:true,
            pagination:false,
            data:[],
            domainEditData:[],
            domainAddData:[],
            domainUserData:[],
            domainDeleteData:[],
            domainData:[],
            //模态框
            addVisible: false,
            userVisible:false,
            editVisible:false,
            confirmLoading: false,
            domain:this.props.stores.I18nModel.outputLocale.domain,
        }
    }
    //获取区域树
    domainQuery = (param) => {
        DomainService.domainTree(param)
            .then(result => {
                if (result) {
                    result.map(item => {
                        if(!item.leaf){
                            item.children=[];
                        }
                        if(item.parentId!==0){
                            result.map((e)=>{
                                if(e.id==item.parentId){
                                    e.children.push(item)
                                }
                            })
                        }
                    });
                }
                let data=[];
                    result.map(item=>{
                        if(item.parentId===0){
                            data.push(item);
                        }
                        return '';
                    });
                this.setState({
                    data: data,
                });
            });
    };
    componentDidMount(){
            this.domainQuery();
            this.setState({
                domainAddData:false,
                domainEditData: false,
                domainUserData:false,
                domainDeleteData:false

            });

    }
    freshTable(){
        this.domainQuery();
    }
    handleOk = () => {
        this.setState({
            addVisible: false,
            userVisible:false,
            editVisible:false,
        });
    }
    handleCancel = () => {
        this.setState({
            addVisible: false,
            userVisible:false,
            editVisible:false,
        });
    }
    handleAddSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let value;
            if (this.state.domainAddData) {
                value = {
                    ...values,
                    parentId: this.state.domainData.id,
                }
            }
            else{
                value = {
                    ...values,
                    parentId:0,
                }
            }
            DomainService.addDomain(value).then((data) => {
                console.log(data)
                this.freshTable();
                this.handleOk();
            })

        });

    }
    handleUpdateSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            DomainService.updateDomain(values).then((data) => {
                console.log(data)
                this.freshTable();
                this.handleOk();
            })

        });

    }
    render() {
        const {domain} = this.props.stores.I18nModel.outputLocale
        const columns = [{
            title: domain.domainName,
            dataIndex: 'name',
            key: 'name',
            width: '32%',
        }, {
            title: domain.domainType,
            dataIndex: 'type',
            key: 'type',
            width: '32%',
            render: (text, record, index) => {
                    switch(text){
                        case 1: return this.state.domain.province
                        case 2: return this.state.domain.localNet
                        case 3: return this.state.domain.countyCity
                        case 4: return this.state.domain.sector
                        case 5: return this.state.domain.theCustom
                    }

            }
        }, {
            title: domain.domainID,
            dataIndex: 'code',
            key: 'code',
            width: '32%',

        }];
        const { getFieldDecorator } = this.props.form;
        const state = this.state;
        const rowSelection = {
            onSelect:(record, selected, selectedRows) => {
                this.setState({
                    domainAddData:selected,
                    domainEditData: selected,
                    domainUserData:selected,
                    domainDeleteData:selected,
                    domainData:record
                })


            },
        };

        return (
            <div className={'domain'}>
                <div className="headerDomain">
                    <Button type="primary" icon="plus-circle-o" onClick={this.handleAdd}>{domain.insert}</Button>
                    <Button type="primary" icon="edit" onClick={this.handleUpdate}>{domain.modify}</Button>
                    <Button type="danger" icon="delete" onClick={this.handleDelete}>{domain.delete}</Button>
                    <Button type="primary" icon="user" onClick={this.handleDetail}>{domain.detail}</Button>
                </div>
                <div className="gridTree">
                    <Table {...this.state}  rowKey={record => `${record.id}`} columns={columns} rowSelection={rowSelection} dataSource={this.state.data} onRow={(record) => {
                        return {
                            onClick: (e) => {
                                e.currentTarget.getElementsByClassName("ant-checkbox-wrapper")[0].click()
                            },       // 点击行
                            onDoubleClick: (e) => {
                                this.setState({
                                    domainUserData:true
                                },()=>{
                                    this.handleDetail()
                                });


                            },
                        }
                    }
                    }/>
                    <Modal
                        title={domain.AddDomain}
                        width={800}
                        centered
                        visible={this.state.addVisible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                         footer={[
                            <Button key="submit" type="primary" icon="check-circle-o" onClick={this.handleAddSubmit}>{domain.Save}</Button>,
                            <Button key="back"  icon="close-circle-o" onClick={this.handleCancel}>{domain.Cancel}</Button>
                         ]}
                    >
                        <Form>
                            <Row>
                            <Col span={12}>
                                <FormItem
                                    label={domain.DomainMark}
                                    labelCol={{span: 10}}
                                    wrapperCol={{span: 14}}
                                >
                                    {getFieldDecorator('areaId', {
                                        rules: [{ required: true,}],
                                        initialValue:"1010582",
                                    })(

                                            <Input/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    label={domain.DomainName}
                                    labelCol={{span: 10}}
                                    wrapperCol={{span: 14}}
                                >
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true,}],
                                        initialValue:" ",
                                    })(
                                            <Input  />
                                    )}
                                </FormItem>
                            </Col>
                            </Row>
                            <Row>
                            <Col span={12}>
                                <FormItem
                                    label={domain.DomainType}
                                    labelCol={{span: 10}}
                                    wrapperCol={{span: 14}}
                                >
                                    {getFieldDecorator('type', {
                                        rules: [{ required: true,}],
                                        initialValue:"6",
                                    })(
                                        <Select>
                                            <Option value="1">{domain.province}</Option>
                                            <Option value="2">{domain.localNet} </Option>
                                            <Option value="3">{domain.countyCity}</Option>
                                            <Option value="4">{domain.sector}</Option>
                                            <Option value="5">{domain.custom}</Option>
                                            <Option value="6" disabled>{domain.Select}</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    label={domain.DomainId}
                                    labelCol={{span: 10}}
                                    wrapperCol={{span: 14}}
                                >
                                    {getFieldDecorator('code', {
                                        rules: [{ required: true,}],
                                        initialValue:" ",
                                    })(

                                            <Input />

                                    )}
                                </FormItem>
                            </Col>
                            </Row>
                            <Row>
                            <Col span={12}>
                                <FormItem
                                    label={domain.DomainNo}
                                    labelCol={{span: 10}}
                                    wrapperCol={{span: 14}}
                                >
                                    {getFieldDecorator('sequence', {
                                        rules: [{ }],
                                        initialValue:Number(this.state.domainData.sequence),
                                    })(
                                        <InputNumber min={1} max={10000}/>
                                    )}

                                </FormItem>
                            </Col>
                            </Row>
                        </Form>
                    </Modal>
                    <Modal
                        title={domain.ModifyDomain}
                        width={800}
                        centered
                        visible={this.state.editVisible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="submit" type="primary" icon="check-circle-o" onClick={this.handleUpdateSubmit}>{domain.Save}</Button>,
                            <Button key="back"  icon="close-circle-o" onClick={this.handleCancel}>{domain.Cancel}</Button>
                        ]}
                    >
                        <Form  onSubmit={this.handleSubmit}>
                            <Row>
                                <Col span={12}>
                                    <FormItem
                                        label={domain.DomainMark}
                                        labelCol={{span: 10}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {getFieldDecorator('areaId', {
                                            rules: [{ required: true,}],
                                            initialValue:this.state.domainData.areaId,
                                        })(
                                            <Input placeholder="1010582"/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        label={domain.DomainName}
                                        labelCol={{span: 10}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {getFieldDecorator('name', {
                                            rules: [{ required: true,}],
                                            initialValue:this.state.domainData.name,
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <FormItem
                                        label={domain.DomainType}
                                        labelCol={{span: 10}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {getFieldDecorator('type', {
                                            rules: [{ required: true,}],
                                            initialValue:String(this.state.domainData.type),
                                        })(
                                            <Select >
                                                <Option value="1">{domain.province}</Option>
                                                <Option value="2">{domain.localNet} </Option>
                                                <Option value="3">{domain.countyCity}</Option>
                                                <Option value="4">{domain.sector}</Option>
                                                <Option value="5">{domain.theCustom}</Option>
                                                <Option value="6" disabled>{domain.Select}</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        label={domain.DomainId}
                                        labelCol={{span: 10}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {getFieldDecorator('code', {
                                            rules: [{ required: true,}],
                                            initialValue:this.state.domainData.code,
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <FormItem
                                        label={domain.DomainNo}
                                        labelCol={{span: 10}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {getFieldDecorator('sequence', {
                                            rules: [{ }],
                                            initialValue:Number(this.state.domainData.sequence),
                                        })(
                                            <InputNumber min={1} max={10000}/>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            {getFieldDecorator('id', {
                                initialValue: this.state.domainData.id,
                            })(<Input type="hidden"/>)}
                            {getFieldDecorator('parentId', {
                                initialValue: this.state.domainData.parentId,
                            })(<Input type="hidden"/>)}
                        </Form>
                    </Modal>
                    <Modal
                        title={domain.detail}
                        width={800}
                        centered
                        visible={this.state.userVisible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={null}
                    >
                        <Form  onSubmit={this.handleSubmit}>
                            <Row>
                                <Col span={12}>
                                    <FormItem
                                        label={domain.DomainMark}
                                        labelCol={{span: 10}}
                                        wrapperCol={{span: 14}}
                                    >

                                        {this.state.domainData.areaId}

                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        label={domain.DomainName}
                                        labelCol={{span: 10}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {this.state.domainData.name}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <FormItem
                                        label={domain.DomainType}
                                        labelCol={{span: 10}}
                                        wrapperCol={{span: 14}}
                                    >
                                        <Select value={String(this.state.domainData.type)} disabled>
                                            <Option value="1">{domain.province}</Option>
                                            <Option value="2">{domain.localNet} </Option>
                                            <Option value="3">{domain.countyCity}</Option>
                                            <Option value="4">{domain.sector}</Option>
                                            <Option value="5">{domain.theCustom}</Option>
                                            <Option value="6" disabled>{domain.Select}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        label={domain.DomainNo}
                                        labelCol={{span: 10}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {this.state.domainData.code}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <FormItem
                                        label={domain.DomainId}
                                        labelCol={{span: 10}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {this.state.domainData.sequence}
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                    </Modal>

                </div>
            </div>
        )
    }
}

