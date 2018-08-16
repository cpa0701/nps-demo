/**
 * Create by chenpengan on 2018/8/14
 */
import React from 'react';
import {Row, Col, Radio, Checkbox, Input} from "antd"

import QuestionApplicationService from "../../../services/question/QuestionApplicationService"
import {RadioModule} from "../questionModule/QuestionModules"
import {CheckboxModule} from "../questionModule/QuestionModules"
import {BlankModule} from "../questionModule/QuestionModules"


class InitQuestionList extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            type, index, questionName, optionList, isSetup,
            questionNameBlur, optionNameBlur, onRadioChange, onCheckBoxChange, onBlankChange
        } = this.props;
        let dom = '';
        switch (type) {
            case 'radio':
                dom = <RadioModule questionName={questionName} index={index}
                                   optionList={optionList} onChange={onRadioChange}
                                   questionNameBlur={questionNameBlur} optionNameBlur={optionNameBlur}
                                   isView={true}/>
                break;
            case 'checkbox':
                dom = <CheckboxModule questionName={questionName} index={index}
                                      optionList={optionList} onChange={onCheckBoxChange}
                                      questionNameBlur={questionNameBlur} optionNameBlur={optionNameBlur}
                                      isView={true}/>
                break;
            case 'blank':
                dom = <BlankModule questionName={questionName} optionList={optionList} index={index}
                                   onChange={onBlankChange} isView={true}/>
                break;
        }
        return (<div style={{display: isSetup ? 'none' : 'block'}} className={'questionList'}>
            {dom}
        </div>);
    }
}

export default InitQuestionList;