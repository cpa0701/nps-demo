package com.ztesoft.nps.safe.model.query;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.io.Serializable;

/**
 * Created by 64671 on 2018/9/5.
 */
@ApiModel
public class RoleIdQuery implements Serializable{

    @ApiModelProperty("角色id")
    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
