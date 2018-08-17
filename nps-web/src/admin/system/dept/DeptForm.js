import React, {Component} from 'react';
import {Form, Row, Col, Input, Button, Select, Popconfirm, Icon} from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;

class AdvancedSearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expand: true
        }
        this.toggle = this.toggle.bind(this);
    }

    //查询
    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            this.props.getStaffParams(values)
        });
    }

    //收起
    toggle = () => {
        const {expand} = this.state;
        this.setState({expand: !expand});
    }

    // To generate mock Form.Item
    getFields() {
        const count = this.state.expand ? 10 : 0;
        const {getFieldDecorator} = this.props.form;
        const children = [];
        const fieldList = [
            {
                label: '部门范围',
                key: 'range',
                type: 'select',
                optionList: [{key: 'dept', title: '部门及子部门'}, {key: 'currentDept', title: '当前部门'}, {
                    key: 'domain',
                    title: '按区域'
                }]
            }, {
                label: '人员帐号',
                key: 'account', type: 'input'
            }, {
                label: '人员工号',
                key: 'no',
                type: 'input'
            }, {
                label: '人员姓名',
                key: 'name',
                type: 'input'
            }, {
                label: '账号状态',
                type: 'select',
                key: 'status ',
                optionList: [{key: '', title: '全部'}, {key: 1, title: '正常'}, {key: 2, title: '已封存'}, {
                    key: 3,
                    title: '待修改密码'
                }, {key: 4, title: '长期锁定'}, {key: 5, title: '短期锁定'}]
            }, {
                label: '是否有效',
                type: 'select',
                key: 'valid',
                optionList: [{key: '', title: '全部'}, {key: 1, title: '有效'}, {key: 0, title: '无效'}]
            }]
        for (let i = 0; i < fieldList.length; i++) {
            children.push(
                <Col span={8} key={i} style={{display: i < count ? 'block' : 'none'}}>
                    <FormItem label={fieldList[i].label}>
                        {getFieldDecorator(fieldList[i].key, {
                            initialValue: i === 0 ? 'dept' : ''
                        })(
                            fieldList[i].type === 'input' ? (<Input/>) : (
                                <Select>
                                    {fieldList[i].optionList.map((a) =>
                                        <Option key={a.key} value={a.key}>{a.title}</Option>
                                    )}
                                </Select>)
                        )}
                    </FormItem>
                </Col>
            );
        }
        return children;
    }

    render() {
        const {handleAdd, handleEdit, handleDelete, handleChangeDept} = this.props
        return (
            <Form
                className="ant-advanced-search-form"
                onSubmit={this.handleSearch}
            >
                <Row gutter={24}>{this.getFields()}</Row>
                <Row>
                    <Col span={24}>
                        <Button type="primary" htmlType="submit">查询</Button>
                        <Button onClick={handleAdd}>新增</Button>
                        <Button onClick={handleEdit} type="dashed">修改</Button>
                        <Popconfirm title="确定删除吗?" okText="确定" cancelText="取消" onConfirm={handleDelete}>
                            <Button type="danger">删除</Button>
                        </Popconfirm>
                        <Popconfirm title="确定更改吗?" okText="确定" cancelText="取消" onConfirm={handleChangeDept}>
                            <Button>更改部门</Button>
                        </Popconfirm>
                        <a style={{marginLeft: 8, fontSize: 12}} onClick={this.toggle}>
                            收起 <Icon type={this.state.expand ? 'up' : 'down'}/>
                        </a>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default Form.create()(AdvancedSearchForm);