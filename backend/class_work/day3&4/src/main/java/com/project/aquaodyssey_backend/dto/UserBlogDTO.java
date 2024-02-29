package com.project.aquaodyssey_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserBlogDTO {
    private int id;
    private String type;
    private String src;
    private String caption;
    private boolean liked;
    private String createdBy;
}
