package com.inkgreen.dto;

import lombok.Data;

import java.util.List;

@Data
public class PageResult<T> {

    private List<T> list;

    private long total;

    private int pageNo;

    private int pageSize;
}

