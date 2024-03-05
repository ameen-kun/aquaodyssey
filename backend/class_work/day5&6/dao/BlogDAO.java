package com.project.aquaodyssey_backend.dao;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BlogDAO {
    private int id;
    private String type;
    private String src;
    private String caption;
    private boolean liked;
    private String createdBy;
}
