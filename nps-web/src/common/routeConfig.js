import React from 'react';
import {Route} from 'react-router-dom';

import Home from "../admin/base/frame/Home/Home"
import Domain from "../admin/system/domain/Domain"
import Dept from "../admin/system/dept/Dept"
import Role from "../admin/system/role/Role"
import QuestionLibMgr from "../admin/npsMgr/questionLibMgr/QuestionLibMgr"
import Authority from "../admin/system/authority/Authority"
import QuestionApplication from "../admin/npsMgr/questionApplication/QuestionApplication"
import QuestionPreview from "../admin/npsMgr/questionPreview/QuestionPreview"
import NotFound from '../admin/base/error/NotFound';

class RouteList extends React.PureComponent {
    render() {
        return (
            <div style={{height: '100%'}}>
                <Route path="/" exact component={Home}/>
                <Route path="/npsMgr/questionLibMgr" component={QuestionLibMgr}/>
                <Route path="/npsMgr/questionMgr/questionApplication" component={QuestionApplication}/>
                <Route path="/npsMgr/questionPreview/QuestionPreview/:id" component={QuestionPreview}/>
                <Route path="/system/domain" component={Domain}/>
                <Route path="/system/dept" component={Dept}/>
                <Route path="/system/role" component={Role}/>
                <Route path="/system/authority" component={Authority}/>
                <Route component={NotFound}/>
            </div>
        )
    }
}

export default RouteList