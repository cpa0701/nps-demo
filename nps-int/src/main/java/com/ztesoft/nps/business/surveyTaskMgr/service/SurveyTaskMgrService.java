package com.ztesoft.nps.business.surveyTaskMgr.service;

import com.ztesoft.nps.business.surveyTaskMgr.model.query.SurveyTaskAddBo;
import com.ztesoft.nps.business.surveyTaskMgr.model.query.SurveyTaskDelBo;
import com.ztesoft.nps.business.surveyTaskMgr.model.query.SurveyTaskQuery;
import com.ztesoft.nps.business.surveyTaskMgr.model.query.UserTargetBo;
import com.ztesoft.utils.plugin.jdbc.source.LPageHelper;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

/**
 * Created by 64671 on 2018/8/28.
 */
public interface SurveyTaskMgrService {
    LPageHelper surveyTaskList(SurveyTaskQuery condition);

    void addSurveyTask(SurveyTaskAddBo bo);

    void addSurveyTaskToDraft(SurveyTaskAddBo bo);

    Map<String,Object> userTargetImport(UserTargetBo bo);

    int userTargetDelete(SurveyTaskDelBo bo);

    int deleteSurveyTask(String taskId);

    void editSurveyTask(SurveyTaskAddBo bo);

}
